const connection = require('./connection')

class DB {
  // pass connection variable to constructor function
  constructor(connection){
    this.connection = connection
  }

  // find all departments
  findAllDepartments(){
    return this.connection
    .promise()
    .query('SELECT * FROM department');
  };

  findAllRoles(){
    return this.connection
    .promise()
    .query('SELECT * FROM role');
  };

  findAllEmployees(){
    return this.connection
    .promise()
    .query('SELECT * FROM employee');
  };

  addNewDepartment(){
    return this.connection
    .promise()
    .query('INSERT INTO department (name) VALUES (?)');
  };

  addNewRole(){
    return this.connection
    .promise()
    .query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)');
  };

  addNewEmployee(){
    return this.connection
    .promise()
    .query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)');
  };
};

module.exports = new DB(connection)