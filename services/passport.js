require('dotenv').config();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/user.model');

passport.serializeUser((user, done) => {
    done(null, user.id || user.googleId)
})
passport.deserializeUser((googleId, done) => {
    User.findOne({googleId: googleId})
        .then(user => done(null, user))
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
    },  (accessToken, refreshToken, object0, profile, done) => {
        if(profile.id) {
            User.findOne({googleId: profile.id})
                .then((existingUser) => {
                    if(existingUser) done(null, existingUser)
                    else {
                        new User({
                            googleId: profile.id,
                            email: profile.emails[0].value,
                            avatar: profile.photos[0].value,
                            name: profile.name.givenName + ' ' + profile.name.familyName,
                            firstname: profile.name.givenName,
                            lastname: profile.name.familyName,
                        })
                        .save()
                        .then(user => done(null, user))
                    }
                })
        }
    })
)


