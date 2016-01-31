var mysql = require('mysql');
var prompt = require("prompt");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'zoo_db'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    };
    //console.log('connected as id ' + connection.threadId);
});

prompt.start();
prompt.message = "";

var zoo = function() {
  this.welcome = function() {
    console.log("Welcome to the Zoo And Friends App!");
  }
  this.menu = function() {
    console.log("Enter (A): to Add a new animal to the Zoo!");
    console.log();
    console.log("Enter (U): to Update info on an animal in the Zoo!");
    console.log();
    console.log("Enter (V): to Visit the animals in the Zoo!");
    console.log();
    console.log("Enter (D): to Adopt an animal from the Zoo!");
    console.log();
    console.log("Enter (Q): to Quit and exit the Zoo!");
  }
  this.add = function(inputScope) {
    var currentScope = inputScope;
    console.log("To add an animal to the zoo please fill out the following form for us!");
    prompt.get(["name", "type", "age"], function (err, result) {
      var caretaker_id = 1;
      connection.query('INSERT INTO animals (name, type, age, caretaker_id) VALUES (?,?,?,?)', [result.name, result.type, result.age, caretaker_id], function(err, rows, fields) {
        if (err) throw err;
        console.log('Finished adding the animal');
      });
    currentScope.menu();
    currentScope.promptUser();
    });
  }
  //???? should the visit function have the argument inputScope?
  this.visit = function(inputScope) {
    var currentScope = inputScope;
    console.log("Enter (I): do you know the animal by it's id? We will visit that animal!");
    console.log("Enter (N): do you know the animal by it's name? We will visit that animal!");
    console.log("Enter (A): here's the count for all animals in all locations!");
    console.log("Enter (C): here's the count for all animals in this one city!");
    console.log("Enter (O): here's the count for all the animals in all locations by the type you specified!");
    console.log("Enter (Q): Quits to the main menu!");
    //currentScope.visit();
    currentScope.view(currentScope);
  }
  this.view = function(inputScope){
    var currentScope = inputScope;
    console.log("Please choose what you would like to do!");
    prompt.get(["visit"], function (err, result) {
      if (result.visit == "Q"){
        currentScope.menu();
        currentScope.promptUser();
      } else if (result.visit == "O") {
        currentScope.type(currentScope);
      } else if (result.visit == "I") {
        currentScope.animId(currentScope);       
      } else if (result.visit == "N") {
        currentScope.name(currentScope);          
      } else if (result.visit == "A"){
        currentScope.all(currentScope);
      } else if (result.visit == "C") {
        currentScope.care(currentScope);
      } else {
        console.log("Sorry didn't get that, come again?");
        currentScope.visit();
        currentScope.view(currentScope);
      }
    });  
  }
  this.type = function(inputScope) {
    var currentScope = inputScope;
    console.log("Enter the animal type to find how many animals we have of those type.");
    prompt.get(["animal_type"], function (err, result) {
      connection.query('SELECT COUNT(id) FROM animals WHERE type =?', [result.animal_type], function(err, rows, fields) {
        if (err) throw err;
          console.log(rows);                    //** still need to drill into rows
      });
    currentScope.menu();
    currentScope.promptUser();
    });
  }  
  this.care = function(inputScope) {
    var currentScope = inputScope;
    console.log("Enter city name NY/SF.");
    prompt.get(["city_name"], function (err, result) {
      connection.query('SELECT COUNT(type) FROM animals LEFT JOIN caretakers ON caretaker_id=caretakers.id WHERE city = ?', [result.city_name], function(err, rows, fields) {
        if (err) throw err;
        console.log('The number of animals in that city is : ' + rows);  //** still need to drill into the object
      });
    currentScope.visit(currentScope);
    //currentScope.view(currentScope);
    });
  }
  this.animId = function(inputScope) {
    var currentScope = inputScope;
    console.log("Enter the ID of the animal you want to visit.");
    prompt.get(["animal_id"], function (err, result) {
      connection.query('SELECT city FROM animals LEFT JOIN caretakers ON caretaker_id=caretakers.id WHERE animals.id = ?', [result.animal_id], function(err, rows, fields) {
        if (err) throw err;
          for (i=0; i <rows.length;i++){
            console.log('The city id ' + result.animal_id +  ' is in is: ' + rows[i].city);
          }  
      });
    currentScope.visit(currentScope);
    //currentScope.view(currentScope);
    });
  }  
  this.name = function(inputScope) {
    var currentScope = inputScope;
    console.log("Enter the name of the animal you want to visit.");
    prompt.get(["animal_name"], function (err, result) {
    connection.query('SELECT city FROM animals LEFT JOIN caretakers ON caretaker_id=caretakers.id WHERE animals.name = ?', [result.animal_name], function(err, rows, fields) {
      if (err) throw err;
        for (i=0; i <rows.length;i++){
          console.log('The city ' + result.animal_name + ' is in is : ' + rows[i].city);
        }  
    });
    currentScope.visit(currentScope);
    //currentScope.view(currrentScope);
    });
  }
  this.all = function(inputScope) {
    var currentScope = inputScope;
    console.log("Press Enter to find how many animals we have to visit.");
    prompt.get(["animal_all"], function (err, result) {
    connection.query('SELECT COUNT(id) FROM animals', function(err, rows, fields){
      if (err) throw err;
      console.log('The number of animals at the zoo is :' + rows);   //** still need to drill into the object
    });    
    currentScope.menu();
    currentScope.promptUser();
    });
  }
  this.update = function(inputScope) {
    var currentScope = inputScope;
    console.log("Enter to update an animal.");
    prompt.get(["id","new_name","new_age","new_type","new_caretaker_id"], function (err, result) {
      connection.query('UPDATE animals SET name=?, age=?, type=?, caretaker_id=? WHERE id=?', [result.new_name, result.new_age, result.new_type, result.new_caretaker_id, result.id], function(err, rows, fields) {
        if (err) throw err;
          console.log("The animal is updated");
      });
    currentScope.menu();
    currentScope.promptUser();
    });
  }
  this.adopt = function(inputScope) {
    var currentScope = inputScope;
    console.log("Enter the ID of the animal you want to adopt.");
    prompt.get(["animal_id"], function (err, result) {
      connection.query('DELETE FROM animals WHERE id =?', [result.animal_id], function(err, rows, fields) {
        if (err) throw err;
          console.log("You adopted the animal");
      });
    // currentScope.visit();
    // currentScope.view(currentScope);
    currentScope.menu();
    currentScope.promptUser();
    });
  }
  this.promptUser = function() {
    var self = this;
    prompt.get(["input"], function (err, result) {
      if (result.input == "Q") {
        self.exit();
      } else if (result.input == "A") {
        self.add(self);
      } else if (result.input == "U"){
        self.update(self);  
      } else if (result.input == "V") {
        self.visit(self);
        //self.view(self);
      } else if (result.input == "D") {
        self.adopt(self);
      } else {
        console.log("Sorry didn't get that, come again?");
      }
    });
  }  
  this.exit = function() {
    console.log("Thank you for visiting us, good bye!");
    process.exit();
  }
  this.open = function() {
    this.welcome();
    this.menu();
    this.promptUser();
  }
}


var zoo1 = new zoo();
//these are used to check the functions in zoo
//zoo1.welcome();
//zoo1.menu();
//zoo1.add();
//zoo1.visit();
//zoo1.view();
//zoo1.type();
//zoo1.care();
//zoo1.animId();
//zoo1.name();
//zoo1.all();
//zoo1.update();
//zoo1.adopt();
//zoo1.promptUser()
//zoo1.exit();
zoo1.open();

