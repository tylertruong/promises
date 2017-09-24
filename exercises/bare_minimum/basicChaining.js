/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

const fs = require('fs');
const Promise = require('bluebird');
const cr = Promise.promisifyAll(require('./callbackReview'));
const pr = require('./promisification');


const fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return cr.pluckFirstLineFromFileAsync(readFilePath)
    .then((username) => {
      return pr.getGitHubProfileAsync(username);
    }).then((body) => {
      return fs.writeFileSync(writeFilePath, JSON.stringify(body));
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
