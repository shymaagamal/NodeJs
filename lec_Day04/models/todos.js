import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  }
});

const Todos = mongoose.model('Todos', todoSchema);

export default Todos;
