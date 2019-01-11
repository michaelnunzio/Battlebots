const express = require('express');
const async = require('async');
const fs = require('fs');
const path = require('path');
const User = require('../models/user');
const Store = require('../models/store');
const {ensureAuthenticated} = require("../config/auth");

const router = express.Router();

router.get('/:userid', ensureAuthenticated, (req, res) => {
    let userId = req.params.userid;
    let response = {user_id: userId};
    async.parallel({
        storeInventory: function(callback) {
            Store.getAvailableProducts(results => {
                results.map(e => {
                    e.user_id =  userId
                });
                response.available_parts = results;
                callback(null, results);
            });
        },
        userFunds: function(callback) {
            User.getUserFunds(userId, (results) => {
                response.user_wallet = results[0];

                callback(null, results);
            });
        }
    },
    (err, results) => {
        if(err) throw err;
        res.render('part-store', response);
    });

    
});

router.post('/:userid', ensureAuthenticated, (req, res) => {
    let userId = req.params.userid;
    let {part_id, cost, quantity} = req.body;
    let totalCost = parseFloat(cost) * parseInt(quantity) * -1;
    let response = {};

    async.series([
        function(callback) {
            User.updateWallet(userId, totalCost, (results) => {
                if(results.error) callback(results, 'one');
                else {
                    response.wallet = results;
                    callback(null, response);
                }
            });
        },
        function(callback) {
            User.checkInventoryForPart(userId, 
                part_id,
                //if part exists, update table
                results => {
                    let newQuantity = parseInt(results[0].quantity) + parseInt(quantity);
                    User.updateInventoryPartQuantity(userId, part_id, newQuantity, (updateResults) => {
                        response.inventory = updateResults;
                        callback(null, response);
                    });
                    
            },
                //if part does not exist insert into table
                results => {
                    User.addNewPartToInventory(userId, part_id, quantity, (insertResults) => {
                        response.inventory = insertResults;
                        callback(null, response);
                    });
            });
        }
    ], function(err, response) {
        if(err) res.send(err);
        else res.send(response);
    });
    

     
    
});

module.exports = router;