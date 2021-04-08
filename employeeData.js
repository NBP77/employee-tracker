const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'employee_trackerDB',
});


// Function for prompts 
const begin = () => {
    inquirer.prompt(prompts.startPrompts)
    // .then?
}

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

// Functions for options 

// Add departments, roles, and/or employees

// View departments, roles, employees

// Update employee roles

// Exit


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