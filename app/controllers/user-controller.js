const express = require('express');
const async = require('async');
const User = require('../models/user');
const passport = require('passport');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('login', {});
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) =>{
        if (err) { return next(err); }
        console.log(info);
        if(info) {
            return res.send(info);
        }

        req.logIn(user, (loginError) => {
            if(loginError) {return next(loginError);}

            let redirect = {
                redirect: true,
                url: '/users/' + req.user.id
            };
            return res.send(redirect);
        });
    })(req, res, next);
});

router.post('/create-account', (req, res) => {
    let response = {};
        async.series([
            function(callback) {
                User.createAccount({username: user.username, password: user.password},
                    (results) => {
                        response.account = results;
                        callback(null, response);
                    },
                    () => {
                        let error = {
                            error: true,
                            message: 'Username already exists'
                        }
                        callback(error, response);
                    });
            },
            function(callback) {
                User.createWallet(response.account.insertId, (walletResults) => {
                    response.wallet = walletResults;
                    callback(null, response);
                });
            },
            function(callback) {
                User.createUserBattleResults(response.account.insertId, (scorecardResults) => {
                    response.scorecard = scorecardResults;
                    callback(null, response);
                });
            }
        ], function(err, response) {
            if(err) res.send(err);
            else res.send(response);
        });
});

module.exports = router;