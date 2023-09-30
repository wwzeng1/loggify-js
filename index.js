#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');
const process = require('process');
const escodegen = require('escodegen');
const parseToCST = require('./parsers/esprimaParser');

async function loggify(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', function(err, data) {
      if (err) {
        reject(err);
      } else {
        const cst = parseToCST(data);
        traverseAndLog(cst);
        const modifiedCode = escodegen.generate(cst);
        fs.writeFile(filePath, modifiedCode, function(err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    });
  });
}

function traverseAndLog(node) {
  for (let key in node) {
    if (node[key] && typeof node[key] === 'object') {
      if (node[key].type === 'ExpressionStatement') {
        const logStatement = {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'Identifier',
                name: 'console'
              },
              property: {
                type: 'Identifier',
                name: 'log'
              }
            },
            arguments: [
              {
                type: 'Literal',
                value: 'Statement executed'
              }
            ]
          }
        };
        node.body.splice(node.body.indexOf(node[key]) + 1, 0, logStatement);
      }
      traverseAndLog(node[key]);
    }
  }
}

// Get the file argument from the command line
const fileArg = process.argv[2];

// If a file argument has been provided, pass it to the loggify function
if (fileArg) {
  loggify(fileArg);
}

module.exports = loggify;
