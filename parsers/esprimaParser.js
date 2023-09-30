const esprima = require('esprima');

function parseToCST(codeString) {
  return esprima.parseScript(codeString);
}

module.exports = parseToCST;
