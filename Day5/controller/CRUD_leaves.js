import mongoose from 'mongoose';
import {employeeModel} from '../models/employee.model.js';
import {leaveModel} from '../models/leaves.model.js';

export const createLeave = async (empId,leaveData,next) => {
  try{
    if(leaveData.employeeId !==empId) 
    {
      const error=new Error("you are not allowed to add leaves for another employees");
      error.status=404;
      throw error
    }
  const checkEmployee= await employeeModel.find({_id:empId});
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
export const getLeave=async (id)=>{
  let leave = await leaveModel.findById({_id: id});
  return leave.employeeId;
};
