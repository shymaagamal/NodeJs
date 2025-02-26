import {employeeModel} from '../models/employee.model.js';
import {leaveModel} from '../models/leaves.model.js';
import {checkPassword, generateJWT} from '../utils/helper.js';

export const AddEmployee = async (req, res) => {
  const employee = req.body;
  const Addedemployee = await employeeModel.insertOne(employee);

  Addedemployee.token = generateJWT({id: Addedemployee._id});

  return Addedemployee;
};
export const getEmployee = async (id) => {
  const Employee = await employeeModel.find({_id:id}, {password: 0, __v: 0, createdAt: 0, updatedAt: 0});
  return Employee;
};
export const DeleteEmployee = async (id,next) => {
  try{

    const deletedEmployee = await employeeModel.findOneAndDelete({_id: id});
    if (!deletedEmployee) {
      const error = new Error('This employee doesn\'t exist');
      error.status = 404;
      throw error;
    }
    const deleteAllLeaveForThisEmployee = await leaveModel.deleteMany({ employeeId: id });
    return deletedEmployee;
  }catch(err)
  {
    next(err);
  }
};

export const UpdateEmployeeData = async (id, req) => {
  const updatedData = req.body;

  const UpdatedEmployee = await employeeModel.findByIdAndUpdate({_id: id}, {$set: updatedData}, {new: true, runValidators: true});
  return UpdatedEmployee;
};

export const getEmployeeLeaves = async (id, query,next) => {
  try{

  const filter = {employeeId: id};
  if (query && query.status) {
    filter.status = query.status;
  }
  const employeeLeaves = await leaveModel.find(filter);
  if(employeeLeaves.length===0)
  {
    const error = new Error('There are no leaves for this employee');
    error.status = 404;
    throw error;
  }
  return employeeLeaves;
}catch(err)
{
  next(err);
}

};

export const loginEmployee = async (id, password, next) => {
  try {
    const employee = await employeeModel.findOne({_id: id});
    if (!employee) {
      const error = new Error('employee doesn\'t exist');
      error.status = 404;
      throw error;
    }
    const matchedPassword = await checkPassword(employee, password);
    if (!matchedPassword) {
      const error = new Error('Password doesn\'t match');
      error.status = 404;
      throw error;
    }

    employee.token = generateJWT({id: employee._id});

    return employee;
  } catch (err) {
    next(err);
  }
};
