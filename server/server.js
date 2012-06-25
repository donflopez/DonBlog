/******************
Server file.
This file init the server with all necesary.
Autor: Donflopez
Versión: 0.1
Modificado Por: Donflopez
Fecha de Creación: 9-05-2012
ToDo: Mmmmm...
Última modificación: Crearlo.
*******************/

//Añadimos nuestras principales armas para el desarrollo.
var express = require('../node_modules/express');
var io = require('../node_modules/socket.io');
var start = require('../controllers/onstart');

function init (routes, database) {
	//Iniciamos la base de datos.
	database.init();

	//Obtenemos la dirección base.
	var dir = __dirname + '/../public';

	var app = express.createServer(
	    express.bodyParser({uploadDir : dir + '/uploads'}) //Lugar al que subir los archivos subidos.
	  , express.compiler({ src: dir, enable: ['less'] })   //Compilador de less.
	  , express.static(__dirname + "/../public")		   //Carpeta pública
	  , express.cookieParser()							   //Cookies
	  , express.session({ secret: 'topsecret'})            //Palabra clave para la sesion.
	  , database.mongooseAuth.middleware()				   //Mongoose Middleware.
	);

	app.configure( function () {
  		app.set('views', __dirname + '/../views'); //Configuramos el server para que sepa donde están las vistas
  		app.set('view engine', 'jade'); // Y cómo las vamos a renderizar.
	});

	//Cargamos las rutas
	routes.route(app);

	//Metemos los helpers
	database.mongooseAuth.helpExpress(app);

	//Iniciamos el servidor
	app.listen(3000);
	var sio = io.listen(app);

	routes.rsocket(sio);

}

exports.init = init;