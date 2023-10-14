const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/db.sqlite', err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Success');
    }
});

// Create a new table named "TestTable"
console.log("CREATING TABLE CREATING TABLE CREATING TABLE CREATING TABLE CREATING TABLE CREATING TABLE CREATING TABLE CREATING TABLE CREATING TABLE CREATING TABLE ")
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS TestTable (id INTEGER PRIMARY KEY, name TEXT)');
});

module.exports = db;
