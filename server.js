const express = require('express');
const handlebars = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const path = require('path');

const userController = require('./app/controllers/user-controller');
const robotBayController = require('./app/controllers/robotbay-controller');
const storeController = require('./app/controllers/store-controller');

const app = express();
const PORT = process.env.PORT || 8080;

require('./app/config/passport')(passport);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("app/public"));

app.engine("handlebars", handlebars({ 
    defaultLayout: "main",
    layoutsDir: path.join('app/views/layouts'),
    partialsDir: path.join('app/views/partials')
}));

app.set("view engine", "handlebars");
app.set('views', path.join(__dirname, 'app', 'views'));

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', userController);
app.use('/users', robotBayController);
app.use('/store', storeController);

//** works when it's here */ 

// app.get('/createBot', function(req, res) {
//     res.render('createBot');
// });
//****** */

app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:' + PORT);
});