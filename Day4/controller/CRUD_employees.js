import bcrypt from 'bcrypt';
import {employeeModel} from '../models/employee.model.js';
import {leaveModel} from '../models/leaves.model.js';

export const AddEmployee = async (req, res) => {
  const employee = req.body;
  const Addedemployee = await employeeModel.insertOne(employee);

  return Addedemployee;
};
export const ListAllEmployees = async () => {
  const AllEmployees = await employeeModel.find({}, {password: 0, __v: 0, createdAt: 0, updatedAt: 0});
  return AllEmployees;
};
export const DeleteEmployee = async (id) => {
  const deletedEmployee = await employeeModel.findOneAndDelete({_id: id});
  return deletedEmployee;
};

export const UpdateEmployeeData = async (id, req) => {
  const updatedData = req.body;

  const UpdatedEmployee = await employeeModel.findByIdAndUpdate({_id: id}, {$set: updatedData}, {new: true, runValidators: true});
  return UpdatedEmployee;
};

export const getEmployeeLeaves= async (id,query)=>{
  const filter = { employeeId: id };
  if (query && query.status) {
    filter.status = query.status;
  }
  const employeeLeaves = await leaveModel.find(filter);
  return employeeLeaves;
  
}
