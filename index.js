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
    //test for input 
    // console.log("name: " + result.name);
    // console.log("type: " + result.type);
    // console.log("age: " + result.age);
    connection.query();
    currentScope.menu();
    currentScope.promptUser();
    });
  }
  //???? should the visit function have the argument inputScope?
  this.visit = function() {
    console.log("Enter (I): do you know the animal by it's id? We will visit that animal!");
    console.log("Enter (N): do you know the animal by it's name? We will visit that animal!");
    console.log("Enter (A): here's the count for all animals in all locations!");
    console.log("Enter (C): here's the count for all animals in this one city!");
    console.log("Enter (O): here's the count for all the animals in all locations by the type you specified!");
    console.log("Enter (Q): Quits to the main menu!");
    currentScope.visit();
    currentScope.view(currentScope);
  }
  //???? should the view function have the argument inputScope?
  this.view = function(inputScope){
    var currentScope = inputScope;
    console.log("Please choose what you would like to visit!");
    prompt.get(["visit"], function (err, result) {
    //test for input 
    //console.log("visit: " + result.visit);
      if (result.visit == "Q"){
        currentScope.menu();
      } else if (result.visit == "O") {
        currentScope.type(input_scope);
      } else if (result.visist == "I") {
        currentScope.type(input_scope);
      } else if (result.visit == "N") {
        currentScope.name(input_scope);
      } else if (result.visit == "A"){
        currentScope.all(input_scope);
      } else if (ressult.visit == "C") {
        currentScope.care(input_scope);
      } else {
        console.log("Sorry didn't get that, come again?");
        currentScope.visit();
        currentScope.view(currentScope);
      }
    });  
  }
  this.type = function(inputScope) {
    var currentScope = inputScope;
    console.log("Enter animal type to find how many animals we have of those type.");
    prompt.get(["animal_type"], function (err, result) {
    //test for input 
    // console.log("animal_type: " + result.animal_type);
    connection.query();
    currentScope.menu();
    currentScope.promptUser();
    });
  }  
  
}

//these are used to check the functions in zoo
var zoo1 = new zoo();
zoo1.welcome();
zoo1.menu();
//zoo1.add();
//zoo1.visit();
zoo1.view();
