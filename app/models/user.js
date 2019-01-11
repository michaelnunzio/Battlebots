const orm = require('./../config/orm');
const bcrypt = require('bcryptjs');

function getUser(userId, callback) {
    let where = {id: userId};
    orm.selectFromWhere('users', where, callback);
}

function checkUsernameExists(user, exists, notexists) {
    orm.selectFromWhereCol('users', 'username', user.username, results => {
        if (typeof exists !== 'function' || typeof notexists !== 'function') return;
        results.length > 0 ? exists(results) : notexists(results);
    });
}

function login(user, success, failure) {
    let where = {username: user.username};
    orm.selectFromWhere('users', where, results => {
        if(results.length === 1) {
            bcrypt.compare(user.password, results[0].password, (err, match) => {
                if(err) throw err;

                if(match) success(results);
                else {
                    let error = {
                        error: true,
                        message: 'Invalid password'
                    };
                    failure(error);
                }
            });
        } else {
            let error = {
                error: true,
                message: 'Username not found'
            };
            failure(error);
        }
    });
}

function createAccount(user, success, failure) {
    checkUsernameExists(user, failure , () => {
        //hash user provided password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) throw err;

                userHash = {username: user.username, password: hash};
                orm.insertObject('users', userHash, results => {
                    results.affectedRows > 0 ? success(results) : failure(results);
                });
            });
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

function getUserBattleResults(userId, callback) {
    let where = {user_id: userId};
    
    orm.selectFromWhere('user_battle_results', where, callback);
}

function createUserBattleResults(userId, callback) {
    let insert = {user_id: userId, wins: 0, losses: 0};

    orm.insertObject('user_battle_results', insert, callback)
}

function updateBattleResults(userId, victory, callback) {
    let where = {user_id: userId};

    orm.selectFromWhere('user_battle_results', where, (results) => {
        if(victory === 'true') {
            let newWins = results[0].wins + 1;
            let wins = {wins: newWins};
            orm.updateTable('user_battle_results', wins, where, callback);
        } else {
            let newLosses = results[0].losses + 1;
            let losses = {losses: newLosses};
            orm.updateTable('user_battle_results', losses, where, callback);
        }
    }); 
}

module.exports = {
    getUser: getUser,
    checkUsernameExists: checkUsernameExists,
    login: login,
    createAccount: createAccount,
    getUserInventory: getUserInventory,
    checkInventoryForPart: checkInventoryForPart,
    addNewPartToInventory: addNewPartToInventory,
    updateInventoryPartQuantity: updateInventoryPartQuantity,
    createWallet: createWallet,
    getUserFunds: getUserFunds,
    updateWallet: updateWallet,
    getUserBattleResults: getUserBattleResults,
    createUserBattleResults: createUserBattleResults,
    updateBattleResults: updateBattleResults
}