let sqlite3 = require('sqlite3').verbose();
let conn = new sqlite3.Database('server/controllers/comunitat.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to database.');
});

// Vista usuaris
exports.view = (req, res) => {
  let alert2 = false;
  // Sqlite connexió 
  conn.all('SELECT * FROM usuari', (err, rows) => {
    // Si no hi ha error 
    if (!err) {
      let alert = req.query.removed;
      calculaCoeficient(function getData(result) { 
        alert2 = result[1];       
        cT = result[0];         
        res.render('home', { rows, alert, alert2, cT });
      });
    } else {
      console.log(err);
    }
  });
}

// Buscar usuari
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  // Select Sqlite
  conn.all('SELECT * FROM usuari WHERE nom LIKE ? OR cognoms LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
      calculaCoeficient(function getData(result) { 
        alert2 = result[1];       
        cT = result[0];         
        res.render('home', { rows, alert2});
      });      
    } else {
      console.log(err);
    }
    console.log('Les dades de la búsqueda');
  });
}

// Carregar la pagina afegir usuari
exports.form = (req, res) => {
  calculaCoeficient(function getData(result) { 
    alert2 = result[1];       
    cT = result[0];         
    res.render('add-user', {alert2});
  }); 
}

// Afegir usuari
exports.create = (req, res) => {
  const { nom, cognoms, email, telefon, coeficient, estat, comentaris } = req.body;
  let searchTerm = req.body.search;
  if (coeficient > 1 || coeficient < 0 || coeficient == '') {
    //res.render('add-user', { alert2: 'Error. Indica un coeficient entre 0 i 1' });
  } else {
    // Insert Sqlite
    const data = new Date();
    const year = data.getFullYear() * 100000000;
    const month = (data.getMonth() + 1) * 1000000;
    const day = data.getDate() * 10000;
    const hour = data.getHours() * 100;
    const min = data.getMinutes();
    const data2 = year + month + day + hour + min + ''
    conn.all('INSERT INTO usuari(nom, cognoms, email, telefon, coeficient, estat, comentaris, dataAlta, dataActualitzacio) VALUES (?,?,?,?,?,?,?,?,?)', [nom, cognoms, email, telefon, coeficient, estat, comentaris, data2, data2], (err, rows) => {
      if (!err) {
        calculaCoeficient(function getData(result) { 
          alert2 = result[1];       
          cT = result[0];         
          res.render('add-user', {alert2, alert3: 'Usuari afegit correctament.' });
        }); 
        
      } else {
        console.log(err);
      }
      console.log('Editant l`usuari');
    });
  }
}

// Editar usuari
exports.edit = (req, res) => {
  // Select Sqlite
  conn.all('SELECT * FROM usuari WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      calculaCoeficient(function getData(result) { 
        alert2 = result[1];       
        cT = result[0];         
        res.render('edit-user', { rows, alert2});
      });      
    } else {
      console.log(err);
    }
    console.log('Les dades de l`usuari');
  });
}

// Actualitzar usuari
exports.update = (req, res) => {
  const { nom, cognoms, email, telefon, coeficient, estat, comentaris } = req.body;
  const data = new Date();
  const year = data.getFullYear() * 100000000;
  const month = (data.getMonth() + 1) * 1000000;
  const day = data.getDate() * 10000;
  const hour = data.getHours() * 100;
  const min = data.getMinutes();
  const data2 = year + month + day + hour + min + ''
  // Update Sqlite
  conn.all('UPDATE usuari SET nom = ?, cognoms = ?, email = ?, telefon = ?, coeficient = ?, estat = ?, comentaris = ?, dataActualitzacio = ? WHERE id = ?', [nom, cognoms, email, telefon, coeficient, estat, comentaris, data2, req.params.id], (err, rows) => {
    // Si no hi ha error        
    if (!err) {
      calculaCoeficient(function getData(result) { 
        alert2 = result[1];       
        cT = result[0];         
        res.render('edit-user', { rows, alert3: 'Usuari actualitzat correctament.', alert2});
      });   
      // location.href = "/";
    } else {
      console.log(err);
    }
    console.log('Actualitzant usuari');
  });
}

// Delete User
exports.delete = (req, res) => {

  // Delete a record

  // User the connection
  // connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {

  //   if(!err) {
  //     res.redirect('/');
  //   } else {
  //     console.log(err);
  //   }
  //   console.log('The data from user table: \n', rows);

  // });

  // Hide a record

  conn.all('UPDATE usuari SET estat = ? WHERE id = ?', ['Baixa', req.params.id], (err, rows) => {
    if (!err) {
      let removedUser = encodeURIComponent('Usuari donat de baixa.');
      calculaCoeficient(function getData(result) { 
        alert2 = result[1];       
        cT = result[0];         
        res.redirect('/?removed=' + removedUser);
      });   
      // res.redirect('/?removed=' + removedUser);
    } else {
      console.log(err);
    }
    console.log('L`usuari es dona de baixa');
  });

}

// Vista usuari
exports.viewall = (req, res) => {
  // Select Sqlite
  conn.all('SELECT * FROM usuari WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-user', { rows });
    } else {
      console.log(err);
    }
    console.log('Dades de l`usuari');
  });
}

//Funcio calcul coeficient
function calculaCoeficient(callback) {
  conn.all('SELECT * FROM usuari WHERE estat = "Actiu"', (err, rows) => {
    let result=[];
    cT = 0;
    // Calcul coeficient total
    rows.forEach(row => {
      cT = cT + row.coeficient;
    });
    cT = cT.toFixed(5);
    result[0]=cT;
    console.log(cT);
    if (cT > 1 || cT < 1) {
      result[1]= true;
    } else {
      result[1]= false;
    }         
    console.log(result); 
    callback(result);
  });

}