#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

async function loggify(filePath) {
  return new Promise((resolve, reject) => {
    const readInterface = readline.createInterface({
      input: fs.createReadStream(filePath),
      output: process.stdout,
      console: false
    });

    let fileContent = '';

    readInterface.on('line', function(line) {
      fileContent += line + '\nconsole.log(\'' + line + '\');\n';
    });

    readInterface.on('close', function() {
      fs.writeFileSync(filePath, fileContent, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  });
}

module.exports = loggify;
