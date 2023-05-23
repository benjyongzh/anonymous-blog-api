const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/user");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username: username });

        //check username
        if (!user) {
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
};
