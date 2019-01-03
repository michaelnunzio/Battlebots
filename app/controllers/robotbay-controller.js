const express = require('express');
const async = require('async');
const fs = require('fs');
const path = require('path');
const Robot = require('./../models/robot');
const User = require('./../models/user');

const router = express.Router();

router.get('/:id', (req, res) => {
    let userId = req.params.id;
    console.log(userId);
    Robot.getUserRobotsStats(userId, (results) => {
        console.log(results);
        res.render('robots', {robots: results});
    });
});

router.get('/:userid/:robotid', (req, res) => {
    let userId = req.params.userid;
    let robotId = req.params.robotid;

    let response = {user_id: userId};

    async.parallel({
        robotName: function(callback) {
            Robot.getRobotName(robotId, (results) => {
                response.robot_name = results[0].name;
                callback(null, results);
            });
        },
        configuration: function(callback) {
            Robot.getUserRobotConfiguration(userId, robotId, (results) => {
                response.robot_parts = results;
                callback(null, results);
            });
        }
    }, 
    (err, results) => {
        if(err) throw err;

        console.log(response);
        res.render('robotbay', response);
    });
    
});

router.get('/inventory/:userid', (req, res) => {
    let userId = req.params.userid;

    User.getUserInventory(userId, (results) => {
        console.log(results);
        res.end();
    });
});

module.exports = router;