#!/usr/bin/env node

const utils = require("../../utils.js");
const p1 = require("../p1.js");
var fs = require("fs");
var dir = "./tmp";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
const { execSync } = require("child_process");
// test the script using the brand and discount from challenge 1
// TODO: enumerate more test cases
// TODO: abstract out the logic to re-use in multiple test cases
execSync("python solution.py --brand nike --discount 20");
utils
  .getTwoCSVFiles(
    `${__dirname}/product_catalog_updated.csv`,
    `${__dirname}/../../_solutions/p1-c0.csv`
  )
  .then((values) => {
    const [studentAnswer, solution] = values;
    const priceLookup = p1.skuToCurrentPrice(solution);
    let challengeSolved = true;
    studentAnswer.forEach((product) => {
      if (
        priceLookup[product.sku] !== p1.cleanPriceString(product.current_price)
      ) {
        console.log(
          "undexpected price for sku",
          product.sku,
          "expected",
          priceLookup[product.sku],
          "and got",
          p1.cleanPriceString(product.current_price)
        );
        challengeSolved = false;
      }
    });
    const result = challengeSolved
      ? "csv matched expected result"
      : "csv did not match expected result. See mismatched sku's above";
    utils.endChallengeEvaluation(challengeSolved, result);
  });
