/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */

var pc = require('../bare_minimum/promiseConstructor');
var Promise = require('bluebird');
var fs = require('fs');

var combineFirstLineOfManyFiles = function(filePaths, writePath) {
  var promises = [];
  for (let i = 0; i < filePaths.length; i++) {
    promises.push(pc.pluckFirstLineFromFileAsync(filePaths[i]));
  }

  return Promise.all(promises)
    .then((lines) => {
      let file = '';
      for (let i = 0; i < lines.length; i++) {
        if (i === 0) {
          file = file + lines[i];
        } else {
          file = file + '\n' + lines[i];
        }
      }
      return file;
    })
    .then((file) => {
      fs.writeFileSync(writePath, file);
    });

};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};