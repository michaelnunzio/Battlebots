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
        res.render('robots', {robots: results});
    });
});

router.get('/:userid/:robotid', (req, res) => {
    let userId = req.params.userid;
    let robotId = req.params.robotid;
    console.log(userId, robotId);

    res.end();
});

module.exports = router;