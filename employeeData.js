const mysql = require('mysql');
const inquirer = require('inquirer');
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


connection.connect(function(err) {
    if (err) throw err
    console.log("Connected as Id" + connection.threadId)
    startPrompt();
});

// Starts prompt 
function startPrompt() {
    inquirer.prompt([
    {
    type: "list",
    message: "Please select an option",
    name: "choice",
    choices: [
              "Add Department?",
              "Add Role?",
              "Add Employee",
              "View Department?",
              "View Role?",
              "View All Employee?",
              "Update Employee role?"
            ]
    }

    ])
    .then(function(answer) {
        switch (answer.choice) {
            case "View All Employees?":
              viewAllEmployees();
            break;
    
            case "View All Employee's By Roles?":
              viewAllRoles();
            break;
            case "View all Employee's By Departments":
              viewAllDepartments();
            break;
          
            case "Add Employees?":
                addEmployee();
            break;

            case "Update Employee?":
                updateEmployee();
            break;
      
            case "Add Role?":
                addRole();
            break;
      
            case "Add Department?":
                addDepartment();
            break;

            case "Exit?":
                exit();
            break;
    
            }
    })
}

// View all employees
function viewAllEmployees() {
    connection.query("SELECT * FROM employee;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
  })
}

// View all roles 
function viewAllRoles() {
    connection.query("SELECT * FROM role;", 
    function(err, res) {
    if (err) throw err
    console.table(res)
    startPrompt()
    })
  }

// View all departments function 
function viewAllDepartments() {
    connection.query("SELECT * FROM department;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
    })
  } 

// Creates the list of roles to select to add new employee  
  var roleArr = [];
  function selectRole() {
    connection.query("SELECT * FROM role", function(err, res) {
      if (err) throw err
      for (var i = 0; i < res.length; i++) {
        roleArr.push(res[i].title);
      }
  
    })
    return roleArr;
  } 

// Add employee function 
  function addEmployee() { 
    inquirer.prompt([
        {
          name: "firstname",
          type: "input",
          message: "Enter their first name "
        },
        {
          name: "lastname",
          type: "input",
          message: "Enter their last name "
        },
        {
          name: "role",
          type: "list",
          message: "What is their role? ",
          choices: selectRole()
        },
    ])
    .then(function (answer) {
        var roleId = selectRole().indexOf(answer.role) + 1
        connection.query("INSERT INTO employee SET ?", 
        {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: roleId
            
        }, function(err){
            if (err) throw err
            console.table(answer)
            startPrompt()
        })
  
    })
}

// Function for update employee 
function addRole() { 
    connection.query("",   function(err, res) {
      inquirer.prompt([
          {
            name: "Title",
            type: "input",
            message: "What is the role called?"
          },
          {
            name: "Salary",
            type: "input",
            message: "What is the roles Salary?"
  
          } 
      ])
      .then(function(res) {
            connection.query(
              "INSERT INTO role SET ?",
              {
                title: res.Title,
                salary: res.Salary,
              },
              function(err) {
                  if (err) throw err
                  console.table(res);
                  startPrompt();
              }
          )
      });
    });
    }

// Add a department function 
  function addDepartment() { 
    inquirer.prompt([
          {
            name: "name",
            type: "input",
            message: "What is the new department?"
          }
      ])
      .then(function(res) {
            connection.query(
              "INSERT INTO department SET ? ",
              {
                name: res.name
              
              },
              function(err) {
                  if (err) throw err
                  console.table(res);
                  startPrompt();
              }
          )
      })
    }

// Exit function 
function exit() {
  console.log("Goodbye");
  connection.end();
}


