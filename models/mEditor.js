var db = require('../database/database');

function initEditor (){
	var editor = new db.Editor();
  		editor.userId = null;
  		editor.name = 'Editor';
  		editor.avatar = '/img/avatar/undefined.png';
  		editor.posts = 0;
  		editor.description = 'Description of the author.';
  		editor.page = '/aboutme';
  		editor.save();
}

db.Editor.findOne({}, function(err, editor){
	console.log('Comprobando el editor: ');
	if(editor){
		console.log('\t Hay un editor.');
	}
	else {
		initEditor();
		console.log('\t Editor por defecto creado.');
	}
});

module.exports = {
    getEditor : function (cb) {
		db.Editor.findOne({}, function(err, editor){
			cb(editor);
		});
	}
  , newEditor : function (data, cb){
  		var editor = new db.Editor();
  		editor.userId = data.userId;
  		editor.name = data.name;
  		editor.avatar = data.avatar;
  		editor.posts = 0;
  		editor.description = data.description;
  		editor.page = '/aboutme';
  		editor.save();
  		cb();
  	}
  , editEditor : function (data, cb){
  		db.Editor.findOne({}, function(err, editor){
	  		editor.name = data.name;
	  		editor.avatar = data.avatar;
	  		editor.description = data.description;
	  		editor.save();
	  		cb();
  		});
  }
}