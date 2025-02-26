import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true,
    validate: {
      validator(v) {
        return v < new Date();
      },
      message: 'Date of birth must be in the past'
    }
  }
});

userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.set('toJSON', {
  transform: (doc, {__v, password, ...rest}, options) => rest
});

userSchema.methods.comparePasswords = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const Users = mongoose.model('Users', userSchema);
const user = Users.findById('').exec();
user.comparePasswords('password');
export default Users;
