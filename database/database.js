var mongoose = require('../node_modules/mongoose'),
  Schema = mongoose.Schema,
  ObjectId = mongoose.SchemaTypes.ObjectId;

var UserSchema = new Schema({
}),
  User;

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
          , loginView: 'home.jade'
          , getRegisterPath: '/register'
          , postRegisterPath: '/register'
          , registerView: 'register.jade'
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

  mongoose.connect('mongodb://localhost/mydatabase');
  User = mongoose.model('User');

function init () {
  mongoose.model('User', UserSchema);

  mongoose.connect('mongodb://localhost/mydatabase');
  User = mongoose.model('User');
}

exports.User = User;

exports.mongooseAuth = mongooseAuth;

exports.init = init;