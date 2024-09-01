const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');

const port = 5000;

// Instantiate express app
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// estabilish middleware functions
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRouter.router);
app.use(shopRouter);

app.use('/', (req, res,next) => {
    res.status(404).render('404');
})


app.listen(port, () => {
    console.log("App running port " + port)
})