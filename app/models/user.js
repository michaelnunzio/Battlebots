const orm = require('./../config/orm');

function checkUsernameExists(user, exists, notexists) {
    orm.selectFromWhereCol('users', 'username', user.username, results => {
        if (typeof exists !== 'function' || typeof notexists !== 'function') return;
        results.length > 0 ? exists(results) : notexists(results);
    });
}

function login(user, success, failure) {
    orm.selectFromWhere('users', user, results => {
        results.length > 0 ? success(results) : failure(results);
    });
}

function createAccount(user, success, failure) {
    checkUsernameExists(user, failure , () => {
        orm.insertObject('users', user, results => {
            results.affectedRows > 0 ? success(results) : failure(results);
        });
    })
    
}

function getUserInventory(userId, callback) {
    let where = {
        user_id: userId
    };

    orm.selectFromWhere('vw_user_inventory', where,  callback);
}

function checkInventoryForPart(userId, partId, exists, notExists) {
    let where = {
        user_id: userId,
        part_id: partId
    };

    orm.selectFromWhere('user_inventory', where, results => {
        if(results.length === 1) exists(results);
        else notExists(results);
    });
}

function updateInventoryPartQuantity(userId, partId, newQuantity, callback) {
    let update = {quantity: newQuantity};
    let where = {
        user_id: userId,
        part_id: partId
    };

    orm.updateTable('user_inventory', update, where, callback);
}

function addNewPartToInventory(userId, partId, quantity, callback) {
    let insert = {
        user_id: userId,
        part_id: partId,
        quantity: quantity
    };

    orm.insertObject('user_inventory', insert, callback);
}

function createWallet(userId, callback) {
    let insert = {
        user_id: userId,
        amount: 25
    };

    orm.insertObject('user_wallets', insert, callback);
}

function getUserFunds(userId, callback) {
    let where = {
        user_id: userId
    };

    orm.selectFromWhere('user_wallets', where, callback);
}

function updateWallet(userId, amount, callback) {
    let where = {user_id: userId};
    //Get wallet amount to update properly
    orm.selectFromWhere('user_wallets', where, (results) => {
        let newAmount = Number(results[0].amount) + Number(amount);
        if(newAmount < 0) {
            let error = {
                error: true,
                message: 'Not enough funds'
            };
            callback(error);
            return;
        }
        let update = {amount: newAmount};
        orm.updateTable('user_wallets', update, where, callback);
    });
}

module.exports = {
    checkUsernameExists: checkUsernameExists,
    login: login,
    createAccount: createAccount,
    getUserInventory: getUserInventory,
    checkInventoryForPart: checkInventoryForPart,
    addNewPartToInventory: addNewPartToInventory,
    updateInventoryPartQuantity: updateInventoryPartQuantity,
    createWallet: createWallet,
    getUserFunds: getUserFunds,
    updateWallet: updateWallet
}