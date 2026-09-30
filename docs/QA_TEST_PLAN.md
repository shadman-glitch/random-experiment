# QA Test Plan & Validation Matrix
**Project**: AURA — Next-Gen Spatial Audio & Smart Wearables  
**Repository**: `random-experiment`  
**Lead Engineer**: Agent 7 (QA & Automation Test Engineer)  
**Status**: APPROVED by CEO | Flaw Hunter Verified

---

## 1. Test Strategy
All tests run with zero external npm dependencies using Node.js built-in `node:test` and `node:assert` modules.

## 2. Test Matrix

### 2.1 Cart Mathematics & Pricing Engine
- [x] Subtotal calculation with multiple items and quantities.
- [x] Free shipping threshold ($150 limit):
  - Subtotal < $150 => Shipping = $15.
  - Subtotal >= $150 => Shipping = $0.
- [x] Coupon Code `WELCOME20`: 20% discount on subtotal.
- [x] Coupon Code `FREESHIP`: 100% shipping discount.
- [x] Sales tax calculation: 8% of discounted subtotal.
- [x] Total sum matching: `total = subtotal - discount + shipping + tax`.

### 2.2 Form Validation Rules
- [x] Email validation: RFC-compliant email regex.
- [x] Shipping Address: Non-empty name, street, city, valid 5-digit zip.
- [x] Card Number: 16 digits validation with formatting.
- [x] CVV and Expiry format checks.

### 2.3 API Schema Conformance
- [x] Products endpoint returns required keys (`id`, `name`, `price`, `colors`, `specs`).
- [x] Orders endpoint generates valid tracking ID format `ORD-YYYY-XXXX`.

### 2.4 Browser & Usability Checks
- [x] WebGL context loss handling.
- [x] Escape key listener dismisses modals and cart drawer.
- [x] Cart counter badges reflect total quantity.
