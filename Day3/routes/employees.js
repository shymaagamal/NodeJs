import express from 'express';
import {AddUser, DeleteEmployeeData, EditEmployeeData, ListAllEmployees, ListEmployeeUsingID} from '../controller/CRUD.js';

export const employeesRouter = express.Router();

employeesRouter.use(express.json());

employeesRouter.get('/', (req, res) => {
  debugger;
  const employees = ListAllEmployees();
  if (employees.status === 404) {
    res.status(employees.status).send(employees.error);
  }

  res.status(employees.status).render('index', {employees: employees.employees});
});

employeesRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  //   const q = req.query;
  const employee = ListEmployeeUsingID(id);
  if (employee.status === 404) {
    res.status(employee.status).send(employee.error);
  }
  res.status(employee.status).send(employee.employee);
});

employeesRouter.post('/', (req, res) => {
  const employee = req.body;
  const newEmployee = AddUser(employee);
  console.log(newEmployee.employee);
  if (newEmployee.status === 404) {
    res.status(newEmployee.status).send(newEmployee.error);
  }
  res.status(newEmployee.status).send(newEmployee.employee);
});
employeesRouter.delete('/:id', (req, res) => {
  const id = req.params.id;
  const deletedEmployee = DeleteEmployeeData(id);
  if (deletedEmployee.status === 404) {
    res.status(deletedEmployee.status).send(deletedEmployee.error);
  }
  res.status(deletedEmployee.status).send(deletedEmployee.employee);
});
employeesRouter.patch('/:id', (req, res) => {
  const UpdatedEmployeeFields = req.body;
  const Employeeid = req.params.id;
  const UpdatedEmployee = EditEmployeeData(Employeeid, UpdatedEmployeeFields);
  if (UpdatedEmployee.status === 404) {
    res.status(UpdatedEmployee.status).send(UpdatedEmployee.error);
  }

  res.status(UpdatedEmployee.status).send(UpdatedEmployee.employee);
});
