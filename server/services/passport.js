const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');   //'User' is the Model Class

//Take the user, which was created in the db and provide a token (cookie)
passport.serializeUser((user, done) => {    
    done(null, user.id);                //user.id is the mongo Id stored in the db. This is diff than the googleId
});

passport.deserializeUser((id, done) => {    //takes the cookie and converts it back to a user model
    User.findById(id)
        .then(user => {
            done(null, user);
    });
});

//make passport aware that a new strategy is being used
//create new instance of the GoogleStrategy for authenticating users
passport.use
    (new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        }, 
        (accessToken, refreshToken, profile, done) => {
            //console.log('access token', accessToken);
            //console.log('refresh token', refreshToken);
            //console.log('profile', profile);

            User.findOne({ googleId: profile.id })  //searching
                .then((existingUser) => {  //profile.id is the googleId from OAuth
                    if (existingUser) {
                        //we already have a record with a given profile ID
                        done(null, existingUser);
                    } else {
                        //we don't have a user record wiht this ID, make a new record
                        new User({ googleId: profile.id })
                            .save()    //creates a unique user (mongoose model instance) and saves it to the db
                            .then(user => done(null, user));
                }
            });
        }
    )
);