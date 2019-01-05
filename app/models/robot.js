const orm = require('./../config/orm');

function getUserRobotsStats(userId, callback) {
    let where = {user_id: userId};
    orm.selectFromWhere('vw_user_robot_stats', where, callback);
}

function getUserRobotConfiguration(userId, robotId, callback) {
    let where = {
        user_id: userId,
        robot_id: robotId
    };

    orm.selectFromWhere('vw_user_robot_configuration', where, callback);
}

function getRobotName(robotId, callback) {
    let where = {id: robotId};

    orm.selectFromWhere('robots', where, callback);
}

function newRoboto(userID, name, callback){

   let where= {user_id: userID, name: name}

    orm.insertObject('robots', where, callback)

    };


module.exports = {
    getRobotName: getRobotName,
    getUserRobotsStats: getUserRobotsStats,
    getUserRobotConfiguration: getUserRobotConfiguration,
    newRoboto: newRoboto
};