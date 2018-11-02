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

    app.get(            //user log out
        '/api/logout', (req, res) => {
            req.logout();
            res.send(req.user);
        });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });      

};
