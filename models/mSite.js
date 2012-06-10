var db = require('../database/database');

function initSite (){
	var site = new db.Site();
		site.name = 'DonBlog';
		site.copy = '© Donflopez 2012';
		site.nav.push({name:'Home', direction:'/'});
		site.nav.push({name:'Aboutme', direction:'/aboutme'});
		site.nav.push({name:'Contact', direction:'/contact'});
		site.save();
}

db.Site.findOne({}, function(err, site){
	console.log('Checking site: ');
	if(site){
		console.log('\t There is a site.');
	}
	else {
		initSite();
		console.log('\t Site created.');
	}
});

module.exports = {
	  data : function (cb) {
		db.Site.findOne({}, function(err, site){
			cb(site);
		});
	}

	/*
		ADMIN
	*/

	, dashboard : function (cb) {
		var data = {};
		db.User.find({}, function(err, users){
			db.Post.find({}, function(err, posts){
				data.users = users.length;
				data.posts = posts.length;
				cb(data);
			})
		});
	}
}