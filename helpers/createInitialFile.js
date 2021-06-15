const fs = require('fs-extra');
const path = require('path');
const jsonPath = path.join(__dirname, '../temp/operations.json');

async function createBlankFile() {
  await fs.writeFile(jsonPath, '[]', () => {
    return true;
  })
}

module.exports = createBlankFile