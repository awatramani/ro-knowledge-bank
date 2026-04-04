/*
 * ============================================================
 *  J-PAL SA — RO Knowledge Bank
 *  kb-gate.js — Lightweight password gate for all pages
 *
 *  TO CHANGE THE PASSWORD:
 *  1. Open this file on GitHub
 *  2. Click the pencil (Edit) icon
 *  3. Change the value of CORRECT below
 *  4. Commit — all pages update instantly
 * ============================================================
 */

(function () {

    // ── SET YOUR PASSWORD HERE ────────────────────────────
    const CORRECT   = "jpalro2026";
    // ─────────────────────────────────────────────────────

    const KEY = "kb_auth_v1";

    // Already authenticated this session — show page
    if (sessionStorage.getItem(KEY) === "true") return;

    // Hide page until authenticated
    document.documentElement.style.visibility = "hidden";

    // Inject gate styles
    const style = document.createElement("style");
    style.textContent = `
        #kb-gate {
            position:fixed;inset:0;z-index:9999999;
            background:linear-gradient(135deg,#1e293b 0%,#0f2444 55%,#0c3d35 100%);
            display:flex;align-items:center;justify-content:center;
            font-family:'Open Sans',system-ui,sans-serif;padding:24px;
        }
        #kb-gate-card {
            background:white;border-radius:20px;padding:44px 48px;
            max-width:400px;width:100%;text-align:center;
            box-shadow:0 40px 80px rgba(0,0,0,0.5);
            border-top:5px solid #1A7A6D;
            animation:gateIn 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes gateIn {
            from{opacity:0;transform:translateY(20px) scale(0.97);}
            to{opacity:1;transform:translateY(0) scale(1);}
        }
        #kb-gate-icon {
            width:54px;height:54px;border-radius:14px;
            background:rgba(26,122,109,0.1);
            display:flex;align-items:center;justify-content:center;
            margin:0 auto 16px;font-size:26px;
        }
        #kb-gate-card h2 {
            font-size:21px;font-weight:800;color:#1e293b;
            margin:0 0 5px;letter-spacing:-0.5px;
        }
        #kb-gate-card .sub {
            font-size:11.5px;color:#64748b;font-weight:700;
            text-transform:uppercase;letter-spacing:1.5px;
            margin:0 0 28px;display:block;
        }
        #kb-gate-input {
            width:100%;padding:13px 16px;font-size:15px;
            border:2px solid #e2e8f0;border-radius:12px;
            margin-bottom:12px;outline:none;
            font-family:'Open Sans',system-ui,sans-serif;
            transition:border-color 0.2s;
        }
        #kb-gate-input:focus { border-color:#1A7A6D; }
        #kb-gate-input.error { border-color:#dc2626;background:#fff1f2; }
        #kb-gate-btn {
            width:100%;padding:13px;font-size:15px;font-weight:700;
            background:#1A7A6D;color:white;border:none;border-radius:12px;
            cursor:pointer;transition:background 0.2s;
            font-family:'Open Sans',system-ui,sans-serif;
        }
        #kb-gate-btn:hover { background:#135c52; }
        #kb-gate-error {
            font-size:13px;color:#dc2626;font-weight:600;
            margin:10px 0 0;min-height:18px;
        }
        #kb-gate-footer {
            margin:22px 0 0;font-size:12px;color:#94a3b8;
            line-height:1.6;border-top:1px solid #f1f5f9;padding-top:18px;
        }
    `;
    document.head.appendChild(style);

    // Build overlay
    const gate = document.createElement("div");
    gate.id = "kb-gate";
    gate.innerHTML = `
        <div id="kb-gate-card">
            <div id="kb-gate-icon">🔒</div>
            <h2>RO Knowledge Bank</h2>
            <span class="sub">J-PAL South Asia · Internal Access Only</span>
            <input type="password" id="kb-gate-input"
                placeholder="Enter access password"
                autocomplete="current-password">
            <button id="kb-gate-btn">Access Knowledge Bank →</button>
            <p id="kb-gate-error"></p>
            <p id="kb-gate-footer">
                This resource is for J-PAL South Asia field staff and
                research operations team members only. If you do not have
                a password, please contact your Research Manager.
            </p>
        </div>
    `;
    document.body.appendChild(gate);

    function attempt() {
        const input = document.getElementById("kb-gate-input");
        const error = document.getElementById("kb-gate-error");
        if (input.value === CORRECT) {
            sessionStorage.setItem(KEY, "true");
            gate.style.animation = "none";
            gate.style.opacity = "0";
            gate.style.transition = "opacity 0.3s";
            setTimeout(() => {
                gate.remove();
                document.documentElement.style.visibility = "visible";
            }, 300);
        } else {
            input.classList.add("error");
            error.textContent = "Incorrect password. Please try again.";
            input.value = "";
            input.focus();
            setTimeout(() => input.classList.remove("error"), 1500);
        }
    }

    // Wait for DOM then wire up events
    function init() {
        document.getElementById("kb-gate-btn")
            .addEventListener("click", attempt);
        document.getElementById("kb-gate-input")
            .addEventListener("keydown", e => { if (e.key === "Enter") attempt(); });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

})();
