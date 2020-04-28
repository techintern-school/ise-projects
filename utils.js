
module.exports.endChallengeEvaluation = function (challengePassed, resultString) {
    let passedString = ""
    if (challengePassed) {
        passedString = "COMPLETE"
    } else {
        passedString = "INCOMPLETE"
    }
    console.log(passedString)
    console.log(resultString)
    process.exit(0)
}
