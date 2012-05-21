var db = require('../database/database');

//ToDo: Add support for 2 or more editors and pages.


function initEditor (){
	var editor = new db.Editor();
  		editor.userId = null;
  		editor.name = 'Editor';
  		editor.avatar = '/img/avatar/undefined.png';
  		editor.posts = 0;
  		editor.description = 'Description of the author.';
  		editor.page = '/aboutme/';
  		editor.save();
}

function initEditorPage (){
  var page = new db.Page();
      page.work = 'Explain your work, your professional life.';
      page.bio = 'Say your bio';
      page.twitter = '@donflopez';
      page.github = 'https://github.com/donflopez';
      page.linkedIn = 'http://www.linkedin.com/profile/view?id=48616371&trk=tab_pro';
      page.save();
}

db.Editor.findOne({}, function(err, editor){
	console.log('Checking editor: ');
	if(editor){
		console.log('\t There is a editor.');
	}
	else {
		initEditor();
		console.log('\t Default editor created.');
	}
});

db.Page.findOne({}, function(err, page){
  console.log('Checking aboutme of editor:');
  if(page){
    console.log('\t There is a page.');
  }
  else{
    initEditorPage();
    console.log('\t Editor page created.');
  }
});

module.exports = {
    getEditor : function (cb) {
		db.Editor.findOne({}, function(err, editor){
			cb(editor);
		});
	}
  , getEditorPage : function (cb) {
      db.Page.findOne({}, function(err, page){
        cb(page);
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
	  		cb(editor);
  		});
  }
  , editEditorPage : function (data, cb){
      db.Page.findOne({}, function(err, page){
        page.work = data.work;
        page.bio = data.bio;
        page.twitter = data.twitter;
        page.github = data.github;
        page.linkedIn = data.linkedIn;
        page.save();
        cb(page);
      })
  }
}