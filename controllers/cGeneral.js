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

	/*
		EDITOR
	*/

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

	/*
		POSTS
	*/

	, buildNewPost : function (req, res) {
		if(req.user.role==1){
			res.render('./admin/post/newpost');
		}
		else{
			res.render('./404');
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

	, searchPost : function (req, res) {
		post.search(req.body.search, function(posts){
			res.render('./normal/search', {posts:posts});
		});
	}

	, newComment : function (req, res) {
		if(req.user.role == 1){
			//Do this in the model...
			var data = {};
			data.id = req.params.id;
			data.user = req.user.id;
			data.body = req.body.body;
			post.newComment(data, function(post){
				res.render('./normal/post', {post:post});
			});
		}
		else {
			res.render('./404');
		}
	}

	/*
		ADMIN
	*/

	, admin : function (req, res) {
		if(req.user.role==1){
			site.dashboard(function(data){
				res.render('./admin/dashboard', {data:data, layout:'./admin/layout'});
			});
		}
		else{
			res.render('./404');
		}
	}
}