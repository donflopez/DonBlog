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
var cGeneral = require('../controllers/cGeneral');


/*==================
	   Routes
==================*/

function route (app) {
	cGeneral.helperLayout(app);
	
	app.get('/', function(req, res){
		cGeneral.buildHome(req, res);
	});

	app.get('/aboutme', function(req, res){
		cGeneral.buildEditorPage(req, res);
	});

	app.get('/newpost', function(req, res){
		cGeneral.buildNewPost(req, res);
	});

	app.post('/newpost', function(req, res){
		cGeneral.saveNewPost(req, res);
	});

	app.get('/post/:id', function(req, res){
		cGeneral.viewPost(req, res);
	})

}

/*=================
	   Socket
=================*/

function rsocket (io) {

}


//Exports

exports.route = route;
exports.rsocket = rsocket;