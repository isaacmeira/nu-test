function consoleOut(msg) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  console.log(msg);
}

module.exports = consoleOut;