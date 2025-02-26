import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {validation} from './validations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fullPath = path.join(__dirname, '../employee.json');

export const AddUser = (employee) => {
  const employees = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  const employeeValidator = validation(employee);
  if (employeeValidator.status === 404) {
    return {error: employeeValidator.error, status: 404};
  }
  employee.id = employees.length ? employees[employees.length - 1].id + 1 : 1;
  employees.push(employee);
  fs.writeFileSync(fullPath, JSON.stringify(employees));
  return {employee, status: 200};
};
export const ListAllEmployees = () => {
  const employees = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  if (employees.length === 0) {
    return {error: 'No Employees Found', status: 404};
  }
  return {employees, status: 200};
};

export const ListEmployeeUsingID = (id) => {
  const employees = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

  const employee = employees.find((emp) => emp.id === Number(id));
  if (!employee) {
    return {error: 'Employee is not found', status: 404};
  }

  return {employee, status: 200};
};
export const ListEmployeeUsingFilters = (filters) => {
  const employees = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

  const matchedEmployee = employees.filter((emp) => Object.entries(filters).every((key) => {
    return String(emp[key[0]]) === String(filters[key[0]]);
  }));

  fs.writeSync(1, `${JSON.stringify(matchedEmployee, null, 1)}\n`);
};

export const EditEmployeeData = (id, UpdatedFields) => {
  const employees = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  const employeeIndex = employees.findIndex((emp) => emp.id === Number(id));
  if (employeeIndex === -1) {
    return {error: 'Employee is not found', status: 404};
  } else {
    const editableEmployee = {...employees[employeeIndex], ...UpdatedFields};
    const employeeValidator = validation(editableEmployee);
    if (employeeValidator.status === 404) {
      return {error: employeeValidator.error, status: 404};
    }
    employees[employeeIndex] = editableEmployee;
    fs.writeFileSync(fullPath, JSON.stringify(employees));
    return {employee: employees[employeeIndex], status: 200};
  }
};

export const DeleteEmployeeData = (id) => {
  const employees = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  const filteredEmployees = employees.filter((emp) => emp.id !== Number(id));
  if (filteredEmployees.length === employees.length) {
    return {error: 'Employee is not found', status: 404};
  }
  fs.writeFileSync(fullPath, JSON.stringify(filteredEmployees));
  return {employee: filteredEmployees, status: 200};
};
