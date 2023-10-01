const fs = require('fs');
const path = require('path');

const modelsPath = path.join(__dirname, '../models');

fs.readdirSync(modelsPath).forEach((file) => {
  if (file.endsWith('.js')) {
    console.log(file);
    require(path.join(modelsPath, file));
  }
});