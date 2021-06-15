const log = require('../helpers/consoleOut');
const violations = require('../constants/violations');

let time = 0;
let doubleTransactionTime = 0;
let operation = '';
let canWeOperate = true;
let transationsNumber = 0;


function interval(account, newOperation){

  transationsNumber += 1;

  account.account.violations = [];

  if(operation.toString() === newOperation.toString()) {
    transationsNumber -= 1;
    account.account.violations= [violations.DOUBLE_TRANSACTION]
    log(account);
    return operationInterval();
  } else {
    operation = newOperation;
    if(transationsNumber > 3 ) {
      account.account.violations= [violations.HIGH_FREQUENCY_INTERVAL]
      log(account);
  
      if(canWeOperate) {
        highFrenquencyInterval();
      }
    }
  }

  return canWeOperate;
 
}

function operationInterval(newOperation) {
  if (operation !== newOperation) {
    canWeOperate = true;
  } else {
    doubleTransactionTime = 0;
    canWeOperate = false;
    const operationIntervalTimer = setInterval(() => {
      doubleTransactionTime += 1; 
      if (doubleTransactionTime === 120) {
        clearInterval(operationIntervalTimer);
        canWeOperate = true;
      }
    }, 1000);
  }
}

function highFrenquencyInterval() {
  time = 0;
  canWeOperate = false;
  const validationInterval = setInterval(() => {
    time += 1; 
    if (time === 120) {
      clearInterval(validationInterval);
      canWeOperate = true;
      transationsNumber = 0;
    }
  }, 1000);
}

module.exports = interval