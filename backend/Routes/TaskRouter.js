import { createTask, fetchAllTasks, updateTaskById, deleteTaskById } from '../controllers/TaskController.js';
import express from 'express';
import ensureAuthenticated from '../Middlewares/Auth.js';

const router = express.Router();

router.get('/', fetchAllTasks);

router.post('/',  createTask);

router.put('/:id',  updateTaskById);

router.delete('/:id', deleteTaskById);

export default router;
