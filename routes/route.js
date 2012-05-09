/******************
Routes file.
This file have the route logic.
Autor: Donflopez
Versión: 0.1
Modificado Por: Donflopez
Fecha de Creación: 9-05-2012
ToDo: Mmmmm...
Última modificación: Crearlo.
*******************/

//Import controllers



/*==================
	   Routes
==================*/

function route (app) {
	
	app.get('/', function(req, res){
		res.send('Hello world');
	});

}

/*=================
	   Socket
=================*/

function rsocket (io) {

}


//Exports

exports.route = route;
exports.rsocket = rsocket;