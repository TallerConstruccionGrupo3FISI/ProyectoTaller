const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
//mongoose.connect("mongodb://localhost:27017/harold", { useNewUrlParser: true });
//variables rutas
const indexRoutes = require('./routes/index');
const indexFormulario = require('./routes/formularioCliente');

const app = express();

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname +'/view/');
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));

//middlewares
app.use(cors());
app.use(logger('dev'));
app.use(express.json());

//app.use(bodyParser.urlencoded({extended: false}));

//routes
app.use('/',indexRoutes);
app.use('/clientes',indexFormulario);

app.listen(app.get('port'), ()=>{
  console.log("Servidor corriendo en http://localhost:" + app.get('port') + "\n presionar ctrl+c para terminar");
});
