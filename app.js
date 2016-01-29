var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'zoo_db'
});
 
connection.connect();
 
connection.query('SELECT * FROM caretakers', function(err, rows, fields) {
  if (err) throw err;
 
  console.log('The solution is: ', rows);
});
 
connection.end();