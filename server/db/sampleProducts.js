const db = require('../config/rawDatabase'); // Replace './dbConnection' with the correct path to the module
const fs = require('fs');
const path = require('path');

async function createSampleProducts() {
  try {
    // Get the current path and create the full path to sampleProducts.sql and sampleProductVariants.sql
    const currentPath = __dirname;
    const productsSqlFilePath = path.join(currentPath, 'sampleProducts.sql');
    const variantsSqlFilePath = path.join(currentPath, 'sampleProductVariants.sql');
    const productCategoryExtendedFilePath = path.join(currentPath, 'sampleProductCategoryExtended.sql');

    // Read SQL commands from the product and variant files
    const productsSqlCommands = fs.readFileSync(productsSqlFilePath, 'utf8');
    const variantsSqlCommands = fs.readFileSync(variantsSqlFilePath, 'utf8');
    const productCategoryExtendedSqlCommands = fs.readFileSync(productCategoryExtendedFilePath, 'utf8');

    // Run the SQL commands
    db.serialize(() => {
      db.exec(productsSqlCommands, (err) => {
        if (err) {
          console.error('Error executing product SQL commands:', err);
        } else {
          console.log('Product SQL commands executed successfully.');
        }
      });

      db.exec(variantsSqlCommands, (err) => {
        if (err) {
          console.error('Error executing variant SQL commands:', err);
        } else {
          console.log('Variant SQL commands executed successfully.');
        }
      });

      db.exec(productCategoryExtendedSqlCommands, (err) => {
        if (err) {
          console.error('Error executing variant SQL commands:', err);
        } else {
          console.log('Product Category Extended commands executed successfully.');
        }
      });
    });
  } catch (error) {
    console.error('Error creating sample products:', error);
  }
}

module.exports = createSampleProducts;
