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
			post.save();
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
		db.Post.where().limit(5).run(function(err, posts){
			cb(posts);
		});
	}
}