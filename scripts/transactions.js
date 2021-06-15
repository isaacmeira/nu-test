const fs = require('fs-extra');
const path = require('path')
const jsonPath = path.join(__dirname, '../temp/operations.json');
const consoleOut = require('../helpers/consoleOut');
const violations = require('../constants/violations');
const interval = require('../helpers/interval')


async function makeTransaction(transaction) {
  
  let data = await fs.readJson(jsonPath);

  let isCreated = data.find( element => Object.keys(element).toString() === 'account');
  const account = isCreated ? Object.keys(isCreated)[0].toString() : null;

  if(account && isCreated.account['active-card']) {
    try {
      authorize(transaction.transaction.amount, isCreated.account['available-limit'] );
      isCreated.account['available-limit'] -= transaction.transaction.amount;
      data.shift();
      data.unshift(isCreated)
      data.push(transaction)
       await fs.writeFile(jsonPath, JSON.stringify(data), () => {
        interval(isCreated, transaction ) == true ? consoleOut(isCreated) : '';   
      })
      
    } catch (err) {
      isCreated.account.violations = [err.message]
      consoleOut(isCreated)
    }
  } else {
    if( !account ){
      isCreated = {"account" : {}}
      isCreated.violations = [violations.ACCOUNT_NOT_INITIALIZED];
    } else {
      isCreated.account.violations = [violations.CARD_NOT_ACTIVE];  
    }
   consoleOut(isCreated);
  }
}

 function authorize(amout, accountAmount) {
  if(amout > accountAmount) {
   throw new Error(violations.INSUFICIENT_LIMIT);
  }
}

module.exports = makeTransaction