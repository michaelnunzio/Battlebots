const orm = require('./../config/orm');

function getAvailableProducts(callback) {
    orm.selectFrom('available_robot_parts', callback);
}

module.exports = {
    getAvailableProducts: getAvailableProducts
}