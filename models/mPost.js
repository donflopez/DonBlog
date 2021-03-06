var   db = require('../database/database')
	, mark = require('../node_modules/markdown').markdown;

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

//Private functions

function buildComment (count, comments, cb){
	if(comments[count]){
		db.User.findById(comments[count].user, function(err, user){
			comments[count].username = user.name.first + ' ' + user.name.last;
			count++
			buildComment(count, comments, cb);
		});
	}
	else{
		cb(comments);
	}
}

/////////
//Public Functions

module.exports = {
	  fiveLatestPost : function(cb) {
		db.Post.where('isDraft', false).desc('date').limit(5).run(function(err, posts){
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
				post.body = mark.toHTML(data.body);
				post.date = new Date();
				post.author = editor._id;
				post.tag.push(data.tag);
				post.lastEdited= null;
				post.category = data.category;
				post.views = 0;
				if(data.isDraft == true){
					post.isDraft = true;
				}
				else{
					post.isDraft = false;
				}
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
			if(post.comments){
				var count = 0;
				buildComment(count, post.comments, function(comments){
					post.comments = comments;
					cb(post);
				});
			}
		});
	}

	, search : function(word, cb) {
		db.Post.find({'title' : new RegExp(word, 'i'), 'isDraft': false}, function(err, posts){
			cb(posts);
		});
	}

	, adminSearch : function(word, cb) {
		db.Post.find({'title' : new RegExp(word, 'i')}, function(err, posts){
			cb(posts);
		});
	}

	, newComment : function (data, cb) {
		db.Post.findById(data.id, function(err, post){
			post.comments.push({  user:data.user
								, date:new Date()
								, body:data.body
								});
			post.save(function(err){
				if (err) console.log('Error: '+err);
			});
			db.User.findById(data.user, function(err, user){
				if(user.comments){
					user.comments++;
				}
				else{
					user.comments=1;
				}
			});
			var count = 0;
			buildComment(count, post.comments, function(comments){
				post.comments = comments;
				cb(post);
			});
		})
	}

	, list : function (cb) {
		db.Post.find({}, function(err, posts){
			cb(posts);
		});
	}

	, category : function (cat, cb) {
		db.Post.find({'category': cat, 'isDraft':false}, function(err, posts){
			cb(posts);
		});
	}
}