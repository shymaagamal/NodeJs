import mongoose from 'mongoose';
import {employeeModel} from '../models/employee.model.js';
import {leaveModel} from '../models/leaves.model.js';

export const createLeave = async (leaveData,next) => {
  try{

  const employeeId=leaveData.employeeId;
  const checkEmployee= await employeeModel.find({_id:employeeId});
  console.log(checkEmployee)
  if(checkEmployee.length === 0){
    const error=new Error("you add leave for Employee is not exist");
    error.status=404;
    throw error
  }
  const AddedLeave = await leaveModel.insertOne(leaveData);

  return AddedLeave;
  }catch(err)
  {
    next(err);
  }
};
export const UpdateLeave = async (id, dataToUpdate) => {
  let UpdatedLeave = await leaveModel.findByIdAndUpdate({_id: id},{$set: dataToUpdate}, {new: true, runValidators: true});
  return UpdatedLeave;
};
export const getAllLeaves = async (filter, next) => {
  let {limit, skip, ...rest} = filter;
  limit = filter.limit || 10;
  skip = filter.skip || 0;

  const Leaves = await leaveModel.find(rest).limit(limit).skip(skip);

  try {
    const employeeLeaves = [];
    for (const leave of Leaves) {
      const employee = await employeeModel.findById({_id: leave.employeeId});
      if (!employee) {
        const error = new Error('this leave has an employee doesnt exist in employees database');
        error.status = 404;
        throw error;
      }
      employeeLeaves.push({employeeName: employee.fullname, leave});
    };
    return employeeLeaves;
  } catch (err) {
    next(err);
  };
};
