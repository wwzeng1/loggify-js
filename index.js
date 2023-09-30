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
      try {
        fs.writeFileSync(filePath, fileContent);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
}

module.exports = loggify;
