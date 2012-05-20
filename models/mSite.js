var db = require('../database/database');

function initSite (){
	var site = new db.Site();
		site.copy = '© Donflopez 2012';
		site.nav.push({name:'Home', direction:'/'});
		site.nav.push({name:'Aboutme', direction:'/aboutme'});
		site.nav.push({name:'Contact', direction:'/contact'});
		site.save();
}

db.Site.findOne({}, function(err, site){
	console.log('Comprobando el sitio: ');
	if(site){
		console.log('\t Hay un sitio.');
	}
	else {
		initSite();
		console.log('\t Sitio creado.');
	}
});

module.exports = {
	
}