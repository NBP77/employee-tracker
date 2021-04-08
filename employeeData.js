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


// Function for prompts 
const begin = () => {
    inquirer.prompt(prompts.startPrompts)
     .then((answers) => {
        switch(answers.task) {
            case "Add departments, roles, and/or employees":
                addSelector();
                break;
            case "View departments, roles, employees":
                viewSelector();
                break;
            case "Update employee roles":
                updateSelector();
                break;
            case "Exit":
                exit();
                break
        }
    });
}

// Functions for options 

// Add departments, roles, and/or employees
function addOption() {
  inquirer.prompt(prompts.addPrompts)
  .then((answers) => {
    switch(answers.task) {
        case "Departments":
            addDepartment();
            break;
        case "Employees":
            addEmployee();
            break;
        case "Roles":
            addRole();
            break;
        case "Go Back":
            start();
            break
    }
});
}

// View departments, roles, employees
function viewOption() {
  inquirer.prompt(prompts.addPrompts)
      .then((answers) => {
          switch (answers.task) {
              case "Departments":
                  viewDepartment();
                  break;
              case "Employees":
                  viewEmployee();
                  break;
              case "Roles":
                  viewRole();
                  break;
              case "Go Back":
                  start();
                  break
          }
      });
}

// Update employee roles
function updateOption() {
  inquirer.prompt(prompts.addPrompts)
      .then((answers) => {
          switch (answers.task) {
              case "Departments":
                  updateDepartment();
                  break;
              case "Employees":
                  updateEmployee();
                  break;
              case "Roles":
                  updateRole();
                  break;
              case "Go Back":
                  start();
                  break
          }
      });
}

// Exit
function exit() {
  console.log("Goodbye");
  connection.end();
}


// Option Prompts
const startPrompts = [
    {
        type: 'list',
        name: 'options',
        message: 'Please select an option below',
        choices: [
            "Add departments, roles, and/or employees",
            "View departments, roles, employees",
            "Update employee roles",
            "Exit"
        ]
    }
]


connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  begin();
});



// const afterConnection = () => {
//   connection.query('SELECT * FROM employee', (err, res) => {
//     if (err) throw err;
//     console.table(res);
//     connection.end();
//   });
// };