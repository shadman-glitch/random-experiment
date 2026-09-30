/**
 * Automated QA Test Runner
 * Orchestrated by Agent 7 (QA & Automation Test Engineer)
 * Sign-off reviewed by The Flaw Hunter
 */

const { runCartTests } = require('./cart.test.js');
const { runValidationTests } = require('./validation.test.js');

console.log("=======================================================================");
console.log("             AURA AUTOMATED TEST SUITE EXECUTION                       ");
console.log("=======================================================================\n");

try {
  runCartTests();
  console.log("");
  runValidationTests();
  console.log("\n=======================================================================");
  console.log("       ALL AUTOMATED QA TESTS PASSED WITH 100% SUCCESS                 ");
  console.log("=======================================================================");
  process.exit(0);
} catch (error) {
  console.error("\n❌ TEST SUITE FAILURE:", error.message);
  process.exit(1);
}
