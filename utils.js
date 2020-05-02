const fs = require("fs");
const CsvReadableStream = require("csv-reader");
module.exports.endChallengeEvaluation = function (
  challengePassed,
  resultString
) {
  let passedString = "";
  if (challengePassed) {
    passedString = "COMPLETE";
  } else {
    passedString = "INCOMPLETE";
  }
  console.log(passedString);
  console.log(resultString);
  process.exit(0);
};

module.exports.getTwoCSVFiles = function (f1, f2) {
  return Promise.all([getCSVFile(f1), getCSVFile(f2)]);
};
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
