/******************
App file.
This file init the server.
Autor: Donflopez
Versión: 1
Modificado Por: Donflopez
Fecha de Creación: 9-05-2012
ToDo: Nothing
Última modificación: Crearlo.
*******************/

var server = require('./server/server');
var routes = require('./routes/route');
var database = require('./database/database');

server.init(routes, database);