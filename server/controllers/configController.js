let sqlite3 = require('sqlite3').verbose(); //'server/controllers/comunitat.db';//
const fs = require('fs');
const { nextTick } = require('process');
const exportedD = require('../db/dbDriver');
const location = exportedD.dbLocation();
let conn = exportedD.dbConnection();

// Vista comunitat
exports.view = (req, res) => {
  console.log("hello");
  checkFileExists(location, function check(error) {
    console.log("hello2");
    if (!error) {
      // Sqlite connexió 
      conn.all('SELECT * FROM curvaHores JOIN bateriaConfig ORDER BY curvaHores.id ASC', (err, rows) => {
        if (!err && rows[0]) {
          console.log(rows);
          return (rows);
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });
}

function checkFileExists(filepath, callback) {
  return new Promise((resolve, reject) => {
    fs.access(filepath, fs.constants.F_OK, error => {
      if (error) {
        console.log("File NO exists");
      }
      callback(error)
    });
  });
}

exports.checkFileExists = checkFileExists; 