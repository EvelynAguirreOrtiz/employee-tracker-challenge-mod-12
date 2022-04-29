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

  addNewDepartment(data){
    const newDept = [data.name];
    return this.connection
    .promise()
    .query('INSERT INTO department (name) VALUES (?)', newDept);
  };

  addNewRole(data){
    const newRole = [
      data.title,
      data.salary,
      data.department_id
    ];
    return this.connection
    .promise()
    .query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)', newRole);
  };

  addNewEmployee(){
    const newEmployee = [
      data.first_name,
      data.last_name,
      data.role_id,
      data.manager_id
    ];  
    return this.connection
    .promise()
    .query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', newEmployee);
  };

  updateEmployeeRole(){
    const newEmployeeRole = [
      data.role_id,
      data.id
    ];  
    return this.connection
    .promise()
    .query('UPDATE employee SET role_id = ? WHERE id = ?', newEmployee);
  };
};

module.exports = new DB(connection)