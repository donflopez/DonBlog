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
	
	app.get('/', function(req, res, next){
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
	});

	app.post('/newcomment/:id', function(req, res){
		cGeneral.newComment(req, res);
	});

	app.post('/search/post', function(req, res){
		cGeneral.searchPost(req, res);
	});

	app.get('/category/:category', function(req, res){
		cGeneral.category(req, res);
	});

	/*^^^^^^^^^^^
		ADMIN
	^^^^^^^^^^^*/

	app.get('/admin', function(req, res){
		cGeneral.admin(req, res);
	});

	app.get('/admin/users', function(req, res){
		cGeneral.listUser(req, res);
	});

	app.post('/admin/search/user', function(req, res){
		cGeneral.searchUser(req, res);
	});

	app.get('/admin/posts', function(req, res){
		cGeneral.listPost(req, res);
	})

	app.post('/admin/search/post', function(req, res){
		cGeneral.adminSearchPost(req, res);
	});

	app.get('/admin/user/:id', function(req, res){
		cGeneral.viewUser(req, res);
	});

	app.get('/admin/user/del/:id', function(req, res){
		cGeneral.deleteUser(req, res);
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