import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true,
    validate: {
      validator: (value) => value > Date.now(),
      message: 'Due date must be in the future'
    }
  },
  completedDate: {
    type: Date
  },
  completed: {
    type: Boolean,
    default: false
  },
  missed: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

}, { timestamps: true });


const Todo = mongoose.model('Todo', todoSchema);
export default Todo;
