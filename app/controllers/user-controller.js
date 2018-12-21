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
            (results) => res.json(results),
            () => {
            let error = {
                error: true,
                message: 'Invalid username or password'
            }
            res.json(error);
        });
    } else {
        User.createAccount({username: user.username, password: user.password},
            (results) => res.json(results),
            () => {
                let error = {
                    error: true,
                    message: 'Username already exists'
                }
                res.json(error);
            });
    }
    
});

module.exports = router;