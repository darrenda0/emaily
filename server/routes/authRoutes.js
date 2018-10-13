const passport = require('passport');

module.exports = app => {
    //route handler
    app.get(
        '/auth/google', //google is referencing the GoogleStrategy
        passport.authenticate('google', {
            scope: ['profile', 'email']
    })
    ); 

    //2nd route handler to exchange the code for the user profile
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'));
};