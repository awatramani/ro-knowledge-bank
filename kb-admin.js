/*
 * ============================================================
 *  J-PAL SA Knowledge Bank — Shared Admin & Interaction JS
 *  kb-admin.js  |  Version 2.0
 *
 *  Include this file on any KB page to get:
 *  - Prep console tab switching + progress tracking
 *  - Alt+Shift+E admin edit mode (text + image editing)
 *  - Copy HTML to clipboard
 * ============================================================
 */

/* ── Prep console tab switcher ─────────────────────────────── */
function openPrepTab(evt, tabName) {
    document.querySelectorAll('.prep-pane').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.prep-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

function toggleTask(element) {
    element.classList.toggle('completed');
    const total     = document.querySelectorAll('.check-item').length;
    const completed = document.querySelectorAll('.check-item.completed').length;
    const pct       = Math.round((completed / total) * 100);
    const fill = document.getElementById('master-progress-fill');
    const text = document.getElementById('master-progress-text');
    if (fill) fill.style.width = pct + '%';
    if (text) text.innerText   = pct + '%';
}

/* ── Admin editor ───────────────────────────────────────────── */
let isAdmin = false, targetImg = null;

document.addEventListener('keydown', function(e) {
    if (e.altKey && e.shiftKey && (e.key === 'e' || e.key === 'E')) {
        e.preventDefault();
        if (!isAdmin) unlockPage();
    }
});

// Fallback: double-click the banner title
const doorbell = document.querySelector('.banner-title');
if (doorbell) doorbell.addEventListener('dblclick', function(e) {
    e.preventDefault();
    if (!isAdmin) unlockPage();
});

function unlockPage() {
    isAdmin = true;
    const kit = document.getElementById('admin-toolkit');
    if (kit) kit.style.display = 'flex';
    document.body.classList.add('edit-mode-active');
    document.querySelectorAll('.edit-text').forEach(el => el.setAttribute('contenteditable', 'true'));
    document.querySelectorAll('.edit-img').forEach(img => img.addEventListener('click', openImgEditor));
}

function lockPage() {
    isAdmin = false;
    const kit = document.getElementById('admin-toolkit');
    if (kit) kit.style.display = 'none';
    hideBubble();
    document.body.classList.remove('edit-mode-active');
    document.querySelectorAll('.edit-text').forEach(el => el.removeAttribute('contenteditable'));
    document.querySelectorAll('.edit-img').forEach(img => img.removeEventListener('click', openImgEditor));
}

function openImgEditor(e) {
    if (!isAdmin) return;
    e.preventDefault();
    targetImg = e.target;
    const bubble = document.getElementById('inline-img-box');
    if (!bubble) return;
    let container = targetImg.closest('.image-card') || targetImg.parentElement;
    if (getComputedStyle(container).position === 'static') container.style.position = 'relative';
    container.appendChild(bubble);
    bubble.style.display = 'block';
    document.getElementById('img-input-val').value = targetImg.src;
    document.getElementById('img-input-val').focus();
}

function hideBubble() {
    const b = document.getElementById('inline-img-box');
    if (b) b.style.display = 'none';
}

function applyImg() {
    const val = document.getElementById('img-input-val').value.trim();
    if (targetImg && val) {
        const m = val.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([a-zA-Z0-9_-]+)/);
        targetImg.src = m ? `https://drive.google.com/thumbnail?id=${m[1]}&sz=w1600` : val;
    }
    hideBubble();
}

function copyCode() {
    const wasOn = isAdmin;
    lockPage();
    const clone = document.documentElement.cloneNode(true);
    // Remove the admin toolkit from the copy
    const tools = clone.querySelector('#admin-toolkit');
    if (tools) tools.remove();
    const finalHTML = '<!DOCTYPE html>\n' + clone.outerHTML;

    // Use modern clipboard API with execCommand fallback
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(finalHTML)
            .then(() => alert('HTML copied to clipboard!'))
            .catch(() => execCommandFallback(finalHTML));
    } else {
        execCommandFallback(finalHTML);
    }
    if (wasOn) unlockPage();
}

function execCommandFallback(text) {
    const temp = document.createElement('textarea');
    temp.value = text;
    temp.style.position = 'fixed';
    temp.style.opacity = '0';
    document.body.appendChild(temp);
    temp.focus();
    temp.select();
    try {
        document.execCommand('copy');
        alert('HTML copied to clipboard!');
    } catch (err) {
        alert('Could not copy automatically — please copy manually from the console.');
        console.log(text);
    }
    document.body.removeChild(temp);
}
