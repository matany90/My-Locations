
const passport = require('passport');
const keys = require('../config/keys');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }))

    app.get('/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            //res.send('test')
           res.redirect('/categories');
        }
    );

    app.get('/auth/facebook', passport.authenticate('facebook'))

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook'),
        (req, res) => {
            //res.send('test')
           res.redirect('/categories');
        }
    );

    app.get('/auth/github', passport.authenticate('github'))

    app.get('/auth/github/callback',
        passport.authenticate('github'),
        (req, res) => {
            //res.send('test')
           res.redirect('/categories');
        }
    );

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    })

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    })
}