const express = require('express');
const async = require('async');
const fs = require('fs');
const path = require('path');
const Robot = require('./../models/robot');
const User = require('./../models/user');
const enemyBots= require('./../models/opponents') //delete later

const router = express.Router();

router.get('/:id', (req, res) => {
    let userId = req.params.id;
    let response = {user_id: userId};
    async.parallel({
        userScorecard: function(callback) {
            User.getUserBattleResults(userId, (results) => {
                response.battleResults = results[0];
                callback(null, response);
            })
        },
        robotStats: function(callback) {
            Robot.getUserRobotsStats(userId, (results) => {
                response.robots = results;
                callback(null, response);
            });
        }
    },
    (err, results) => {
        if(err) throw err;
        console.log(response);
        res.render('robots', response);
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

    let response = {};

    async.parallel({
        userInventory: function(callback) {
            User.getUserInventory(userId, (results) => {
                results.map(e => {
                    e['robot_id'] = robotId;
                    e['position_id'] = positionId;
                });
                response.available_parts = results;

                callback(null, results);
                
            });
        },
        partExists: function(callback) {
            Robot.checkRobotPart(robotId, positionId, (results) => {
                response.available_parts.forEach(e => {
                    results.length > 0 ? e.partExists = true : e.partExists = false;
                });
               
                callback(null, results);
            });
        }
    },
    (err, results) => {
        if(err) throw err;
        res.render('replace-part', {layout: false, response: response});
    });

});

router.put('/robot/:robotid', (req, res) => {
    let robotId = req.params.robotid;
    let partId = req.body.partId;
    let positionId = req.body.positionId;
    Robot.updateRobotPart(robotId, partId, positionId, (results) => {
        res.end();
    });
    
});

router.post('/robot/:robotid', (req, res) => {
    let robotId = req.params.robotid;
    let userId = req.body.userId;
    let partId = req.body.partId;
    let positionId = req.body.positionId;
    Robot.addRobotPart(userId, robotId, partId, positionId, (results) => {
        res.end();
    });
});

router.delete('/robot/:robotid', (req, res) => {
    let robotId = req.params.robotid;
    let positionId = req.body.position_id;

    console.log(robotId, positionId);
    Robot.removeRobotPart(robotId, positionId, (results) => {
        res.end();
    });
    
});

//**for create new robot */

router.get('/createBot/:userid', function(req, res) {
    let userId = req.params.userid;
    let response = {user_id: userId};

    res.render('createBot', response);
});

//****POST****/
//**unncomment out below */

router.post('/createBot/:userid',(req, res) =>{
    let name= req.body.name;
    let userID = req.params.userid;

    Robot.newRoboto(userID, name, (results)=>{
        res.end()
    })
})

//**get for battlebot arena**//

router.get('/arena/:userid/:robotid', (req, res) =>{
    let userId = req.params.userid;
    let robotId = req.params.robotid;
    let response = {user_id: userId, robot_id: robotId};

    
//**parallel** */
    async.parallel({
        userRobot: function(callback) {
            Robot.getUserSingleRobotStats(userId, robotId, results=>{
                response.userRobot = results[0];
                callback(null, response);
            })
        },
        robotStats: function(callback) {
            Robot.getUserRobotsStats(2, (results) => {
                response.enemyRobots = results;
                callback(null, response);
            });
        }
    },
    (err, results) => {
        if(err) throw err;
        console.log(response);
        res.render('arena', response);
    });
    //**parallel** */


});

router.post('/arena/:userid', (req, res) => {
    let userId = req.params.userid;
    console.log(userId);
    let victory = req.body.victory;
    let winnings = req.body.winnings;
    console.log(victory, winnings);
    let response = {};

    async.series([
        function(callback) {
            User.updateWallet(userId, winnings, (walletResults) => {
                if(walletResults.error) callback(walletResults, 'one');
                else {
                    response.wallet = walletResults;
                    callback(null, response);
                }
            });
        },
        function(callback) {
            User.updateBattleResults(userId, victory, (battleResults) => {
                response.battleResults = battleResults;
                callback(null, response);
            });
        }
    ], function(err, response) {
        if(err) res.send(err);
        else res.send(response);
    });

});

module.exports = router;