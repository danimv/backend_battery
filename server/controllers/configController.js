let sqlite3 = require('sqlite3').verbose(); //'server/controllers/comunitat.db';//
const fs = require('fs');
const { nextTick } = require('process');
const exportedD = require('../db/dbDriver');
const location = exportedD.dbLocation();
let conn = exportedD.dbConnection();

// Vista comunitat
exports.view = (req, res) => {
  return new Promise((resolve, reject) => {
    // checkFileExists(location, function check(error) {
      // if (!error) {
        console.log("inside1");
        // Sqlite connexió 
        // conn.all('SELECT curvaHores.*,bateriaConfig.consumKw, bateriaConfig.bateriaKw FROM curvaHores JOIN bateriaConfig ORDER BY curvaHores.idHora ASC', (err, rows) => {
        //   if (!err && rows[0]) {    
        //     console.log("inside2");        
        //     // console.log(data);
        //     resolve(rows[0]);
        //   } else {
        //     console.log(err);
        //   }
        // });
        resolve(getDateTime());
      // } else {
      //   console.log(err);
      // }
    // });
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

function getDateTime() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');
  return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
}

exports.checkFileExists = checkFileExists; 