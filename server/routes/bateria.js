const express = require('express');
const rutesComunitat = express.Router();
const bateriaController = require('../controllers/bateriaController');

// Routes
rutesComunitat.get('/', function (req, res, next) {
    req.app.locals.layout = 'main';
    next();
}, bateriaController.view);


module.exports = rutesComunitat;