const connection = require('./connection');

function selectFromWhereCol(table, col, where, callback) {
    let queryString = "SELECT * FROM ?? WHERE ?? = ?;";

    connection.query(queryString, [table, col, where], function(err, results) {
      if (err) throw err;
      if(typeof callback === 'function') callback(results);
    });
}

function selectFromWhere(table, obj, callback) {
    
    let where = objToWhere(obj);
    let queryString = 'SELECT * FROM ?? WHERE ' + where + ';';

    let query = connection.query(queryString, [table, where], function(err, results) {
        if (err) throw err;
        
        if(typeof callback === 'function') callback(results);
      });
}

function insertObject(table, insert, callback) {
    let queryString = 'INSERT INTO ?? SET ?;';

    connection.query(queryString, [table, insert], (err, results) => {
        if (err) throw err;

        if(typeof callback === 'function') callback(results);
    });
}

function updateTable(table, update, where, callback) {
    let queryString = 'UPDATE ?? SET ? WHERE ?';

    connection.query(queryString, [table, update, where], (err, results) => {
        if(err) throw err;

        if(typeof callback === 'function') callback(results);
    });
}

function deleteFromWhere(table, where, callback) {
    let queryString = 'DELETE FROM ?? WHERE ?';

    connection.query(queryString, [table, where], (err, results) => {
        if (err) throw err;
        if(typeof callback === 'function') callback(results);
    });
}

function objToWhere(obj) {
    let result = '';
    let keyCount = Object.keys(obj).length;
    let counter = 0;
    for(let key in obj) {
        if(counter < keyCount - 1) {
            result += `${key} =\'${obj[key]}\' AND `;
        } else {
            result += `${key}=\'${obj[key]}\'`
        }
        counter++;
    }
    return result;
}

module.exports = {
    selectFromWhere: selectFromWhere,
    selectFromWhereCol: selectFromWhereCol,
    insertObject: insertObject,
    updateTable: updateTable,
    deleteFromWhere: deleteFromWhere
}