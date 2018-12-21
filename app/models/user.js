const orm = require('./../config/orm');

function checkUsernameExists(user, exists, notexists) {
    orm.selectFromWhereCol('users', 'username', user.username, results => {
        if (typeof exists !== 'function' || typeof notexists !== 'function') return;
        results.length > 0 ? exists(results) : notexists(results);
    });
}

function login(user, success, failure) {
    console.log(user, 'Logging in...');
    orm.selectFromWhere('users', user, results => {
        results.length > 0 ? success(results) : failure(results);
    });
}

function createAccount(user, success, failure) {
    console.log(user, 'Creating account..');
    checkUsernameExists(user, failure , () => {
        orm.insertObject('users', user, results => {
            console.log(results);
            results.affectedRows > 0 ? success(results) : failure(results);
        });
    })
    
}

module.exports = {
    checkUsernameExists: checkUsernameExists,
    login: login,
    createAccount: createAccount
}