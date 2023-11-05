let sqlite3 = require('sqlite3').verbose(); //'server/controllers/comunitat.db';//
const fs = require('fs');
const { nextTick } = require('process');
const exportedD = require('../db/dbDriver');
const location = exportedD.dbLocation();
let conn = exportedD.dbConnection();

// Vista comunitat
exports.view = (req, res) => {
  return new Promise((resolve, reject) => {
    checkFileExists(location, function check(error) {
      if (!error) {
        // Sqlite connexió 
        conn.all('SELECT curvaHores.*,bateriaConfig.consumKw, bateriaConfig.bateriaKw FROM curvaHores JOIN bateriaConfig ORDER BY curvaHores.idHora ASC', (err, rows) => {
          if (!err && rows[0]) {
            const data = { rows };
            // console.log(data);
            resolve(data);
          } else {
            console.log(err);
          }
        });
      } else {
        console.log(err);
      }
    });
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