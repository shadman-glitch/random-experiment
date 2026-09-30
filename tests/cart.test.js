/**
 * Automated QA Unit Tests: Cart & Pricing Mathematics
 * Created by Agent 7 (QA & Automation Test Engineer)
 * Zero External Dependencies (Node.js built-in test runner)
 */

const assert = require('node:assert');
const { Store } = require('../js/store.js');

// Mock localStorage for Node test environment
global.localStorage = {
  store: {},
  getItem(key) { return this.store[key] || null; },
  setItem(key, value) { this.store[key] = String(value); },
  removeItem(key) { delete this.store[key]; },
  clear() { this.store = {}; }
};

// Mock document for theme attribute
global.document = {
  documentElement: {
    setAttribute: () => {}
  }
};

function runCartTests() {
  console.log("--- Running Cart & Pricing Engine Tests ---");
  const store = new Store();

  // Test 1: Empty Cart Totals
  const emptyTotals = store.getCartTotals();
  assert.strictEqual(emptyTotals.subtotal, 0, "Empty subtotal must be 0");
  assert.strictEqual(emptyTotals.totalItems, 0, "Empty total items must be 0");
  assert.strictEqual(emptyTotals.shippingFee, 0, "Empty shipping must be 0");
  assert.strictEqual(emptyTotals.finalTotal, 0, "Empty final total must be 0");
  console.log("  ✓ Test 1 Passed: Empty cart behaves correctly");

  // Test 2: Adding Items Below Free Shipping Threshold (<$150)
  store.addToCart({ id: "aura-pulse-band", name: "Pulse Band", price: 99 }, "Graphite", 1);
  const belowThreshold = store.getCartTotals();
  assert.strictEqual(belowThreshold.subtotal, 99.00, "Subtotal must be 99.00");
  assert.strictEqual(belowThreshold.shippingFee, 15.00, "Shipping fee below $150 threshold must be $15.00");
  assert.strictEqual(belowThreshold.amountNeededForFreeShipping, 51.00, "Remaining for free shipping must be $51.00");
  assert.strictEqual(belowThreshold.tax, 7.92, "Tax at 8% on 99 must be 7.92");
  assert.strictEqual(belowThreshold.finalTotal, 121.92, "Final total must equal 99 + 15 + 7.92 = 121.92");
  console.log("  ✓ Test 2 Passed: Below threshold pricing accurate");

  // Test 3: Unlocking Free Shipping (>= $150)
  store.addToCart({ id: "aura-air-earbuds", name: "Air Earbuds", price: 179 }, "Cyber Silver", 1);
  const aboveThreshold = store.getCartTotals();
  // Subtotal = 99 + 179 = 278
  assert.strictEqual(aboveThreshold.subtotal, 278.00, "Subtotal must be 278.00");
  assert.strictEqual(aboveThreshold.shippingFee, 0, "Shipping must be FREE ($0) at subtotal >= $150");
  assert.strictEqual(aboveThreshold.progressToFreeShipping, 100, "Free shipping meter must be 100%");
  console.log("  ✓ Test 3 Passed: Free shipping unlock calculation accurate");

  // Test 4: 20% Promo Code WELCOME20
  const promoRes = store.applyPromoCode("WELCOME20");
  assert.strictEqual(promoRes.success, true, "Promo WELCOME20 must apply successfully");
  const promoTotals = store.getCartTotals();
  // 20% of 278 = 55.60. Discounted subtotal = 222.40. Tax 8% of 222.40 = 17.79. Shipping = 0. Total = 240.19
  assert.strictEqual(promoTotals.discountAmount, 55.60, "20% discount on 278 must be 55.60");
  assert.strictEqual(promoTotals.tax, 17.79, "Tax on discounted subtotal must be 17.79");
  assert.strictEqual(promoTotals.finalTotal, 240.19, "Final total with discount must be 240.19");
  console.log("  ✓ Test 4 Passed: Promo code math accurate");

  // Test 5: Quantity Modification & Item Removal
  store.updateQuantity("aura-pulse-band", "Graphite", -1);
  assert.strictEqual(store.state.cart.length, 1, "Item should be removed when quantity reaches 0");
  console.log("  ✓ Test 5 Passed: Quantity decrement & removal accurate");

  return true;
}

module.exports = { runCartTests };
if (require.main === module) {
  runCartTests();
}
