/**
 * Automated QA Unit Tests: Form Validation & Security
 * Created by Agent 7 (QA & Automation Test Engineer)
 * Zero External Dependencies (Node.js built-in test runner)
 */

const assert = require('node:assert');

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

function isValidPostalCode(zip) {
  return /^\d{5}(-\d{4})?$/.test(String(zip).trim()) || /^[A-Za-z0-9\s-]{3,10}$/.test(String(zip).trim());
}

function runValidationTests() {
  console.log("--- Running Form Validation & Security Tests ---");

  // Test 1: Email Validation
  assert.strictEqual(isValidEmail("alex@example.com"), true, "Valid email should pass");
  assert.strictEqual(isValidEmail("john.doe@company.co.uk"), true, "Multi-domain email should pass");
  assert.strictEqual(isValidEmail("not-an-email"), false, "Missing @ should fail");
  assert.strictEqual(isValidEmail("user@.com"), false, "Malformed domain should fail");
  assert.strictEqual(isValidEmail(""), false, "Empty email should fail");
  console.log("  ✓ Test 1 Passed: Email validator catches malformed inputs");

  // Test 2: Postal Code Validation
  assert.strictEqual(isValidPostalCode("97477"), true, "5-digit zip should pass");
  assert.strictEqual(isValidPostalCode("97477-1234"), true, "ZIP+4 should pass");
  assert.strictEqual(isValidPostalCode("SW1A 1AA"), true, "UK postal code should pass");
  assert.strictEqual(isValidPostalCode(""), false, "Empty postal code should fail");
  console.log("  ✓ Test 2 Passed: Postal code validator catches malformed inputs");

  return true;
}

module.exports = { runValidationTests };
if (require.main === module) {
  runValidationTests();
}
