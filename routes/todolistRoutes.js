import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  createTodo,
  getTodoList,
  removeTodo,
  updateTodo,
} from '../controllers/todolistController.js';
const router = express.Router();
router.post('/createtodo', protect, createTodo);
router.get('/gettodo', getTodoList);
router.delete('/removetodo/:id', protect, removeTodo);
router.put('/updatetodo/:id', protect, updateTodo);
export default router;
