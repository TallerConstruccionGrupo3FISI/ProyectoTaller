const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const jsonwebtoken = require("jsonwebtoken");
const db = require('./libs/db-connection.js')();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./config/config.js');



//mongoose.connect("mongodb://localhost:27017/harold", { useNewUrlParser: true });
const app = express();

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}


//middlewares
app.use(cors());
app.use(logger('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());


//settings
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname +'/view/');
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));


//verificando los tokens de los get y post
app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});


//variables rutas
const indexRoutes = require('./routes/index');
const apiClientes = require('./routes/clientes');
const apiMascotas = require('./routes/mascotas');

//routes
app.use('/',indexRoutes);
app.use('/clientes',apiClientes);
app.use('/mascotas',apiMascotas);

app.listen(app.get('port'), ()=>{
  console.log("Servidor corriendo en http://localhost:" + app.get('port') + "\n presionar ctrl+c para terminar");
});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
