# System Architecture Specification
**Project**: AURA — Next-Gen Spatial Audio & Smart Wearables  
**Repository**: `random-experiment`  
**Lead Architect**: Agent 1 (Product & System Architecture)  
**Status**: APPROVED by CEO | Flaw Hunter Verified

---

## 1. High-Level Architecture Overview

The system utilizes a modern, resilient, zero-cost architecture designed for ultra-fast load times, fluid 60fps 3D rendering, and zero server maintenance overhead.

```
+-------------------------------------------------------------------------------+
|                             CLIENT APPLICATION                                |
|                                                                               |
|  +------------------------+  +------------------------+  +-----------------+  |
|  |     DOM / UI Layer     |  |   Three.js 3D Engine   |  | Reactive Store  |  |
|  | (Catalog, Modals, Bag) |  | (WebGL Canvas, Shader) |  | (Cart, User, UI)|  |
|  +-----------+------------+  +-----------+------------+  +--------+--------+  |
|              |                           |                        |           |
|              +---------------------------+------------------------+           |
|                                          |                                    |
|                             +------------v------------+                       |
|                             |   Unified API Service   |                       |
|                             | (Vercel Serverless / DB)|                       |
|                             +------------+------------+                       |
+------------------------------------------|------------------------------------+
                                           |
                   +-----------------------+-----------------------+
                   |                                               |
                   v                                               v
      [ Vercel Serverless API ]                       [ Local Browser Engine ]
      - /api/products                                 - localStorage Fallback
      - /api/orders                                   - Offline Capability
      - /api/auth                                     - Zero Network Lag
```

---

## 2. Core Subsystems

### 2.1 Presentation & UI Layer
- Semantic HTML5 structure with high accessibility (ARIA labels, focus outlines, semantic headings).
- Vanilla CSS3 Design Token System with HSL dynamic variables, glassmorphism, responsive CSS Grid / Flexbox.
- No bulky bundler runtime: pure browser-native ES modules ensure lightning performance on both Vercel and local static hosting.

### 2.2 3D Canvas Rendering Engine
- Built upon **Three.js** (WebGL).
- Dynamic scene management:
  - Procedural 3D luxury headphones model created with mathematical precision (headband curve, metallic gimbal brackets, memory foam ear cups, brushed aluminum driver plates).
  - Studio Three-Point Lighting: Key directional light, soft fill light, and vibrant rim light.
  - OrbitControls simulation with touch and mouse drag, pinch-to-zoom, and inertial damping.
  - Material customizer changing PBR physical properties (`roughness`, `metalness`, `color`, `clearcoat`) in real time.
  - Exploded view translation vector matrix for internal driver display.

### 2.3 Reactive State Store (`store.js`)
- Publish/Subscribe reactive pattern.
- State slices:
  - `cart`: Array of items, quantities, and active color variant.
  - `promo`: Applied coupon, discount percentage, validity state.
  - `filters`: Active category, search query, price sort direction.
  - `theme`: Active color mode (`dark` or `light`).
  - `user`: Active authenticated session or guest profile.
- Automatic synchronization with browser `localStorage`.

### 2.4 Data & API Contract
- **Products API** (`/api/products`): Returns curated catalog with high-res photos, 3D parameters, colorways, specs, and stock levels.
- **Orders API** (`/api/orders`): Validates shipping information, calculates totals, creates signed order records, returns order tracking IDs.
- **Auth API** (`/api/auth`): Handles mock customer authentication, JWT issuance, profile updates.
- **Dual Runtime Fallback**: The client features a smart `api-service.js` that checks for live Vercel serverless functions, and seamlessly switches to local browser mock storage if running on a static CDN or preview environment.

---

## 3. Data Schemas

### 3.1 Product Model
```json
{
  "id": "aura-pro-headphones",
  "name": "AURA Pro Spatial Headphones",
  "category": "Headphones",
  "tagline": "Studio sound in true 3D space.",
  "price": 299,
  "originalPrice": 349,
  "badge": "Best Seller",
  "rating": 4.9,
  "reviewCount": 184,
  "inStock": true,
  "colors": [
    { "name": "Obsidian Black", "hex": "#121316", "threeColor": 0x121316 },
    { "name": "Cyber Silver", "hex": "#d1d5db", "threeColor": 0xd1d5db },
    { "name": "Cosmic Gold", "hex": "#d4af37", "threeColor": 0xd4af37 }
  ],
  "specs": {
    "Battery Life": "40 Hours",
    "Drivers": "45mm Custom Neodymium",
    "Connectivity": "Bluetooth 5.3 + Ultra-Low Latency Wireless",
    "Weight": "260g"
  }
}
```

### 3.2 Order Model
```json
{
  "orderId": "ORD-2026-9812",
  "createdAt": "2026-09-30T18:50:00Z",
  "items": [
    {
      "productId": "aura-pro-headphones",
      "name": "AURA Pro Spatial Headphones",
      "quantity": 1,
      "color": "Cyber Silver",
      "unitPrice": 299
    }
  ],
  "customer": {
    "name": "Alex Mercer",
    "email": "alex@example.com",
    "address": "742 Evergreen Terrace",
    "city": "Springfield",
    "postalCode": "97477"
  },
  "payment": {
    "method": "card",
    "lastFour": "4242"
  },
  "subtotal": 299.00,
  "discount": 59.80,
  "shipping": 0.00,
  "tax": 19.14,
  "total": 258.34,
  "status": "Processing"
}
```
