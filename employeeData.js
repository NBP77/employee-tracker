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
              "View Employee?",
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
          
            case "Add Employee?":
                addEmployee();
            break;

            case "Update Employee":
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

// Creating new function for each prompt above

// Exit
function exit() {
  console.log("Goodbye");
  connection.end();
}





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