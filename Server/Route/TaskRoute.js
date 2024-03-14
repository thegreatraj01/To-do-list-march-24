import express from 'express';
const router = express.Router();
import protect from '../milldeware/AuthUser.js';
import { addtask, removeTask, editTask, dueTasks, completedTasks, getSingleTask } from '../Controlar/TaskControllar.js';


router.get('/tasks', protect, dueTasks);
router.get('/complitedtasks', protect, completedTasks);
router.get('/getSingleTask/:id' , protect, getSingleTask);
router.post('/addtask', protect, addtask);
router.put('/editTask/:taskId', protect, editTask);
router.put('/remove/:id',protect, removeTask);

export default router;