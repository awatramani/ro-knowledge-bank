/*
 * ============================================================
 *  J-PAL SA Knowledge Bank — Shared Admin & Interaction JS
 *  kb-admin.js  |  Version 1.0
 * ============================================================
 */

/* ── PREP CONSOLE TAB SWITCHER ── */
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
    if (text) text.innerText  = pct + '%';
}

/* ── ADMIN EDITOR ── */
let isAdmin = false, targetImg = null;

document.addEventListener('keydown', function(e) {
    if (e.altKey && e.shiftKey && (e.key === 'e' || e.key === 'E')) {
        e.preventDefault();
        if (!isAdmin) unlockPage();
    }
});

function unlockPage() {
    isAdmin = true;
    document.getElementById('admin-toolkit').style.display = 'flex';
    document.body.classList.add('edit-mode-active');
    document.querySelectorAll('.edit-text').forEach(el => el.setAttribute('contenteditable','true'));
    document.querySelectorAll('.edit-img').forEach(img => img.addEventListener('click', openImgEditor));
}

function lockPage() {
    isAdmin = false;
    document.getElementById('admin-toolkit').style.display = 'none';
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
    let container = targetImg.parentElement;
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
    const tools = clone.querySelector('#admin-master-container');
    if (tools) tools.remove();
    const temp = document.createElement('textarea');
    document.body.appendChild(temp);
    temp.value = '<!DOCTYPE html>\n' + clone.outerHTML;
    temp.select();
    try {
        document.execCommand('copy');
        alert('✨ Code copied! Paste into your editor or Google Sites.');
    } catch(err) {
        alert('Could not copy — please check browser permissions.');
    }
    document.body.removeChild(temp);
    if (wasOn) unlockPage();
}
