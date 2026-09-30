# Design System & UI/UX Guidelines
**Project**: AURA — Next-Gen Spatial Audio & Smart Wearables  
**Repository**: `random-experiment`  
**Lead Designer**: Agent 2 (UI/UX Designer)  
**Status**: APPROVED by CEO | Flaw Hunter Verified

---

## 1. Aesthetic Direction: Cyber-Luxury Minimalist
The interface combines futuristic high-tech spatial elements with the refined simplicity of luxury modern design. It emphasizes depth, physical materials, soft lighting, and clean typography.

---

## 2. Color Tokens (CSS Custom Properties)

### Dark Theme (Default)
- **Background Root**: `hsl(220, 20%, 6%)` (`#0b0e14`)
- **Surface Elevation 1 (Card)**: `hsl(220, 18%, 10%)` (`#141822`)
- **Surface Elevation 2 (Modal / Drawer)**: `hsl(220, 16%, 14%)` (`#1e2330`)
- **Surface Glassmorphism**: `rgba(20, 24, 34, 0.75)` with `backdrop-filter: blur(16px)`
- **Accent Primary (Neon Cyan)**: `hsl(187, 92%, 55%)` (`#22d3ee`)
- **Accent Glow**: `rgba(34, 211, 238, 0.25)`
- **Accent Secondary (Electric Purple)**: `hsl(270, 90%, 65%)` (`#a855f7`)
- **Text Main**: `hsl(0, 0%, 98%)` (`#fafafa`)
- **Text Muted**: `hsl(220, 10%, 65%)` (`#9ca3af`)
- **Border Subtle**: `rgba(255, 255, 255, 0.08)`
- **Success / In-Stock**: `hsl(150, 80%, 45%)` (`#10b981`)

### Light Theme
- **Background Root**: `hsl(210, 25%, 98%)` (`#f8fafc`)
- **Surface Elevation 1 (Card)**: `hsl(0, 0%, 100%)` (`#ffffff`)
- **Surface Elevation 2 (Modal / Drawer)**: `hsl(210, 20%, 96%)` (`#f1f5f9`)
- **Surface Glassmorphism**: `rgba(255, 255, 255, 0.85)` with `backdrop-filter: blur(16px)`
- **Accent Primary**: `hsl(190, 95%, 42%)` (`#0891b2`)
- **Text Main**: `hsl(220, 30%, 12%)` (`#111827`)
- **Text Muted**: `hsl(220, 10%, 40%)` (`#64748b`)
- **Border Subtle**: `rgba(0, 0, 0, 0.08)`

---

## 3. Typography Hierarchy
- **Font Family**: `'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Hero Title**: `clamp(2.5rem, 5vw, 4.2rem)`, `font-weight: 800`, `letter-spacing: -0.03em`
- **Section Headings**: `clamp(1.75rem, 3vw, 2.5rem)`, `font-weight: 700`
- **Card Titles**: `1.25rem`, `font-weight: 600`
- **Body Text**: `1rem`, `font-weight: 400`, `line-height: 1.6`
- **Micro-Copy & Badges**: `0.8rem`, `font-weight: 600`, `text-transform: uppercase`, `letter-spacing: 0.05em`

---

## 4. 3D Viewport Ergonomics
1. **Interactive Controls**:
   - Cursor defaults to `grab`, switches to `grabbing` during orbital movement.
   - Smooth damping (inertia) on rotation for realistic physical momentum.
2. **Visual Feedback**:
   - Color selection updates the 3D model within 1 frame (instant visual feedback).
   - Hotspot markers pulse gently with micro-animations.
3. **Graceful Fallbacks**:
   - High-fidelity pre-rendered image asset displays if WebGL context creation fails.

---

## 5. Plain English E-Commerce Micro-Copy Rules
- Avoid jargon like "Dynamic Transducer Fidelity Architecture".
- Use simple, friendly words: "Crystal-Clear Sound", "40-Hour Battery", "Touch Controls", "Noise Cancellation".
- Primary CTA buttons: "Add to Bag", "Go to Checkout", "Place Order".
