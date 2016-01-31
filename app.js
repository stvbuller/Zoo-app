var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'zoo_db'
});
 
connection.connect();
//find caretakers
// connection.query('SELECT * FROM caretakers', function(err, rows, fields) {
//   if (err) throw err;
 
//   for (i=0; i <rows.length;i++){
//     console.log(rows[i].name + " city is in " +rows[i].city);
//   }
//   //console.log('The solution is: ', rows);
// });

//find the city an animal id is in 
// var animal_id = 1;
// connection.query('SELECT city FROM animals LEFT JOIN caretakers ON caretaker_id=caretakers.id WHERE animals.id = ?', [animal_id], function(err, rows, fields) {
//   if (err) throw err;
//     for (i=0; i <rows.length;i++){
//       console.log('The city is: ' + rows[i].city);
//     }  
// });

//add an animal to the database
// var name = "Sam";
// var type = "Bear";
// var age = "34";
// caretaker_id = 1;
// connection.query('INSERT INTO animals (name, type, age, caretaker_id) VALUES (?,?,?,?)', [name, type, age, caretaker_id], function(err, rows, fields) {
//   if (err) throw err;
  
//   console.log('Finished adding the animal');
// });

//delete an animal from the database
// var animal_id = 100;
// connection.query('DELETE FROM animals WHERE id =?', [animal_id], function(err, rows, fields) {
//   if (err) throw err;
    
//     console.log("The animal is adopted");
// });



//counts the number of a type of animal
// var animal_type = "snake";
// connection.query('SELECT COUNT(id) FROM animals WHERE type =?', [animal_type], function(err, rows, fields) {
//   if (err) throw err;
 
//     console.log(rows);  //?? still need to drill into rows
// });

//counts total number of animals
// connection.query('SELECT COUNT(id) FROM animals', function(err, rows, fields){
//   if (err) throw err;
//   console.log('The number of animals at the zoo is :' + rows);   //?? still need to drill into the object
// });

//returns the location of a animal specified by name
// var animal_name = "Tinfancier Collarmon";
// connection.query('SELECT city FROM animals LEFT JOIN caretakers ON caretaker_id=caretakers.id WHERE animals.name = ?', [animal_name], function(err, rows, fields) {
//   if (err) throw err;
//     for (i=0; i <rows.length;i++){
//       console.log('The city is: ' + rows[i].city);
//     }  
// });


//counts the number of animals in a city
// var city_name = "NY";
// connection.query('SELECT COUNT(type) FROM animals LEFT JOIN caretakers ON caretaker_id=caretakers.id WHERE city = ?', [city_name], function(err, rows, fields) {
//   if (err) throw err;
//   console.log('The number of animals is : ' + rows);  //?? still need to drill into the object
// });

//updates an animal
// var new_id = 40;
// var new_name = "bobo";
// var new_age = 99;
// var new_type = "snake";
// var new_caretaker = 1;
// connection.query('UPDATE animals SET name=?, age=?, type=?, caretaker_id=? WHERE id=?', [new_name, new_age, new_type, new_caretaker, new_id], function(err, rows, fields) {
//   if (err) throw err;
//     console.log("The animal is updated");
// });
connection.end();

