const express = require('express');
const async = require('async');
const fs = require('fs');
const path = require('path');
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
        User.createAccount({username: user.username, password: user.password},
            (results) => {
                response.account = results;
                User.createWallet(results.insertId, (walletResults) => {
                    response.wallet = walletResults;
                    res.json(response);
                });
                
            },
            () => {
                let error = {
                    error: true,
                    message: 'Username already exists'
                }
                res.json(error);
            });
    } else {
        res.status(500);
        res.end();
    }
    
});

module.exports = router;