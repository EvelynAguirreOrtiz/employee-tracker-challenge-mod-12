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
    // .query('SELECT * FROM role');
    // .query('SELECT role.id AS id, role.title AS title, role.salary AS salary, department.name AS name FROM role JOIN department ON role.department_id = department.name');
    .query('SELECT role.id, role.title, role.salary, department.name AS department_id FROM role JOIN department ON role.department_id = department.id');

  };

  findAllEmployees(){
    return this.connection
    .promise()
    .query('SELECT * FROM employee');
    // .query('SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, role.title AS title, department.name AS department, role.salary AS salary, ?manager?.name AS manager FROM employee INNER JOIN department, role, manager ON ?');
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

  addNewEmployee(data){
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

  updateEmployeeRole(data){
    const newEmployeeRole = [
      data.role_id,
      data.id
    ];  
    return this.connection
    .promise()
    .query('UPDATE employee SET role_id = ? WHERE id = ?', newEmployeeRole);
  };
};

module.exports = new DB(connection)