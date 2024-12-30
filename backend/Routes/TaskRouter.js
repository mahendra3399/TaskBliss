import { createTask, fetchAllTasks, updateTaskById, deleteTaskById } from '../controllers/TaskController.js';
import express from 'express';
import ensureAuthenticated from '../Middlewares/Auth.js';

const router = express.Router();

router.get('/', ensureAuthenticated, fetchAllTasks);

router.post('/', ensureAuthenticated, createTask);

router.put('/:id', ensureAuthenticated, updateTaskById);

router.delete('/:id', ensureAuthenticated, deleteTaskById);

export default router;
