import Todo from '../Schema/ToDo.js';
import mongoose from 'mongoose';

const dueTasks = async (req, res) => {
    try {
        // Find due and upcoming tasks for the authenticated user
        const dueTasks = await Todo.find({
            owner: req.user._id,
            completed: false,
            dueDate: { $gte: new Date() }
        });

        res.status(200).json(dueTasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" }); // Generic error for client
    }
};
const completedTasks = async (req, res) => {
    try {
        // Calculate yesterday's date
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        // Find completed tasks for the authenticated user
        const completedTasks = await Todo.find({
            owner: req.user._id, // Use user ID from req.user object
            $or: [
                { completed: true }, // Include completed tasks
                { dueDate: { $lte: yesterday } } // Include tasks with due date on or before yesterday
            ]
        });

        res.status(200).json(completedTasks);  // Send response with completed tasks
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Internal Server Error" }); // Generic error for client
    }
};

const getSingleTask = async (req, res) => {
    const id = req.params.id;
    try {
        const task = await Todo.findById(id);
        if (!task) {
            throw new Error("Task not found")
        }
        res.status(200).json(task); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const addtask = async (req, res) => {
    const { title, description, dueDate } = req.body;
    try {
        // Check if required fields are missing in the request body
        if (!title || !description || !dueDate) {
            throw new Error('Title, description, and due date are required fields.');
        }

        // Validate the dueDate field
        const now = new Date();
        if (new Date(dueDate) <= now) {
            throw new Error('Due date must be in the future.');
        };

        const todo = new Todo({
            title,
            description,
            dueDate,
            owner: req.user._id
        });


        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const editTask = async (req, res) => {
    const { title, description, dueDate } = req.body;
    const { taskId } = req.params;

    try {
        // Check if required fields are missing in the request body
        if (!title && !description && !dueDate) {
            throw new Error('At least one field to update is required.');
        }

        // Validate the dueDate field if provided
        if (dueDate) {
            const now = new Date();
            if (new Date(dueDate) <= now) {
                throw new Error('Due date must be in the future.');
            }
        }

        // Find the task by id and check if the user is the owner
        const task = await Todo.findById(taskId);
        if (!task) {
            throw new Error('Task not found.');
        }
        if (task.owner.toString() !== req.user._id.toString()) {
            throw new Error('You are not authorized to edit this task.');
        }

        // Update the task with the provided fields
        if (title) {
            task.title = title;
        }
        if (description) {
            task.description = description;
        }
        if (dueDate) {
            task.dueDate = dueDate;
        }

        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const removeTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        // Check if taskId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            throw new Error('Invalid task ID.');
        }

        // Find the task by ID and owner
        const task = await Todo.findOne({ _id: taskId, owner: req.user._id });

        // Check if task exists
        if (!task) {
            throw new Error('Task not found..');
        }

        // Update the completed field to true
        task.completed = true;
        await task.save();

        res.status(200).json({ message: 'Task completed successfully.' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};



export { addtask, editTask, removeTask, dueTasks, completedTasks, getSingleTask };