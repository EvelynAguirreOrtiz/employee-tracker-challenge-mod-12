INSERT INTO department (name)
VALUES 
('Test Department 1')
;

INSERT INTO role (title, salary, department_id)
VALUES
('test title 1', 100000, 1)
;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('testFirstName', 'testLastName', 1, 1)
;