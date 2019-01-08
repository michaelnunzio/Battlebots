const express = require('express');
const async = require('async');
const User = require('../models/user');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('login', {});
});

router.post('/users', (req, res) => {
    let user = req.body;

    if (user.action === 'login') {
        User.login({username: user.username, password: user.password},
            //redirect to robot bay
            (results) => {
                let redirect = {
                    redirect: true,
                    url: '/users/' + results[0].id
                }
                //res.setHeader("Content-Type", "text/html");
                res.send(redirect);
            },
            () => {
                let error = {
                    error: true,
                    message: 'Invalid username or password'
                }
                res.json(error);
            }
        );
    } else if (user.action === 'create-account') {
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
        
    } else {
        res.status(500);
        res.end();
    }
    
});

module.exports = router;