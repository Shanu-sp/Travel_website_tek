# Implementation Plan: Wanderly Travel & Tourism Homepage
**Stack:** Clean Semantic HTML5 • Vanilla CSS3 • Modern Vanilla JavaScript (ES6+)  
**Brand:** Wanderly (*Discover More. Travel Further.*)  
**Target:** Teknoppy Junior Web Developer Technical Assignment  

---

## 1. Executive Summary & Design Vision

### 1.1 Objective
Build a clean, high-performance, and responsive homepage for a fictional travel company (**Wanderly**) based on the official Teknoppy requirements. 

### 1.2 Guiding Principle
> **"A clean, responsive website that works well — not an overly complex project."**

### 1.3 Why HTML / CSS / JS Architecture?
- **Zero Build Tool Fragility:** No Webpack/Vite/Astro bundle failures during live interviews.
- **Crystal Clear Codebase:** Every line of HTML, CSS, and JS is instantly readable and explainable.
- **Instant Live Screen-share Edits:** Enables rapid live modifications during the interview round (changing CTA, tweaking layout, adding components).
- **Fast Performance & High Accessibility:** Pure native browser execution with 100/100 performance potential.

---

## 2. Design System & Style Tokens

All styling will be driven by CSS Custom Properties (`:root`) in `css/style.css` so any color, spacing, or typography change takes only seconds.

### 2.1 Color Palette
```css
:root {
  /* Brand Core */
  --color-primary: #0f4c81;        /* Deep Ocean Blue - Trust, Authority */
  --color-primary-dark: #0a3258;   /* Darker Navy for hover/footer */
  --color-accent: #ff6b4a;         /* Sunset Coral - High-conversion CTA */
  --color-accent-hover: #e55636;   /* Darker Coral for button hover */
  --color-secondary: #2ec4b6;      /* Turquoise/Aqua - Fresh travel vibe */

  /* Neutrals & Surfaces */
  --color-bg: #f8fafc;             /* Clean, soft light gray/blue background */
  --color-surface: #ffffff;        /* Pure white for cards and modals */
  --color-text-main: #1e293b;      /* Slate 800 - High legibility body text */
  --color-text-muted: #64748b;     /* Slate 500 - Subtitles & metadata */
  --color-border: #e2e8f0;         /* Slate 200 - Clean divider lines */

  /* Spacing & Radii */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-pill: 9999px;
  
  /* Shadows & Elevation */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 12px 24px -4px rgba(0, 0, 0, 0.12);

  /* Transitions */
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
}
```

### 2.2 Typography
- **Primary Font:** `'Plus Jakarta Sans'`, sans-serif (via Google Fonts) — modern, clean, and highly legible across all device sizes.
- **Accent Font (Headings):** `'Plus Jakarta Sans'` with distinct weights (600, 700, 800).
- **Scale:** Modular type scale with `clamp()` for fluid font sizing on mobile vs desktop.

---

## 3. Directory & File Structure

```text
Travel_website_tek/
├── index.html                      # Semantic HTML5 homepage structure
├── css/
│   └── style.css                   # Complete design system, layouts & media queries
├── js/
│   └── main.js                     # Mobile navigation, smooth scrolling & interactions
├── assets/
│   ├── images/
│   │   ├── hero-bg.jpg             # High quality travel landscape
│   │   ├── destinations/
│   │   │   ├── bali.jpg            # Bali destination image
│   │   │   ├── dubai.jpg           # Dubai destination image
│   │   │   ├── maldives.jpg        # Maldives destination image
│   │   │   └── switzerland.jpg     # Switzerland destination image
│   │   └── packages/
│   │       ├── package-1.jpg       # Tropical Island package
│   │       ├── package-2.jpg       # Desert & City Luxury package
│   │       └── package-3.jpg       # Alpine Adventure package
├── .gitignore                      # Standard project gitignore
├── README.md                       # Documentation & submission info
├── REQUIREMENTS.md                 # Original assignment requirements
└── IMPLEMENTATION_PLAN.md          # Technical implementation plan
```

---

## 4. Section-by-Section Technical Specifications

### Section 01: Header & Navigation
- **HTML Structure:**
  - `<header class="site-header" id="header">`
  - `<div class="container nav-wrapper">`
  - `<a href="#home" class="logo">` (`Wanderly` with a modern SVG compass/globe icon)
  - `<nav class="nav-menu" id="navMenu">` with links (`Home`, `Destinations`, `Packages`, `About`, `Contact`)
  - `<a href="#plan-trip" class="btn btn-primary nav-cta">Plan Your Trip</a>`
  - `<button class="mobile-toggle" id="mobileToggle" aria-label="Toggle Navigation Menu">` (Hamburger icon)
- **Styling & Behavior:**
  - Sticky navbar (`position: sticky; top: 0; z-index: 1000;`) with subtle backdrop blur (`backdrop-filter: blur(10px)`).
  - Clean hover underlines / color shifts on nav items.
  - Mobile: Slide-in or dropdown drawer menu triggered on click, smooth animation.

---

### Section 02: Hero Section
- **HTML Structure:**
  - `<section class="hero-section" id="home">`
  - Travel background imagery with dark overlay gradient for readable white text.
  - Headline: `<h1>Explore the World, Your Way</h1>`
  - Subtitle: `<p class="hero-subtitle">Discover handpicked destinations, curated packages, and unforgettable experiences tailored to your dream journey.</p>`
  - Action CTA: `<div class="hero-actions"><a href="#destinations" class="btn btn-accent btn-lg">Explore Destinations</a><a href="#packages" class="btn btn-outline-light btn-lg">View Packages</a></div>`
- **Styling:**
  - Height: `min-height: 85vh;` with flexbox centering.
  - Clear visual contrast and call-to-action buttons.

---

### Section 03: Popular Destinations (4 Cards)
- **HTML Structure:**
  - `<section class="destinations-section section-padding" id="destinations">`
  - Section Header: `<h2>Popular Destinations</h2>` + subtitle.
  - Grid Container: `<div class="destinations-grid">` (4 cards):
    1. **Bali, Indonesia** — "Tropical paradise with lush terraces and tranquil beaches."
    2. **Dubai, UAE** — "Futuristic architecture, luxury shopping, and golden deserts."
    3. **Maldives** — "Crystal clear turquoise waters, overwater villas, and coral reefs."
    4. **Switzerland** — "Majestic Alpine peaks, serene glacial lakes, and scenic train routes."
  - Card Structure:
    - `<article class="destination-card">`
    - `<div class="card-img-wrap"><img src="..." alt="..." /><span class="badge">Top Rated</span></div>`
    - `<div class="card-body"><h3>...</h3><p>...</p><a href="#plan-trip" class="btn-card">Explore &rarr;</a></div>`
- **Layout:** CSS Grid with `repeat(auto-fit, minmax(260px, 1fr))` for 4 columns on desktop, 2 on tablet, 1 on mobile.

---

### Section 04: Travel Packages (3 Cards)
- **HTML Structure:**
  - `<section class="packages-section section-padding" id="packages">`
  - Section Header: `<h2>Featured Travel Packages</h2>`
  - Grid Container: `<div class="packages-grid">` (3 cards):
    1. **Tropical Bali Explorer** | Duration: `6 Days / 5 Nights` | Starting Price: `$799`
    2. **Dubai Extravaganza** | Duration: `5 Days / 4 Nights` | Starting Price: `$1,099`
    3. **Swiss Alps Escape** | Duration: `7 Days / 6 Nights` | Starting Price: `$1,499`
  - Card Elements:
    - Card image + duration pill badge.
    - Package title + highlights bullet points (e.g., *Hotel Included*, *Guided Tours*, *Free Breakfast*).
    - Price label: `<div class="price-box"><span class="from">Starting from</span><span class="amount">$799</span></div>`
    - Button: `<a href="#plan-trip" class="btn btn-primary w-100">Book Package</a>`
- **Layout:** 3-column CSS Grid on desktop, 1 column on mobile.

---

### Section 05: Why Choose Us (3 Benefits)
- **HTML Structure:**
  - `<section class="features-section section-padding" id="about">`
  - Section Header: `<h2>Why Choose Wanderly</h2>`
  - Grid Container: `<div class="features-grid">` (3 cards):
    1. **Best Travel Deals** — "Guaranteed competitive pricing with no hidden charges or booking markups." (Icon: Tag / Discount)
    2. **Handpicked Destinations** — "Every hotel, tour, and itinerary is personally inspected and curated." (Icon: Map Pin / Compass)
    3. **24/7 Dedicated Support** — "Round-the-clock assistance from our expert travel specialists anywhere in the world." (Icon: Headset / Shield)
- **Layout:** Clean icon cards with subtle borders and lift hover animation.

---

### Section 06: Final Call to Action (Banner)
- **HTML Structure:**
  - `<section class="cta-section section-padding" id="plan-trip">`
  - High-impact banner card with subtle travel gradient background.
  - Headline: `<h2>Ready for Your Next Adventure?</h2>`
  - Paragraph: `<p>Contact our travel advisors today and get a personalized itinerary crafted just for you.</p>`
  - Action Button: `<a href="#contact" class="btn btn-accent btn-lg">Plan Your Trip</a>`

---

### Section 07: Footer
- **HTML Structure:**
  - `<footer class="site-footer" id="contact">`
  - 4-column layout on desktop:
    - **Col 1 (Brand):** Wanderly logo, brand tagline, social media links (Instagram, Facebook, X/Twitter, YouTube).
    - **Col 2 (Quick Links):** Home, Destinations, Packages, About Us, FAQs.
    - **Col 3 (Top Places):** Bali, Dubai, Maldives, Switzerland, Tokyo.
    - **Col 4 (Contact Info):** Email (`hello@wanderly.com`), Phone (`+1 (800) 555-0199`), Address (`123 Wanderlust Way, Suite 400`).
  - Bottom bar: `© 2026 Wanderly Travel Ltd. All rights reserved.`

---

## 5. Responsive Layout Strategy & Breakpoints

| Viewport | Device Category | Layout Behavior |
| :--- | :--- | :--- |
| **> 1024px** | Desktop / Large Laptops | Full multi-column grids (4-col destinations, 3-col packages, 3-col benefits). Inline header navigation. |
| **768px - 1023px** | Tablets / Small Laptops | 2-column destinations grid, 2/3-col packages. Header keeps inline or switches cleanly. |
| **480px - 767px** | Mobile Devices (Portrait/Landscape) | 1-column cards, hamburger drawer menu, touch-friendly buttons (`min-height: 48px`), full edge-to-edge padding (`1.25rem`). Zero horizontal scrolling. |
| **< 480px** | Small Phones | Responsive font clamp, stacked button actions, full-width CTA buttons. |

---

## 6. JavaScript Architecture (Lightweight & Clean)

`js/main.js` will contain strictly organized, pure vanilla functions:
1. **Mobile Menu Drawer Toggle:**
   - Listens to click on `#mobileToggle`.
   - Toggles `.is-active` class on `#navMenu` and `#mobileToggle`.
   - Sets `aria-expanded="true/false"` for accessibility.
   - Closes automatically when clicking a nav link or clicking outside the menu.
2. **Sticky Header Dynamic State:**
   - Adds `.scrolled` class on `window.scrollY > 40` to add shadow and background blur.
3. **Smooth Scroll Behavior:**
   - Native CSS `scroll-behavior: smooth;` supplemented with offset handling for sticky header.
4. **Interactive Trip Plan Trigger (Modal or Notification):**
   - When clicking any "Plan Your Trip" or "Book Package" button, smoothly opens a clean booking/inquiry modal with simple inputs (Name, Destination, Travel Dates, Travelers) for realistic interactivity without any backend requirement.

---

## 7. Next-Round Practical Check Preparation (Interview Defense)

The assignment mentions that in the interview round, you may be asked to make live changes. Here is how our code is structured to make each change effortless:

| Potential Interview Task | How Our Code Makes It Simple |
| :--- | :--- |
| **1. "Change the Hero CTA text or link"** | Open `index.html` -> find `<section class="hero-section">` -> modify the text inside `<a class="btn btn-accent">` in 5 seconds. |
| **2. "Add a Destination Dropdown"** | In `index.html` inside the hero or header, insert a pre-styled `<select class="custom-select">` with destination options. |
| **3. "Add a 5th destination card"** | Duplicate one `<article class="destination-card">` in `index.html`. The CSS Grid auto-fits automatically without breaking the layout. |
| **4. "Fix or adjust mobile navigation"** | Open `css/style.css` -> find the dedicated `@media (max-width: 768px)` block clearly labeled `/* ===== MOBILE NAVIGATION ===== */`. |
| **5. "Change the theme accent color"** | In `css/style.css` -> change `--color-accent: #ff6b4a;` to any color and it updates across all buttons, highlights, and badges instantly. |

---

## 8. Step-by-Step Execution Plan

- [x] **Phase 1: Requirements Analysis & Specification** (Complete)
- [ ] **Phase 2: Asset Preparation** (Curate clean, high-resolution destination and package imagery)
- [ ] **Phase 3: CSS Design System Foundation** (Write `css/style.css` with variables, reset, utility classes, and base components)
- [ ] **Phase 4: Semantic HTML Markup** (Write `index.html` covering all 7 sections with accessibility attributes)
- [ ] **Phase 5: Responsive Layout & Mobile Drawer** (Implement CSS Grid/Flexbox and mobile drawer navigation)
- [ ] **Phase 6: JavaScript Interactivity** (Implement `js/main.js` with mobile menu, smooth scrolling, sticky header)
- [ ] **Phase 7: Responsive Quality Assurance** (Verify across 375px mobile, 768px tablet, and 1440px desktop)
- [ ] **Phase 8: Git Commit & Push** (Push clean modular commits to GitHub)
