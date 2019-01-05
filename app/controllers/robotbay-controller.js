const express = require('express');
const async = require('async');
const fs = require('fs');
const path = require('path');
const Robot = require('./../models/robot');

const router = express.Router();

router.get('/:id', (req, res) => {
    let userId = req.params.id;
    console.log(userId);
    Robot.getUserRobotsStats(userId, (results) => {
        console.log(results);
        res.render('robots', {user_id: userId, robots: results});
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

        console.log(response);
        res.render('robotbay', response);
    });
    
    
});

//**for create new robot */

router.get('/createBot/:userid', function(req, res) {
    let userId = req.params.userid;
    let response = {user_id: userId};

        console.log(response)
        res.render('createBot', response);
});

//****POST****/
//**unncomment out below */

router.post('/createBot/:userid',(req, res) =>{
    let name= req.body.name;
    let userID = req.params.userid;
    let response = {user_id: userID, name: name};
    console.log(response)

    Robot.newRoboto(userID, name, (results)=>{
        console.log(results)
            res.end()
    })
})

module.exports = router;