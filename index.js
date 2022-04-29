const inquirer = require('inquirer');
// const fs = require('fs');
// const Department = require('./lib/Department');
// const Role = require('./lib/Role');
// const Employee = require('./lib/Employee');
const db = require('./db');
const mysql = require('mysql2');
const showTable = require('console.table');


// View all departments
function viewAllDepartments() {

  db.findAllDepartments()
  .then(([rows]) => {
    let departments = rows;
    console.table(departments);
  })
  .then(() => {
    promptDataBase();
  })
}

// View all roles
function viewAllRoles() {

  db.findAllRoles()
  .then(([rows]) => {
    let roles = rows;
    console.table(roles);
  })
  .then(() => {
    promptDataBase();
  })
}

function viewAllEmployees() {

  db.findAllEmployees()
  .then(([rows]) => {
    let employees = rows;
    console.table(employees);
  })
  .then(() => {
    promptDataBase();
  })
}

// Add new department to database
// const departmentArr = [];
function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter department name (Required)',
      validate: departmentInput => {
        if (departmentInput) {
          return true;
        } else {
          console.log('Please enter department name!');
          return false;
        }
      }
    }
  ])
  .then((data) => {
    // const department = new Department(data.name)
    db.addNewDepartment(data)
    .then(([rows]) => {
      let newDepartments = rows;
      console.table(newDepartments);
    })
    .then(() => {
      promptDataBase();
    })
  })
  // promptDataBase();
}

// Add new role to database
roleArr = [];
function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter role title (Required)',
      validate: roleInput => {
        if (roleInput) {
          return true;
        } else {
          console.log('Please enter role title!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter salary for this role (Required)',
      validate: salaryInput => {
        if (salaryInput) {
          return true;
        } else {
          console.log('Please enter the salary for this role!');
          return false;
        }
      }
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'Please choose the department for this role (Required)',
      choices: [

        // LIST NAME FROM DEPARTMENT TABLE)
        
        // SELECT *
        // FROM department
        // WHERE id = i
        1,
        2,
        3
      ]
    },
  ])
  .then((data) => {
    db.addNewRole(data)
    .then(([rows]) => {
      let newRoles = rows;
      console.table(newRoles);
    })
    .then(() => {
      promptDataBase();
    })
  })
}

// Add employee to database
employeeArr = [];
function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter employee first name (Required)',
      validate: firstNameInput => {
        if (firstNameInput) {
          return true;
        } else {
          console.log('Please enter employee first-name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter employee last name (Required)',
      validate: lastNameInput => {
        if (lastNameInput) {
          return true;
        } else {
          console.log('Please enter employee last-name!');
          return false;
        }
      }
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Choose employee role ID (Required)',
      choices: [

        // LIST TITLE FROM ROLE TABLE

        // SELECT title
        // FROM role
        // WHERE
        1,
        2,
        3
      ]
    },
    {
      type: 'list',
      name: 'manager_id',
      message: 'If applicable, please choose employee manager.',
      choices: [

        // LIST MANAGER ID AND TITLE FROM EMPLOYEE TABLE

        // SELECT manager_id, first_name, last_name
        // FROM employee
        // WHERE 
        1,
        2,
        3,
        'None'
      ]
    }
  ])
  .then((data) => {
    const employee = new Employee(data.first_name, data.last_name, data.role_id, data.manager_id)

    // ADD EMPLOYEE TO EMPLOYEE TABLE HERE
    addNewEmployee()
    // INSERT INTO employee (first_name, last_name, role_id, manager_id)
    // VALUE (?,?,?,?);

    employeeArr.push(employee);
    console.log(employeeArr);

    promptDataBase();
  })  
}

// Update employee role
function updateEmployeeRole() {
  console.log('update employee role')
  inquirer.prompt([
    {
      type: 'list',
      name: 'id',
      message: 'Choose employee to update role',
      choices: [

        // LIST EMPLOYEE FIRST_NAME LAST_NAME FROM EMPLOYEE TABLE

        // SELECT * FROM employee

        'Employee 1',
        'Employee 2'
      ]
    },
    {
      type: 'list',
      name: 'role',
      message: 'Please choose enter new role',
      choices: [

        // LIST ROLE TITLES FROM ROLE TABLE
        // SELECT * FROM role

        'Engineer',
        'Intern',
        'Coder'
      ]
    }
  ])
  .then((data) => {
    // const updateRole = new UpdateRole(data.id, data.role)

    // ADD ROLE TO ROLE TABLE HERE

    // INSERT INTO employee (role_id)
    // VALUE (?);
    updateEmployeeRole()

    console.log(data);

    promptDataBase();
  }) 
}

// Start app
function promptDataBase() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'options',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit Employee Tracker'
      ]
    }
  ]).then((choice) => {
    console.log(choice);

    if (choice.options === 'View all departments') {
      viewAllDepartments();
    }

    if (choice.options === 'View all roles') {
      viewAllRoles();
    }

    if (choice.options === 'View all employees') {
      viewAllEmployees();
    }
    if (choice.options === 'Add a department') {
      addDepartment();
    }

    if (choice.options === 'Add a role') {
      addRole();
    }

    if (choice.options === 'Add an employee') {
      addEmployee();
    }

    if (choice.options === 'Update an employee role') {
      updateEmployeeRole();
    }

    if (choice.options === 'Exit Employee Tracker') {
      console.log("EXIT EMPLOYEE TRACKER");
    }
  })
};
promptDataBase();
