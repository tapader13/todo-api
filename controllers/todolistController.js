import asyncHandler from 'express-async-handler';
import TodoList from '../models/todoModel.js';
//@ post
//@ api/users/createtodo
//@ private
const createTodo = asyncHandler(async (req, res) => {
  const { title, description, date, category, isComplete } = req.body;
  const newtodo = await TodoList.create({
    title,
    description,
    date,
    category,
    isComplete,
  });
  if (newtodo) {
    res.status(200).json({
      message: 'todo create successfully',
    });
  } else {
    res.status(400);
    throw new Error('invalid todo to store');
  }
});
//@ get
//@ api/users/gettodo
//@ public
const getTodoList = asyncHandler(async (req, res) => {
  const { _limit, _page, _sort } = req.query;
  const limit = parseInt(_limit) || 5;
  const page = parseInt(_page) || 1;
  const skip = (page - 1) * limit;
  const todo = await TodoList.find({}).sort(_sort).skip(skip).limit(limit);
  if (todo) {
    res.status(200).json({ todo });
  } else {
    res.status(400);
    throw new Error('no todolist found');
  }
});
//@ delete
//@ api/users/removetodo
//@ private
const removeTodo = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const todo = await TodoList.findByIdAndDelete(id);
  if (todo) {
    res.status(200).json({ message: `todolist ${id} deleted` });
  } else {
    res.status(400);
    throw new Error('no todolist found');
  }
});

//@ put
//@ api/users/updatetodo
//@ private
const updateTodo = asyncHandler(async (req, res) => {
  const { title, description, date, category, isComplete } = req.body;
  const id = req.params.id;
  const todo = await TodoList.findById(id);
  if (todo) {
    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.date = date || todo.date;
    todo.category = category || todo.category;
    if (isComplete !== undefined) todo.isComplete = isComplete;
    const updatetodo = await todo.save();
    res.status(200).json(updatetodo);
  } else {
    res.status(400);
    throw new Error('no todolist found');
  }
});
export { createTodo, getTodoList, removeTodo, updateTodo };
