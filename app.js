const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
// const exphbs = require('express-handlebars');
const app = express();
// const findPort = require('./server/utils/findPort');
// const port = process.env.PORT;
// const apiRouter = require('./server/routes/routes');
const configController = require('./server/controllers/configController');
const runtime = require('./server/controladorBateria/runtimeBateria');

// Parsing middleware
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true })); // New

// Parse application/json
// app.use(bodyParser.json());
app.use(express.json());
app.use((cors()));
// app.use('/configuracio', createProxyMiddleware({ target: 'http://localhost:5032', changeOrigin: true }));


// Templating Engine
// const handlebars = exphbs.create({
//     extname: '.hbs', defaultLayout: 'main_initial.hbs', helpers: {
//         calculateValue: function (consumPercent, consumKw) {
//             return Math.round(consumPercent / 100 * consumKw);
//         }
//     }
// });
// app.engine('.hbs', handlebars.engine);
// app.set('view engine', '.hbs');
// app.use(apiRouter);

const run = new runtime(3);
run.start();

app.get('/bateria', async function (req, res) {
    console.log("trying");
    const dataToSend = await run.getResult();
    console.log(dataToSend);
    res.json(dataToSend);
});

app.get('/hola', async function (req, res) {
    // console.log("Hola");
    res.send("Hola");
});

app.get('/configuracio', async function (req, res, next) {
    const dataToSend = await configController.view();
    console.log(dataToSend);
    res.json(dataToSend);
    // res.send("Adeu");
});

// Static Files
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

const port = process.env.PORT || 5032;
app.listen(port, () => console.log(`Listening on port ${port}`));

