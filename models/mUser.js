var db = require('../database/database');

module.exports = {
	  list : function (cb) {
		db.User.find({}, function(err, users){
			if(err){
				console.log(err);
			}
			else {
				cb(users);
			}
		});
	}

	, search : function (name, cb){
		db.User.find({'name.first' : new RegExp(name, 'i')}, function(err, users){
			cb(users);
		});
	}
}