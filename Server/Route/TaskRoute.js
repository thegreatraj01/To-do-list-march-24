import express from 'express';
const router = express.Router();
import protect from '../milldeware/AuthUser.js';
import { addtask, removeTask, editTask, dueTasks, completedTasks, getSingleTask } from '../Controlar/TaskControllar.js';


router.get('/tasks', protect, dueTasks);
router.get('/complitedtasks', protect, completedTasks);
router.get('/getSingleTask/:id' , protect, getSingleTask);
router.post('/addtask', protect, addtask);
router.put('/updatetask/:taskId', protect, editTask);
router.delete('/remove/:id', removeTask);

export default router;