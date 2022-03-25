const  passport = require('passport')
const  { Strategy, LocalStrategy } = require('passport-local')

const  Protectora = require ("../models/Protectora")

passport.use(
  new Strategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      // Match Email's User
      const user = await Protectora.findOne({ email: email });

      if (!user) {
        return done(null, false, { message: "Not User found." });
      } else {
        // Match Password's User
        const match = await user.matchPassword(password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect Password." });
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Protectora.findById(id, (err, user) => {
    done(err, user);
  });
});
