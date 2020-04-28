const utils = require('../../utils.js');

const http = require('https')
const args = process.argv.slice(2);
const githubID = args[0];

const getOptions = {
    hostname: 'api.github.com',
    path: `/users/${githubID}/starred`,
    headers: { 'User-Agent': 'Mozilla/5.0' }


}

http.get(getOptions, function(res){
    var body = '';

    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(){
        const starredRepos = JSON.parse(body);
        const hasStarred = starredRepos.map(repo => repo.full_name).includes('techintern-school/learn-app');
        let result = hasStarred ? `confirmed repo starred by github user ${githubID}` : `github user ${githubID} has not starred the learn-app`;
        utils.endChallengeEvaluation(hasStarred, result)
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});