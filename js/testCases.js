'use strict';

const retriveImportedFunctions = require("./searchPixels");
const testResults = {pass: 0, fail: 0};
const handleSearch = retriveImportedFunctions.searchImageForKnownInvaders;

const testCases = (description, condition) => {
  console.log(description);
  if (!condition) {
    testResults.fail += 1;
    console.log("FAIL");
  } else {
    testResults.pass += 1;
    console.log("PASS");
  }
  return condition;
}

const reportResults = () => {
  console.log("Number of passed tests=" + testResults.pass);
  console.log("Number of failed tests=" + testResults.fail);
  if (testResults.fail > 0) {
    throw "Tests failed";
  } else {
    console.log("Tests passed.");
  }
}

const checkForImageMatch = (expectedBool, receievedBool) => {
  const checkParity = ( expectedBool === receievedBool);

  if (!checkParity) {
    console.log("Expecting " + expectedBool + " but got " + receievedBool);
  }
  return checkParity;
}

[handleSearch].forEach(function(f) {
  testCases("Image is a match on one line", checkForImageMatch(true, f('weeeeeeee/reeeeeeee/iieeyyeeee/teeeeeeww', 'eeww')));
  testCases("Image is a match", checkForImageMatch(true, f('weeeeeeeerd/reeeeeeeeee/iieeyyeeeee/teeeeeeeeee', 'reeeeeeeee/teeeeeeeee')));
  testCases("Image is not a match on one line", checkForImageMatch(false, f('weeeeeeeerd/reeeeeeeeef/iieeyyeeeef/teeeeeeeeef', 'eww')));
  testCases("Image is not a match on multi line", checkForImageMatch(false, f('weeeeeeeerd/reeeeeeeeef/iieeyyeeeef/teeeeeeeeef', 'eww/que')));
  testCases("Image is a match on the outer edge", checkForImageMatch(true, f('wee/eee/eee/eee', 'eeeeeee/eeeeeee')));
});

reportResults();