import express from 'express';
import {validationResult} from 'express-validator';
import {AddEmployee, DeleteEmployee, ListAllEmployees, UpdateEmployeeData,getEmployeeLeaves} from '../controller/CRUD_employees.js';

import {employeeValidation,employeePatchValidation} from '../middlewares/employee_validation.js';

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res, next) => {
  console.log(req.body);
  try {
    const employees = await ListAllEmployees();
    if (!employees) {
      const error = new Error('Employees not found');
      error.status = 404;
      throw error;
    }

    res.status(200).json(employees);
  } catch (err) {
    next(err);
  }
});
router.get('/:id/leaves',async(req,res,next)=>{
  try{
  const id=req.params.id;
  const query=req.query;
  const employeeLeaves=await  getEmployeeLeaves(id,query);
  if(!employeeLeaves)
  {
    const error = new Error(`There is no leaves for Employee with id=> ${id}`);
    error.status = 404;
    throw error;

  }
  res.status(200).json({message: 'All Emloyeeleaves', employeeLeaves});
}catch(err)
{
  next(err);
}

});


router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedEmployee = await DeleteEmployee(id);
    if (!deletedEmployee) {
      const error = new Error(`employee that has ${id} is not found`);
      error.status = 404;
      throw error;
    }
    res.status(200).json({message: 'Employee deleted', deletedEmployee});
  } catch (err) {
    next(err);
  }
});

router.post('/', employeeValidation, async (req, res, next) => {
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
router.patch('/:id', employeePatchValidation, async (req, res, next) => {
  try {
    const id = req.params.id;
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
