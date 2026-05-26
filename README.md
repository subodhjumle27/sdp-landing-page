# Science Driven Performance (SDP) — Redesign Prototype

A premium, data-driven, single-page marketing and client-acquisition platform for **Science Driven Performance**. This prototype is designed specifically to capture high-value, busy professionals by establishing high-leverage scientific authority, removing traditional sales friction, and deploying elite UX.

---

## ⚡ Design System & Custom Tokens

The visual style is built on a technical "Athletic Laboratory" aesthetic, ditching corporate template formats for crisp, high-contrast editorial grid structures. All values are driven by CSS variables in `index.css`:

### 🎨 Color Palette
*   `--bg-dark`: `#0D0F12` (Deep, serious slate canvas)
*   `--bg-dark-card`: `#13161A` (Solid card background)
*   `--text-light`: `#F8FAFC` (Clean, warm alabaster text)
*   `--text-muted`: `#94A3B8` (Slate-silver readability copy)
*   `--accent-volt`: `#D4FF37` (High-visibility athletic neon)
*   `--border-steel`: `#272A30` (Precise, solid grid boundaries)
*   `--accent-red`: `#FF4D4D` (Warning or attention indicators)

### ✍️ Technical Typography
*   **Headers & Tags**: `Space Grotesk`, sans-serif (Precision geometric structural curves)
*   **Metrics & Numbers**: `Share Tech Mono`, monospace (Telemetry, biomarker logs, and training counters)
*   **Body Copy**: `Inter`, sans-serif (Clean, readable text scale)

---

## 🛠️ Architecture & Core Components

This front-end system is engineered on native web standards for maximum speed, accessibility, and responsiveness:

1.  **Editorial Hero & Matrix Dashboard**: Striking headline combined with a dynamic client dashboard showing animated sleep, heart rate variability (HRV), and weekly lifting volume telemetry.
2.  **Diagnostic Board**: High-contrast grid where user clicks a lifestyle blocker (e.g. *Time Poor*, *Consistency Crash*) and the panel flips or expands dynamically to detail the training/nutrition architecture response.
3.  **3-Phase Performance Timeline**: Oversized technical numbers and clean vertical line grids mapping onboarding and iterative check-in feedback loops.
4.  **Energy Leak Calculator**: A 3-slide visual time-audit calculator showing the estimated physical energy loss percentage based on hours sat, sleep duration, and weekly training time.
5.  **Exit-Intent Dialog Recovery**: Minimalist modal triggered by viewport mouse departure that offers a free 10-minute desk-bound movement protocol to capture top-of-funnel email leads.

---

## 🚀 Running Locally

1.  Open the workspace folder in your local system:
    ```bash
    cd /Users/sub/Downloads/Projects/SDP
    ```
2.  Launch a simple local web server on port 3005:
    ```bash
    npx -y browser-sync start --server --port 3005 --files "*.*"
    ```
3.  Open `http://localhost:3005` in your web browser.
