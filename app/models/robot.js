const orm = require('./../config/orm');

function getUserRobotsStats(userId, callback) {
    let where = {user_id: userId};
    orm.selectFromWhere('vw_user_robot_stats', where, callback);
}

module.exports = {
    getUserRobotsStats: getUserRobotsStats
};