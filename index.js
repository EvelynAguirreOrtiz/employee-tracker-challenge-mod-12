const inquirer = require('inquirer');
const db = require('./db');
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
}

// Add new role to database
// roleArr = [];
function addRole() {

  db.findAllDepartments().then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({ name: name, value: id }));

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
        choices: departmentChoices
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
  })
}

// Add employee to database
function addEmployee() {

  db.findAllRoles().then(([rows]) => {
    let roles = rows;
    const roleChoices = roles.map(({ title, salary, department_id }) => ({ name: title, value: department_id }));

    db.findAllEmployees().then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name, role_id, manager_id }) => ({ name: first_name + ' ' + last_name, value: id }));

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
          choices: roleChoices
        },
        {
          type: 'list',
          name: 'manager_id',
          message: 'If applicable, please choose employee manager ID.',
          default: false,
          choices: employeeChoices
        }
      ])
        .then((data) => {
          db.addNewEmployee(data)
            .then(([rows]) => {
              let newEmployees = rows;
              console.table(newEmployees);
            })
            .then(() => {
              promptDataBase();
            })
        })
    })
  })
}

// Update employee role
function updateEmployeeRole() {

  db.findAllEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name, role_id, manager_id }) => ({ name: first_name + ' ' + last_name, value: id }));


  db.findAllRoles().then(([rows]) => {
    let roles = rows;
    const roleChoices = roles.map(({ title, salary, department_id }) => ({ name: title, value: department_id }));

      inquirer.prompt([
        {
          type: 'list',
          name: 'id',
          message: 'Choose employee ID',
          choices: employeeChoices
        },
        {
          type: 'list',
          name: 'role_id',
          message: 'Please select new role ID',
          choices: roleChoices
        }
      ])
        .then((data) => {
          db.updateEmployeeRole(data)
            .then(([rows]) => {
              let employeeRoles = rows;
              console.table(employeeRoles);
            })
            .then(() => {
              promptDataBase();
            })
        })
  })})
}

// Start app
function promptDataBase() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'options',
      message: 'What would you like to do?',
      choices: [
        // 'View all departments',
        // 'View all roles',
        // 'View all employees',
        // 'Add a department',
        // 'Add a role',
        // 'Add an employee',
        // 'Update an employee role',
        // 'Exit Employee Tracker'

        'View all departments',
        'Add a department',
        'View all roles',
        'Add a role',
        'View all employees',
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
