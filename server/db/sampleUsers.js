const db = require('../config/rawDatabase'); // Replace './dbConnection' with the correct path to the module
const fs = require('fs');
const path = require('path');

async function createSampleUsers() {
  try {
    // Get the current path and create the full path to sampleUsers.sql
    const currentPath = __dirname;
    const sqlFilePath = path.join(currentPath, 'sampleUsers.sql');

    // Read SQL commands from the file
    const sqlCommands = fs.readFileSync(sqlFilePath, 'utf8');

    // Run the SQL commands
    db.serialize(() => {
      db.exec(sqlCommands, (err) => {
        if (err) {
          console.error('Error executing SQL commands:', err);
        } else {
          console.log('SQL commands executed successfully.');
        }
      });
    });
  } catch (error) {
    console.error('Error creating sample users:', error);
  }
}

module.exports = createSampleUsers;
