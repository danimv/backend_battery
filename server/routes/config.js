const express = require('express');
const rutesComunitat = express.Router();
const configController = require('../controllers/configController');

// Routes
rutesComunitat.get('/', function (req, res, next) {
    req.app.locals.layout = 'main';
    next();
}, configController.view);


module.exports = rutesComunitat;