const orm = require('./../config/orm');

function getUserRobotsStats(userId, callback) {
    let where = {user_id: userId};
    orm.selectFromWhere('vw_user_robot_stats', where, callback);
}
//** */

function getUserSingleRobotStats(userId, robotId, callback) {
    let where = {user_id: userId, robot_id: robotId};
    orm.selectFromWhere('vw_user_robot_stats', where, callback);
}

//** */
function getUserRobotConfiguration(userId, robotId, callback) {
    let where = {
        user_id: userId,
        robot_id: robotId
    };

    orm.selectFromWhere('vw_user_robot_configuration', where, (results) => {
        results.forEach(e => {
            e.part_name === 'Empty' ? e.part_equipped = false : e.part_equipped = true;
        });
        callback(results);
    });
}

function getRobotName(robotId, callback) {
    let where = {id: robotId};

    orm.selectFromWhere('robots', where, callback);
}

function newRoboto(userID, name, callback){

   let where= {user_id: userID, name: name}

    orm.insertObject('robots', where, callback)

    };

function checkRobotPart(robotId, positionId, callback) {
    let where = {robot_id: robotId, position_id: positionId};
    orm.selectFromWhere('user_robot_parts', where, callback);
}

function updateRobotPart(robotId, partId, positionId, callback) {
    let update = {part_id: partId};
    let where = {robot_id: robotId, position_id: positionId};
    orm.updateTable('user_robot_parts', update, where, callback);
}

function addRobotPart(userId, robotId, partId, positionId, callback) {
    let insert = {
        user_id: userId,
        robot_id: robotId,
        part_id: partId,
        position_id: positionId
    };
    orm.insertObject('user_robot_parts', insert, callback);
}

function removeRobotPart(robotId, positionId, callback) {
    let where = {
        robot_id: robotId,
        position_id: positionId
    };
    orm.deleteFromWhere('user_robot_parts', where, callback);
}

module.exports = {
    getRobotName: getRobotName,
    getUserSingleRobotStats: getUserSingleRobotStats,
    getUserRobotsStats: getUserRobotsStats,
    getUserRobotConfiguration: getUserRobotConfiguration,
    newRoboto: newRoboto,
    checkRobotPart: checkRobotPart,
    addRobotPart: addRobotPart,
    updateRobotPart: updateRobotPart,
    removeRobotPart: removeRobotPart
};