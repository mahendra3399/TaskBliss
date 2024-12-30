import mongoose from 'mongoose';

const { Schema } = mongoose;

const TaskSchema = new Schema({
    taskName: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        required: true
    }
});

const TaskModel = mongoose.model('tasks', TaskSchema);

export default TaskModel;
