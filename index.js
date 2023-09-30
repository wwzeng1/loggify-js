#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');
const process = require('process');

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

// Get the file argument from the command line
const fileArg = process.argv[2];

// If a file argument has been provided, pass it to the loggify function
if (fileArg) {
  loggify(fileArg);
}

module.exports = loggify;
