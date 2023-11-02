const express = require('express');
const session = require('express-session');
const router = express.Router();
const rutesInici = require('./inici');
const rutesConfig = require('./config');
const rutesBateria = require('./bateria');

// Principals rutes
router.use('/', rutesInici, function (req, res, next) {
    req.app.locals.layout = 'main_initial';
    next();
});
router.use('/config', isAuthenticated, rutesConfig, function (req, res, next) {
    req.app.locals.layout = 'main';
    next();
});
router.use('/bateria', isAuthenticated, rutesBateria, function (req, res, next) {
    req.app.locals.layout = 'main';
    next();
});

// middleware to test if authenticated
function isAuthenticated(request, res, next) {
    try {
        if (request.session.user) {
            next();
        } else {
            // res.status(400).send('Falta autenticació');
            res.redirect('/');
        }
    } catch (err) {
        next('route');
    }
}

router.use(session({
    secret: 'prosum',
    resave: false,
    saveUninitialized: false,
    cookie: {
        // Session expires. 60000=1min
        expires: 600000
    }
}))

router.post('/auth', function (request, response) {
    // Capture the input fields
    let username = request.body.username;
    let password = request.body.password;
    if (username && password) {
        request.session.regenerate(function (err) {
            if (err) next(err)
            if (username == 'admin' && password == 'admin1234') {
                request.session.user = username;

                // save the session before redirection
                request.session.save(function (err) {
                    if (err) return next(err)
                    try {
                        response.redirect('/config');
                    } catch (err) {
                        next('route');
                    }
                })
            } else {
                var message = true;
                // response.redirect(`/?message=${message}`);// + `${message}`);                
                response.render('inici', { message });
                // alert("USUARI O CONTRASENYA INCORRECTE");
            }
        })
    } else {
        response.send('Introdueix l`usuari i la contrasenya!');
        response.end();
    }
});

router.get('/', (req, res) => {
    res.render('inici');
});

//Logout
router.get('/logout', function (req, res, next) {
    req.app.locals.layout = 'main_initial';
    next();
}, function (req, res) {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;