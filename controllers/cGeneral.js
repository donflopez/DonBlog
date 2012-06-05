var editor = require('../models/mEditor')
  , site = require('../models/mSite')
  , post = require('../models/mPost');

module.exports = {
	  helperLayout : function (app) {
		var help = {};
		site.data(function(site){
			help.site = site;
			app.helpers({
			   help : help
			});
		});
	}

	, buildHome : function (req, res) {
		post.fiveLatestPost(function(posts){
			var data = {};
			data.posts = posts;
			res.render('./normal/home', data);
		});
	}

	//This function return the editor page with all of
	//necesary data.
	, buildEditorPage : function (req, res) {
		editor.getEditor(function(aEditor){
			editor.getEditorPage(function(page){
				var data = {};
				data.editor = aEditor;
				data.page = page;
				res.render('./normal/page', data);
			});
		});
	}

	, buildNewPost : function (req, res) {
		if(req.user.role==1){
			res.render('./admin/post/newpost');
		}
		else{
			res.render('./404')
		}
	}

	, saveNewPost : function (req, res) {
		post.newPost(req.body, function(id){
			res.redirect('/post/'+id);
		});
	}

	, viewPost : function (req, res) {
		post.getPost(req.params.id, function(post){
			res.render('./normal/post', {post:post});
		});
	}
}