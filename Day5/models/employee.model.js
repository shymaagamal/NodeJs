import process from 'node:process';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  fullname:
  {type: String, required: [true, 'Username is required'], minLength: 8, maxLength: 15, trim: true},
  dob: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters']
  },
  title: {type: String, required: true},
  department: {type: String, required: true},
  email:
  {type: String, required: [true, 'Email is required'], validate: {
    validator: (value) => {
      return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    },
    message: ' is not a valid email address'
  }},
  phone: {type: String, required: true},
  yearsOfExperience:
  {type: Number, required: true, default: 0},
  token: {type: String}
}, {timestamps: true});

employeeSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});
employeeSchema.pre('findOneAndUpdate', function (next) {
  const updatedData = this.getUpdate();
  if (updatedData.$set.password) {
    try {
      const hashedPassword = bcrypt.hashSync(updatedData.$set.password, 10);
      updatedData.password = hashedPassword;
      this.setUpdate(updatedData);
    } catch (err) {
      return next(err);
    }
  }
  next();
});
employeeSchema.methods.comparePassowrds = function (password) {
  return bcrypt.compareSync(password, this.password);
};
export const employeeModel = mongoose.model('Employee', employeeSchema);
