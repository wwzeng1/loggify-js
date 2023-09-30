const fs = require('fs');
const loggify = require('../index.js');

describe('loggify function', () => {
  it('adds console.log statements after each statement in a JavaScript file', async () => {
    const mockFilePath = './mock.js';
    fs.writeFileSync(mockFilePath, 'let a = 1;\nlet b = 2;\nif(a < b) { a = b; }\nfor(let i = 0; i < 2; i++) { b = b + i; }\n');
  
    await loggify(mockFilePath);
  
    const expectedOutput = 'let a = 1;\nconsole.log(\'Statement executed\');\nlet b = 2;\nconsole.log(\'Statement executed\');\nif(a < b) { a = b; }\nconsole.log(\'Statement executed\');\nfor(let i = 0; i < 2; i++) { b = b + i; }\nconsole.log(\'Statement executed\');\n';
    const actualOutput = fs.readFileSync(mockFilePath, 'utf8');
    
    expect(actualOutput).toEqual(expectedOutput);
    
    fs.unlinkSync(mockFilePath);
  });
});
