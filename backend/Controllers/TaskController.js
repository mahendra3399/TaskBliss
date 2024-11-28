const TaskModel = require('../Models/TaskModel.js');

const createTask = async (req,res)=> {
    const data = req.body;
    try {
        const model = new TaskModel(data);
        await model.save();
        res.status(201).json({message: 'Task created succesfully', success: true})
    } catch (error) {
        res.status(500).json({message: 'Failed to create task', success: false});
    }
}

const fetchAllTasks = async (req,res)=> {
    try {
        const data = await TaskModel.find({});
        res.status(200)
            .json({ message: 'All Tasks', success: true, data });
    } catch (error) {
        res.status(500).json({message: 'failed to fetch all tasks', success: false})
    }
}

const updateTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const obj = { $set: { ...body } };
        const updatedTask = await TaskModel.findByIdAndUpdate(id, obj, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task Updated', task: updatedTask, success: true });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Failed to update task', error: error.message, success: false });
    }
};



const deleteTaskById = async (req,res)=> {
    try {
        const id = req.params.id;
        await TaskModel.findByIdAndDelete(id);
        res.status(200).json({message: 'Task Deleted', success: true});
    } catch (error) {
        res.status(500).json({message: 'Failed to delete task', success: false});
    }
}

module.exports = {
    createTask,
    fetchAllTasks,
    updateTaskById,
    deleteTaskById
}