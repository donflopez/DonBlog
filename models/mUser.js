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
}