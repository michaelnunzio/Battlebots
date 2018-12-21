const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const userController = require('./app/controllers/user-controller');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("app/public"));

app.engine("handlebars", handlebars({ 
    defaultLayout: "main",
    layoutsDir: path.join('app/views/layouts')
}));

app.set("view engine", "handlebars");
app.set('views', path.join(__dirname, 'app', 'views'));

app.use('/', userController);

app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:' + PORT);
});