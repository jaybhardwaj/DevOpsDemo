var mysql = require('mysql');
var connection = mysql.createPool({
      host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'Registeration'
});

connection.on('error', function(err) {
    connection.destroy();
})
module.exports = function(options, fn) {

      connection.query(options, fn);
console.log("in dbconnection");
}
