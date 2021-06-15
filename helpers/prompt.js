const createAccount = require('../scripts/createAccount');
const makeTransaction = require('../scripts/transactions');
const consoleOut = require('./consoleOut');
const prompt = require('prompt');
const removeTemp = require('../helpers/createInitialFile');

 function startPrompt() {
  prompt.start();

  prompt.get(['operation'], function (err, result) {
    try {

      if(result.operation === 'exit') {
        removeTemp();
        return process.exit(1)
      }

      const resultData = result.operation.match(/"(.*?)"/gm)[0].replace(/"/g, '');
      const functionParam = JSON.parse(result.operation);
      resultData === 'account' ? createAccount(functionParam) : makeTransaction(functionParam);

    } catch (err) {
      consoleOut('This operation does not exists, to exit type exit');
      return startPrompt();
    }

    return startPrompt()

  });
}


module.exports = startPrompt;
