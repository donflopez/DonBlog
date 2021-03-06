var editor = require('../models/mEditor')
  , site = require('../models/mSite')
  , user = require('../models/mUser')
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
		if(req.user.role==1){
			post.newPost(req.body, function(id){
				res.redirect('/post/'+id);
			});
		}
		else {
			res.render('./404');
		}
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

	, category : function (req, res) {
		post.category(req.params.category, function(posts){
			var data = {};
			data.posts = posts;
			res.render('./normal/home', data);
		});
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

	, listUser : function (req, res) {
		user.list(function (users){
			res.render('./admin/users/users', {users:users, layout:'./admin/layout'});
		});
	}

	, searchUser : function (req, res) {
		user.search(req.body.search, function(users){
			res.render('./admin/users/users', {users:users, layout:'./admin/layout'});
		});
	}

	, listPost : function (req, res) {
		post.list(function (posts){
			res.render('./admin/post/posts', {posts:posts, layout:'./admin/layout'});
		});
	}

	, adminSearchPost : function (req, res) {
		post.adminSearch(req.body.search, function(posts){
			res.render('./normal/search', {posts:posts, layout:'./admin/layout'});
		});
	}

	, viewUser : function (req, res) {
		user.viewUser(req.params.id, function(user){
			res.render('./admin/users/user', {User:user, layout:'./admin/layout'});
		});
	}

	, deleteUser : function (req, res) {
		user.deleteUser(req.params.id, function(){
			res.redirect('/admin/users');
		});
	}
}