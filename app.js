const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const exphbs = require('express-handlebars');
const app = express();
const port = process.env.PORT || 5015;
const apiRouter = require('./server/routes/routes');
const configController = require('./server/controllers/configController');
const runtime = require('./server/controladorBateria/runtimeBateria');

// Parsing middleware
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true })); // New

// Parse application/json
// app.use(bodyParser.json());
app.use(express.json());
app.use((cors()));

// Static Files
app.use(express.static(__dirname + '/public'));

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

// const run = new runtime(1);
// run.start();

// app.use('/bateria', async function (req, res) {
//     res.json(run.getResult()); 
//     // res.send('batery')   
// });

app.get('/config', function (req, res, next) {   
    console.log("configggg");
    // configController.view;
    res.json(configController.view);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/public/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
