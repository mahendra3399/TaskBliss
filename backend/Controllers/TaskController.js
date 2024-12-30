import TaskModel from '../Models/TaskModel.js';

export const createTask = async (req, res) => {
    const data = req.body;
    data.user = req.user._id; // Associate task with the logged-in user
    try {
        const model = new TaskModel(data);
        await model.save();
        res.status(201).json({ message: 'Task created successfully', success: true });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create task', success: false });
    }
};

export const fetchAllTasks = async (req, res) => {
    try {
        const data = await TaskModel.find({ user: req.user._id }); // Fetch tasks for the logged-in user
        res.status(200).json({ message: 'All Tasks', success: true, data });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch all tasks', success: false });
    }
};

export const updateTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const obj = { $set: { ...body } };
        const updatedTask = await TaskModel.findOneAndUpdate({ _id: id, user: req.user._id }, obj, { new: true }); // Ensure task belongs to the user

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task Updated', task: updatedTask, success: true });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Failed to update task', error: error.message, success: false });
    }
};

export const deleteTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedTask = await TaskModel.findOneAndDelete({ _id: id, user: req.user._id }); // Ensure task belongs to the user
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task Deleted', success: true });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete task', success: false });
    }
};

export default {
    createTask,
    fetchAllTasks,
    updateTaskById,
    deleteTaskById
};