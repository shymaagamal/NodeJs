import express from 'express';
import {validationResult} from 'express-validator';
import {AddEmployee, DeleteEmployee, getEmployeeLeaves, getEmployee, loginEmployee, UpdateEmployeeData} from '../controller/CRUD_employees.js';

import {employeePatchValidation, employeeValidation} from '../middlewares/employee_validation.js';
import {verifyToken} from '../utils/helper.js';

const router = express.Router();

router.use(express.json());
router.post('/login', async (req, res, next) => {
  try {
    const {id, password} = req.body;
    if (!id || !password) {
      const error = new Error('Employee id and password are required to login ');
      error.status = 404;
      throw error;
    }
    const loginEmp = await loginEmployee(id, password, next);
    res.status(200).json({message: 'Employee  login', employee: loginEmp});
  } catch (err) {
    next(err);
  }
});
router.post('/register', employeeValidation, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    const addedEmployee = await AddEmployee(req, res);
    console.log('Added Employee:', addedEmployee);
    if (!addedEmployee) {
      const error = new Error('Employee is not added ');
      error.status = 404;
      throw error;
    }
    res.status(200).json({message: 'Employee  aadded', employee: addedEmployee});
  } catch (err) {
    next(err);
  }
});

router.get('/', verifyToken, async (req, res, next) => {
  try {

      const error = new Error('You Dont have Access on this resource');
      error.status = 404;
      throw error;

  } catch (err) {
    next(err);
  }
});
router.get('/:id', verifyToken, async (req, res, next) => {
  try {
    const id=req.params.id;
    if (req.employee.id !== id) {
      return res.status(403).json({ message: "Access denied" });
    }
    const employeeData=await getEmployee(id);
    console.log(employeeData);
 
 
    res.status(200).json({message: 'Emloyee data', employeeData});
  } catch (err) {
    next(err);
  }
});
router.get('/:id/leaves',verifyToken , async (req, res, next) => {
  try {
    const id = req.params.id;
    if (req.employee.id !== id) {
      return res.status(403).json({ message: "Access denied" });
    }
    const query = req.query;
    const employeeLeaves = await getEmployeeLeaves(id, query,next);
    if (!employeeLeaves) {
      const error = new Error(`There is no leaves for Employee with id=> ${id}`);
      error.status = 404;
      throw error;
    }
    res.status(200).json({message: 'All Emloyeeleaves', employeeLeaves});
  } catch (err) {
    next(err);
  }
});

router.delete('/:id',verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    if (req.employee.id !== id) {
      const error = new Error( "Access denied" );
      error.status = 403;
      throw error;
    }
    else{
      const error = new Error( "you are not allowed to delete yourself" );
      error.status = 403;
      throw error;
    }
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', verifyToken ,employeePatchValidation, async (req, res, next) => {
  try {
    const id = req.params.id;
    if (req.employee.id !== id) {
      return res.status(403).json({ message: "Access denied" });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    const UpdatedEmployee = await UpdateEmployeeData(id, req);
    if (!UpdatedEmployee) {
      const error = new Error('Employee is not Updataed');
      error.status = 404;
      throw error;
    }
    res.status(200).json({message: 'Employee  Updated', employee: UpdatedEmployee});
  } catch (err) {
    next(err);
  }
});

export default router;
