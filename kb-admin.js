/*
 * ============================================================
 *  J-PAL SA Knowledge Bank — Shared Admin & Interaction JS
 *  kb-admin.js  |  Version 2.0
 *
 *  v2 additions:
 *  • Scroll-spy for in-page nav links
 *  • Back-to-top button logic
 *  • Reading progress bar calculation
 *  • Smooth anchor scrolling (iframe-safe)
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


/* ── SCROLL-SPY — Highlights active nav link based on scroll position ── */
(function initScrollSpy() {
    document.addEventListener('DOMContentLoaded', function() {
        const navLinks = document.querySelectorAll('.page-nav .nav-link');
        if (navLinks.length === 0) return;

        // Collect section targets
        const sections = [];
        navLinks.forEach(function(link) {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const target = document.getElementById(href.substring(1));
                if (target) sections.push({ el: target, link: link });
            }
        });

        if (sections.length === 0) return;

        function updateActiveSpy() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const offset = 120; // Account for sticky nav height
            let current = sections[0];

            for (let i = 0; i < sections.length; i++) {
                if (sections[i].el.offsetTop - offset <= scrollTop) {
                    current = sections[i];
                }
            }

            navLinks.forEach(function(l) { l.classList.remove('active'); });
            if (current) current.link.classList.add('active');
        }

        window.addEventListener('scroll', updateActiveSpy, { passive: true });
        updateActiveSpy(); // Initial state
    });
})();


/* ── READING PROGRESS BAR ── */
(function initReadingProgress() {
    document.addEventListener('DOMContentLoaded', function() {
        const bar = document.querySelector('.kb-reading-progress');
        if (!bar) return;

        function updateProgress() {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight <= 0) { bar.style.width = '100%'; return; }
            const scrolled = window.scrollY || document.documentElement.scrollTop;
            const pct = Math.min(100, Math.max(0, (scrolled / docHeight) * 100));
            bar.style.width = pct + '%';
        }

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    });
})();


/* ── BACK-TO-TOP BUTTON ── */
(function initBackToTop() {
    document.addEventListener('DOMContentLoaded', function() {
        // Create button if not already in DOM
        let btn = document.querySelector('.kb-back-to-top');
        if (!btn) {
            btn = document.createElement('button');
            btn.className = 'kb-back-to-top';
            btn.innerHTML = '↑';
            btn.setAttribute('aria-label', 'Back to top');
            btn.title = 'Back to top';
            document.body.appendChild(btn);
        }

        function toggleBtn() {
            if (window.scrollY > 400) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        }

        btn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', toggleBtn, { passive: true });
        toggleBtn();
    });
})();


/* ── SMOOTH ANCHOR SCROLLING (iframe-safe) ── */
(function initSmoothAnchors() {
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('a[href^="#"]').forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (!href || href === '#') return;
                const target = document.getElementById(href.substring(1));
                if (target) {
                    e.preventDefault();
                    const navHeight = 70;
                    const top = target.offsetTop - navHeight;
                    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
                    // Update URL hash without triggering scroll
                    history.replaceState(null, null, href);
                }
            });
        });
    });
})();


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
    document.querySelectorAll('.edit-link').forEach(link => {
        link.addEventListener('dblclick', openLinkEditor);
    });
}

function lockPage() {
    isAdmin = false;
    document.getElementById('admin-toolkit').style.display = 'none';
    hideBubble();
    document.body.classList.remove('edit-mode-active');
    document.querySelectorAll('.edit-text').forEach(el => el.removeAttribute('contenteditable'));
    document.querySelectorAll('.edit-img').forEach(img => img.removeEventListener('click', openImgEditor));
    document.querySelectorAll('.edit-link').forEach(link => {
        link.removeEventListener('dblclick', openLinkEditor);
    });
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

function openLinkEditor(e) {
    if (!isAdmin) return;
    e.preventDefault();
    const link = e.currentTarget;
    const newUrl = prompt('Edit link URL:', link.href || link.getAttribute('href'));
    if (newUrl !== null && newUrl.trim()) {
        link.href = newUrl.trim();
    }
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
    // Remove admin elements from clone
    const tools = clone.querySelector('#admin-master-container');
    if (tools) tools.remove();
    // Remove back-to-top button if auto-generated
    const btt = clone.querySelector('.kb-back-to-top');
    if (btt) btt.remove();
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
