DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
PRIMARY KEY (id)
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
PRIMARY KEY (id)
);

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  dep_name VARCHAR(30) NOT NULL, 
  PRIMARY KEY (id)
);

INSERT INTO department (dep_name)
VALUES ("HR"), ("Development"), ("Sales");

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Monkey", "D.Luffy", 1), ("Marshall", "D.Teach", 6);

INSERT INTO role (title, salary, id)
VALUES ("Developer", 100000, 1), ("PM", 80000, 2);


SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;