#!/usr/bin/env node
const fs = require("fs");
const CsvReadableStream = require("csv-reader");
const utils = require("../../utils.js");

function getCSVFile(path) {
  return new Promise((resolve, reject) => {
    let inputStream = fs.createReadStream(path, "utf8");
    let rows = [];
    inputStream
      .pipe(
        new CsvReadableStream({
          parseNumbers: true,
          parseBooleans: true,
          trim: true,
          asObject: true,
        })
      )
      .on("data", function (row) {
        rows.push(row);
      })
      .on("error", function (err) {
        reject(err);
      })
      .on("end", function (data) {
        resolve(rows);
      });
  });
}

function skuToCurrentPrice(products) {
  return products.reduce((acc, product) => {
    acc[product.sku] = cleanPriceString(product.current_price);
    return acc;
  }, {});
}

function cleanPriceString(str) {
  return parseFloat(str.replace("$", ""));
}

Promise.all([
  getCSVFile("./product_catalog_updated.csv"),
  getCSVFile("../../_solutions/p1-c0.csv"),
]).then((values) => {
  const [studentAnswer, solution] = values;
  const priceLookup = skuToCurrentPrice(solution);
  let challengeSolved = true;
  studentAnswer.forEach((product) => {
    if (priceLookup[product.sku] !== cleanPriceString(product.current_price)) {
      console.log(
        "undexpected price for sku",
        product.sku,
        "expected",
        priceLookup[product.sku],
        "and got",
        cleanPriceString(product.current_price)
      );
      challengeSolved = false;
    }
  });
  const result = challengeSolved
    ? "csv matched expected result"
    : "csv did not match expected result. See mismatched sku's above";
  utils.endChallengeEvaluation(challengeSolved, result);
});
