var db = require('../database/database');

function examplePost (){
	db.Editor.findOne({}, function(err, editor){
		var post = new db.Post();
			post.title = 'Example Post';
			post.body = 'This is an example post, when you install this app this is automatically created.';
			post.date = new Date();
			post.author = editor._id;
			post.tag.push('example');
			post.lastEdited= null;
			post.category = 'Example';
			post.views = 0;
			post.isDraft = false;
			post.save();
			editor.post++;
			editor.save();
	});
}

db.Post.findOne({}, function(err, post){
	console.log('Find any post: ');
	if(post){
		console.log('\t There is a post.');
	}
	else {
		examplePost();
		console.log('\t Example post created.');
	}
});

module.exports = {
	  fiveLatestPost : function(cb) {
		db.Post.where('isDraft', false).limit(5).run(function(err, posts){
			cb(posts);
		});
	}

	, fiveMostViews : function(cb) {
		db.Post.where('views').desc().limit(5).run(function(err, posts){
			cb(posts);
		});
	}

	, newPost : function(data, cb) {
		db.Editor.findOne({}, function(err, editor){
			var post = new db.Post();
				post.title = data.title;
				post.body = data.body;
				post.date = new Date();
				post.author = editor._id;
				post.tag.push(data.tag);
				post.lastEdited= null;
				post.category = data.category;
				post.views = 0;
				post.isDraft = data.isDraft;
				post.save();
				editor.post++;
				editor.save();
				cb(post._id);
		});
	}

	, getPost : function(id, cb) {
		db.Post.findById(id, function(err, post){
			post.views++;
			post.save();
			cb(post);
		});
	}
}