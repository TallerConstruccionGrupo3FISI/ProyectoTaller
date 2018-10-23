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
const keys = require('./config/keys.js');

const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const stripe = require('stripe')(keys.stripeSecretKey);



require("./passport");
//mongoose.connect("mongodb://localhost:27017/harold", { useNewUrlParser: true });
const app = express();
mongoose.set('useFindAndModify', false);

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
app.use(cookieParser());

app.use(session({
secret: 'botnyuserdetails', // session secret
resave: true,
saveUninitialized: true
}));

app.use(function(req, res, next) {
  if(req.session.user)
  res.locals.user = req.session.user;
  next();
});

/*
//pasport middlewares
app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());
*/
//settings

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname +'/view/');
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

//verificando los tokens de los get y post
/*
app.use(function(req, res, next) {
  console.log(req.headers);
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
*/
//variables rutas
const pagos = require('./routes/pagos');
const indexRoutes = require('./routes/index');
const apiClientes = require('./routes/clientes');
const apiMascotas = require('./routes/mascotas');
const apiHorarios = require('./routes/horarios');
const apiMedicos = require('./routes/medico');
const apiSecretaria = require("./routes/secretaria");
const apiHistorialClinico = require("./routes/historialClinico");
const apiBanoCorte = require("./routes/banoCorte");
const apiCita = require("./routes/cita");
const apiConsulta = require("./routes/consulta");


const auth = require('./routes/auth');

//routes
app.use('/',indexRoutes);
//app.use('/clientes',passport.authenticate('jwt', {session: false}),apiClientes);
app.use('/pagos',pagos);
app.use('/clientes',apiClientes);
app.use('/mascotas',apiMascotas);
app.use('/horarios',apiHorarios);
app.use('/medicos',apiMedicos);
app.use('/secretaria',apiSecretaria);
app.use('/historialClinico',apiHistorialClinico);
app.use('/banoCorte',apiBanoCorte);
app.use('/cita',apiCita);
app.use('/consulta',apiConsulta);
app.use('/auth', auth);

app.listen(app.get('port'), ()=>{
  console.log("Servidor corriendo en http://localhost:" + app.get('port') + "\n presionar ctrl+c para terminar");
});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
