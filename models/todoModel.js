import mongoose from 'mongoose';
const todolistScema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    isComplete: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const TodoList = mongoose.model('todolist', todolistScema);
export default TodoList;
