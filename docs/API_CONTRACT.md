# RESTful API Contract Specification
**Project**: AURA — Next-Gen Spatial Audio & Smart Wearables  
**Repository**: `random-experiment`  
**Lead Engineer**: Agent 5 (Back-End Engineer)  
**Status**: APPROVED by CEO | Flaw Hunter Verified

---

## 1. Overview
All endpoints are available via Vercel Serverless Functions under `/api/*` and mirrored within the client `api-service.js` for 100% offline and static resilience.

---

## 2. Endpoints

### 2.1 GET `/api/products`
Retrieves product catalog.
- **Query Params**:
  - `category` (optional, string): Filter by category name (e.g. `Headphones`, `Watches`).
  - `search` (optional, string): Text search against name and description.
  - `sort` (optional, string): `price-asc`, `price-desc`, `rating`.
- **Response**: `200 OK`
```json
{
  "success": true,
  "count": 8,
  "products": [ ... ]
}
```

### 2.2 POST `/api/orders`
Submits a customer order.
- **Request Body**:
```json
{
  "customer": {
    "name": "Alex Mercer",
    "email": "alex@example.com",
    "address": "742 Evergreen Terrace",
    "city": "Springfield",
    "postalCode": "97477"
  },
  "items": [
    { "productId": "aura-pro-headphones", "quantity": 1, "color": "Cyber Silver" }
  ],
  "promoCode": "WELCOME20",
  "payment": { "method": "card", "lastFour": "4242" }
}
```
- **Response**: `201 Created`
```json
{
  "success": true,
  "orderId": "ORD-2026-8492",
  "estimatedDelivery": "October 4, 2026",
  "totals": {
    "subtotal": 299.00,
    "discount": 59.80,
    "shipping": 0.00,
    "tax": 19.14,
    "total": 258.34
  }
}
```

### 2.3 POST `/api/auth`
Authentication & Session Management.
- **Request Body (Login)**:
```json
{
  "action": "login",
  "email": "alex@example.com",
  "password": "securepassword"
}
```
- **Response**: `200 OK`
```json
{
  "success": true,
  "token": "mock-jwt-header.payload.signature",
  "user": {
    "name": "Alex Mercer",
    "email": "alex@example.com",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
  }
}
```
