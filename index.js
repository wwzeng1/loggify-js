#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

function loggify(filePath) {
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
    fs.writeFileSync(filePath, fileContent);
  });
}

module.exports = loggify;
