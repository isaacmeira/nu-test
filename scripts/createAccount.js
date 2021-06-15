const fs = require('fs-extra');
const path = require('path');
const jsonPath = path.join(__dirname, '../temp/operations.json');
const consoleOut = require('../helpers/consoleOut');
const violations = require('../constants/violations');

async function createAccount(operation) {

  let data = await fs.readJson(jsonPath);

  const isCreated = data.find( element => Object.keys(element).toString() === 'account');
  const formatedKey = isCreated ? Object.keys(isCreated)[0].toString() : null;

  if( validateAcc(formatedKey)) {
    isCreated.account.violations = [violations.ACCOUNT_ALREADY_INITIALIZED];
    consoleOut(isCreated);
  } else {
      operation.account.violations = [];
      data.unshift(operation);
      await fs.writeFile(jsonPath, JSON.stringify(data), () => {
      consoleOut(operation)
    })
  }
}

 function validateAcc(term) {
  return term === 'account' ? true : false;
}



module.exports = createAccount;