import mongoose from 'mongoose';

const leavesSchema = new mongoose.Schema({
  employeeId:
    {type: String, required: [true, 'Employee ID is required']},
  empBukupId:
  {type: String, required: [true, 'Backup employee ID is required']}, // (id of colleague who will cover work during the leave) Shouldn’t be the same as empId
  leaveType: {
    type: String,
    required: [true, 'Leave type is required'],
    enum: {
      values: ['annual', 'casual', 'sick'],
      message: 'Leave type must be either annual, casual, or sick'
    }
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [1, 'Duration must be a positive number']
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ['inprogress', 'cancelled', 'ended'],
      message: 'Status must be inprogress, cancelled, or ended'
    },
    default: 'inprogress'
  }
}, {timestamps: true});

export const leaveModel = mongoose.model('Leave', leavesSchema);
