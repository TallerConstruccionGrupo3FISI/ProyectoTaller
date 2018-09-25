const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
var clientes = require("./models/cliente")();

passport.use(new localStrategy({
                  usernameField: 'email',
                  passwordField: 'password'
},
function( email, password, cb){
  clientes.findOne({ email: email}, function(err, cliente){
      if(err) { return cb(err); }
      if(!cliente){
        return cb(null, false, {message: 'Email incorrecto'});
      }
      if(!cliente.comparePassword(password)){
        return cb(null, false, {message: 'password incorrecto'});
      }
      return cb(null,cliente);
  });
}
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'your_jwt_secret'
    },
    function (jwtPayload, cb) {
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return clientes.findOneById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));
