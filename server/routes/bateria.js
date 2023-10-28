const express = require('express');
const rutesComunitat = express.Router();
const bateriaController = require('../controllers/bateriaController');

// Routes
rutesComunitat.get('/', function (req, res, next) {
    req.app.locals.layout = 'main';
    next();
}, bateriaController.view);

rutesComunitat.get('/mode', function (req, res, next) {   
    next();
},bateriaController.mode);

rutesComunitat.get('/interrupcions', function (req, res, next) {
    req.app.locals.layout = 'main';
    next();
}, bateriaController.interrupcions);

rutesComunitat.get('/actualitzacions', function (req, res, next) {
    req.app.locals.layout = 'main';
    next();
}, bateriaController.actualitzacions);

module.exports = rutesComunitat;