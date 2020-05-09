const utils = require("../../utils.js");
const { execSync } = require("child_process");
const dircompare = require("dir-compare");

// delete the source directory

execSync(`rm -f ${__dirname}/dest-folder/*`);
execSync("./copy-files.sh");

const options = {
  compareSize: true,
  compareContent: true,
  includeFilter: "file*",
};
const res = dircompare.compareSync(
  `${__dirname}/source-folder`,
  `${__dirname}/dest-folder`,
  options
);

const wasPassed = res.same;

utils.endChallengeEvaluation(
  wasPassed,
  wasPassed ? "All files were the same" : "Not all files were the same"
);
