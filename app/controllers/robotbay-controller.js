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
        res.render('robots', {robots: results});
    });
});

router.get('/configuration/:userid/:robotid', (req, res) => {
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

        res.render('robotbay', response);
    });
    
});

router.get('/inventory/:userid', (req, res) => {
    let userId = req.params.userid;
    let robotId = req.query.robotId;
    let positionId = req.query.positionId;
    User.getUserInventory(userId, (results) => {
        results.map(e => {
            e['robot_id'] = robotId;
            e['position_id'] = positionId;
        });

        res.render('replace-part', {layout: false, available_parts: results});
    });
});

router.put('/robot/:robotid', (req, res) => {
    let robotId = req.params.robotid;
    let partId = req.body.partId;
    let positionId = req.body.positionId;
    console.log(robotId, partId, positionId);
    Robot.updateRobotPart(robotId, partId, positionId, (results) => {
        console.log(results);
        
    })
    res.end();
});

module.exports = router;