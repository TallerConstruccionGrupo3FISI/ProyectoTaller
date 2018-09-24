//creando la db
var db= connect('localhost:27017/veterinaria');

//creando tabla
db.clientes.insert({
	'nombres':'harold alexis',
	'apellidos':'de la cruz vilchez',
	'username':'harold',
	'email':'harold1a96@gmail.com',
	'password':'fisi',
	'dni': '75699485',
	'telefono': 99485662,
	'direccion': "huaychullo 128",
	'administrador': false,
	'operario': false
});

db.clientes.insert({
	'nombres':'Olivia newton',
	'apellidos':'fhysical jhones',
	'username':'harold',
	'email':'harold1a96@gmail.com',
	'password':'fisi',
	'dni': '75699486',
	'telefono': 99485662,
	'direccion': "huaychullo 128",
	'administrador': false,
	'operario': false
});

db.clientes.insert({
	'nombres':'sasuke',
	'apellidos':'uchiha',
	'username':'harold',
	'email':'sasuke@gmail.com',
	'password':'fisi',
	'dni': '75699487',
	'telefono': 99485662,
	'direccion': "huaychullo 128",
	'administrador': false,
	'operario': false
});
//creando tabla citas
db.citas.insert({
	'dni':75699485,
	'fecha': Date(),
	'Descripcion': 'consulta',
});
//creando tabla secretaria
db.secretarias.insert({
	'dni':  75699487,
	'horario': 'mañana'
})
//creando tabla medico
db.operarios.insert({
	'dni':  75699487,
	'horario': 'mañana'
})


//creando tabla perros
db.mascota.insert({
	'dni':75699486,
	'nombre': 'firulais',
	'raza':'pitbul',
	'edad': 8,
	'enfermedad': ''
});
db.mascota.insert({
	'dni':75699485,
	'nombre': 'doki',
	'raza':'pitbul',
	'edad': 8,
	'enfermedad': 'rabia'
});
db.mascota.insert({
	'dni':75699481,
	'nombre': 'doki',
	'raza':'pitbul',
	'edad': 8,
	'enfermedad': 'rabia'
});
db.mascota.insert({
	'dni':75699482,
	'nombre': 'doki',
	'raza':'pitbul',
	'edad': 8,
	'enfermedad': 'rabia'
});

db.mascota.insert({
	'dni':75699482,
	'nombre': 'doki',
	'raza':'pitbul',
	'edad': 8,
	'enfermedad': ['rabia','anemia' ]
});


db.mascota.insert({
	'dni':75699482,
	'nombre': 'doki',
	'raza':'pitbul',
	'edad': 8,
	'enfermedad': ['rabia','gripe' ]
});
