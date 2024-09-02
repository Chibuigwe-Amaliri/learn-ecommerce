const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const session = require('express-session');

const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controller/error');

//const mongoConnect = require('./util/database').mongoConnect;

const User = require('./model/user');

const MONGODB_URI=   'mongodb+srv://amalirichibuigwe:123amaliri456@cluster0.ddoctyb.mongodb.net/exercise';

const app = express();
 
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
})

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret', 
    resave: false, 
    saveUninitialized: false,
    store: store
  })
);

/*app.use((req, res, next) => {
    User.findById('66cae69e8a39d9cca7f242d1')
     .then(user => {
       req.user = user;
       next();
     })
     .catch(err => console.log(err))
   
 });*/

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes)

app.use(errorController.getErrorPage);

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    User.findOne().then(user => {
        if(!user){
          const user = new User({
            name: 'Max',
            email: 'max@test.com',
            cart: {
              items: []
            }
          });
          user.save();
        }
    })

    app.listen(3000, () =>{
      console.log('App runing on port 3000')  
    })
        
   })
  .catch(err => {
    console.log(err);
  })
