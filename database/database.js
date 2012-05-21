var mongoose = require('../node_modules/mongoose'),
  Schema = mongoose.Schema,
  ObjectId = mongoose.SchemaTypes.ObjectId;

var UserSchema = new Schema({
}),
  User;

var CommentSchema = new Schema({
                        user: ObjectId
                      , date: Date
                      , body: String
                     })
                    , Comment;

var PostSchema = new Schema({
                      title: String
                    , body: String
                    , date: Date
                    , author: ObjectId
                    , tag: [String]
                    , lastEdited: Date
                    , comments: [Comment]
                    , category: String
                    }),
                      Post;

var LinkSchema = new Schema({
                      name: String
                    , direction: String
}),
  Link;

var SiteSchema = new Schema({
                        nav: [Link]
                      , copy: String
                     })
                    , Site;

var ConfigSchema = new Schema({
                         installed : Boolean
                       , name : String
                       })
                     , Config;

var ProyectSchema = new Schema({
                          name : String
                        , description : String
                        , link : String
                        , image : String
                        })
                      , Proyect;

var PageSchema = new Schema({
                      work : String
                    , proyects : [Proyect]
                    , bio : String
                    , twitter : String
                    , github : String
                    , linkedIn : String
                    })
                  , Page;

//EditorSchema

var EditorSchema = new Schema({
                        userId : ObjectId
                      , name : String
                      , avatar : String
                      , posts : Number
                      , description : String
                      , page : String
                      })
                     , Editor;


var mongooseAuth = require('../node_modules/mongoose-auth');

UserSchema.plugin(mongooseAuth, {
    everymodule: {
      everyauth: {
          User: function () {
            return User;
          }
      }
    }
  , password: {
        loginWith: 'email'
      , extraParams: {
           name: {
                first: String
              , last: String
            }
          , role: Number
          , active: { type: Boolean, default: false }
          , avatar: String
        }
      , everyauth: {
            getLoginPath: '/login'
          , postLoginPath: '/login'
          , loginView: 'normal/logreg.jade'
          , getRegisterPath: '/register'
          , postRegisterPath: '/register'
          , registerView: 'normal/logreg.jade'
          , loginSuccessRedirect: '/'
          , registerSuccessRedirect: '/'
          , authenticate: function (login, password){
              var promise,
                errors = [];
              if (!login) errors.push('Login erróneo.');
              if (!password) error.push('Contraseña errónea.');
              if (errors.length) return errors;

              promise = this.Promise();
              this.User()().authenticate(login, password, function (err, user) {
                  if (err) {
                    errors.push(err.message || err);
                    return promise.fulfill(errors);
                  }   
                  if (!user) {
                    errors.push('Ha fallado el login.');
                    return promise.fulfill(errors);
                  }

                  // The following block is the new code
                  if (!user.active) {
                    errors.push('Todavía no has activado tu cuenta.');
                    return promise.fulfill(errors);
                  }

                  promise.fulfill(user);
                });

                return promise;
            }
        }
    }
});


mongoose.model('User', UserSchema);
mongoose.model('Editor', EditorSchema);
mongoose.model('Page', PageSchema);
mongoose.model('Site', SiteSchema);
mongoose.model('Post', PostSchema);

  mongoose.connect('mongodb://localhost/mydatabase');
  User = mongoose.model('User');
  Editor = mongoose.model('Editor');
  Page = mongoose.model('Page');
  Site = mongoose.model('Site');
  Post = mongoose.model('Post');

function init () {
  mongoose.model('User', UserSchema);
  mongoose.model('Editor', EditorSchema);
  mongoose.model('Page', PageSchema);
  mongoose.model('Site', SiteSchema);
  mongoose.model('Post', PostSchema);

  mongoose.connect('mongodb://localhost/mydatabase');
  User = mongoose.model('User');
  Editor = mongoose.model('Editor');
  Page = mongoose.model('Page');
  Site = mongoose.model('Site');
  Post = mongoose.model('Post');

}

exports.User = User;
exports.Editor = Editor;
exports.Page = Page;
exports.Site = Site;
exports.Post = Post;

exports.mongooseAuth = mongooseAuth;

exports.init = init;