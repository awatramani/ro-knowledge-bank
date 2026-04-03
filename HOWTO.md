# RO Knowledge Bank — How-To Guide
**J-PAL South Asia · Research Operations Team**

---

## What This Folder Contains

| File | What It Does |
|---|---|
| `kb-theme.css` | Controls the design of ALL pages. Edit once here, every page updates. |
| `kb-admin.js` | Powers the interactive features (checklist, edit mode). Never edit this. |
| `template-blank.html` | Blank template for new Core/Foundational pages. |
| `sectors/template-sector.html` | Blank template for new Sector pages. |
| `core/01-surveyor-basics.html` | First built core page (fully complete). |

---

## How to Create a New Core Page

1. **Duplicate** `template-blank.html`
2. **Rename** it — e.g. `core/02-research-ethics.html`
3. **Open** it in any text editor (Notepad, VS Code, etc.)
4. **Update the `<title>` tag** at the top
5. **Fill in the HERO section** — eyebrow, title, subtitle, meta pills
6. **Update the sticky NAV links** to match your section IDs
7. **Replace placeholder text** in each section with real content
8. **Swap images** — replace Unsplash URLs with Google Drive URLs:
   - Get your Drive image URL: Right-click image → Share → Copy link
   - The Admin Editor (Alt+Shift+E) can do this for you visually
9. **Upload the file** to the `core/` folder on GitHub
10. **Embed in Google Sites** — Insert → Embed → paste the GitHub raw URL

---

## How to Create a New Sector Page

Same as above but:
1. **Duplicate** `sectors/template-sector.html`
2. **Rename** — e.g. `sectors/education.html`
3. **Replace all** `[SECTOR NAME]` placeholders with the actual sector name
4. Fill in sector-specific content in each section
5. Upload to `sectors/` folder on GitHub

---

## How to Use the Admin Editor

The Admin Editor lets you edit text and swap images directly in the browser — no code needed.

1. **Open** any page in a browser
2. **Press** `Alt + Shift + E` to enter Edit Mode
3. **Click any text** to edit it directly
4. **Click any image** to replace it (paste a URL)
5. **Press** `📋 Copy Code` — this copies the entire updated page HTML
6. **Paste** the copied code back into GitHub to save changes
7. **Press** `✕ Lock` to exit Edit Mode

---

## How to Change the Design Across All Pages

1. Open `kb-theme.css` on GitHub
2. Click the **pencil icon** (Edit)
3. Find the `:root { }` block at the top — these are the colour variables
4. Change any value — e.g. `--heading-green: #1A7A6D;`
5. Click **Commit changes**
6. All pages update automatically within ~60 seconds

**Common things to change:**
- `--heading-green` → main brand colour
- `--brand-dark` → dark text and header backgrounds
- `--bg-light-green` → alternating section background

---

## How to Embed a Page in Google Sites

1. Go to your Google Site page
2. Click **Insert → Embed**
3. Paste the **raw GitHub URL** of the HTML file:
   - Go to the file on GitHub
   - Click **Raw** button
   - Copy that URL
   - It will look like: `https://raw.githubusercontent.com/awatramani/ro-knowledge-bank/main/core/01-surveyor-basics.html`
4. Click **Insert**
5. Resize the embed block to fill the page width

---

## File Naming Convention

| Type | Format | Example |
|---|---|---|
| Core pages | `core/0X-topic-name.html` | `core/02-research-ethics.html` |
| Core sub-pages | `core/04a-topic-name.html` | `core/04a-survey-instrument.html` |
| Sector pages | `sectors/sector-name.html` | `sectors/education.html` |

---

## Page Structure Reference

Every page follows this pattern:

```
Sticky Nav
Hero Banner
Section 1 — White bg, Text Left / Image Right
Section 2 — Green bg, Image Left / Text Right
Section 3 — White bg, Full Width (tables, dos/donts)
Section 4 — Green bg, Split (scenarios, timelines)
Section 5 — White bg, Split (partner/protocols)
Section 6 — Green bg, Full Width (checklist, quotes)
Footer
```

Alternate white and green backgrounds between sections.
Maximum 2 scenario boxes per section.
Keep sections to 1 main concept each.

---

## All Pages: Current Status

### Core & Foundational Skills (5 topics)
- [x] `core/01-surveyor-basics.html` — Complete
- [ ] `core/02-research-ethics.html` — To build
- [ ] `core/03-respondent-tracking.html` — To build
- [ ] `core/04a-survey-instrument.html` — To build
- [ ] `core/04b-interview-techniques.html` — To build
- [ ] `core/04c-field-protocols.html` — To build

### Sector Skills (8 sectors)
- [ ] `sectors/education.html`
- [ ] `sectors/health.html`
- [ ] `sectors/gender.html`
- [ ] `sectors/social-protection.html`
- [ ] `sectors/agriculture.html`
- [ ] `sectors/governance.html`
- [ ] `sectors/labour-market.html`
- [ ] `sectors/firms.html`

---

*Maintained by J-PAL South Asia Research Operations Team*
