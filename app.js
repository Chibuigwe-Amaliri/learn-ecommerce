const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');

const port = 5000;

// Instantiate express app
const app = express();

// estabilish middleware functions
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res,next) => {
    res.send('Hello from Home page');
});

app.post('/add-product', (req, res,next) => {
    res.send('Hello from add-product');
})

app.use('/', (req, res,next) => {
    res.send('Hello from erro page');
})


app.listen(port, () => {
    console.log("App running port " + port)
})