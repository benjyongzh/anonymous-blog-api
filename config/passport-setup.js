const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/user");
require("dotenv").config();

/* module.exports = function (passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username: username });

        //check username
        if (!user) {
          console.log("no such username");
          return done(null, false, { message: "Incorrect username" });
        }

        //check password
        bcrypt.compare(password, user.password, (err, res) => {
          if (err) {
            console.log("error in bcrypt compare: " + err);
            return done(err);
          }
          if (res) {
            //password matches. log in
            return done(null, user);
          } else {
            //password no match
            console.log("password no match");
            return done(null, false, { message: "Incorrect password" });
          }
        });

        return;
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}; */

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });

      //check username
      if (!user) {
        console.log("no such username");
        return done(null, false, { message: "Incorrect username" });
      }

      //check password
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) {
          console.log("error in bcrypt compare: " + err);
          return done(err);
        }
        if (res) {
          //password matches. log in
          return done(null, user);
        } else {
          //password no match
          console.log("password no match");
          return done(null, false, { message: "Incorrect password" });
        }
      });

      return;
    } catch (err) {
      return done(err);
    }
  })
);

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
    },
    function (jwtPayload, cb) {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return UserModel.findOneById(jwtPayload.id)
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);
