const express = require('express');
const session = require('express-session');
const router = express.Router();
const configController = require('../controllers/configController');
const rutesBateria = require('./bateria');

// Principals rutes
router.use('/config', function (req, res, next) {   
    console.log("config");
    res.json(configController.view);
});
// router.use('/bateria', isAuthenticated, rutesBateria, function (req, res, next) {
//     req.app.locals.layout = 'main';
//     next();
// });

module.exports = router;