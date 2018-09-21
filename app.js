const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
//mongoose.connect("mongodb://localhost:27017/harold", { useNewUrlParser: true });

const app = express();


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
