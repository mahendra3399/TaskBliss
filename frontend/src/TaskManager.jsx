import React, { useEffect, useState } from 'react';
import { FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { CreateTask, DeleteTaskById, GetAllTasks, UpdateTask } from './api';
import { notify } from './utils.jsx';
import LogoutButton from "./LogOutButton.jsx";

const TaskManager = () => {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [copyTasks, setCopyTasks] = useState([]);
  const [updateTask, setUpdateTask] = useState(null);

  const fetchAllTasks = async () => {
    try {
      const { data, success, message } = await GetAllTasks();
      if (success) {
        setTasks(data);
        setCopyTasks(data);
      } else {
        notify(message, 'error');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      notify('Failed to fetch tasks', 'error');
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const handleTask = async () => {
    if (updateTask && input) {
      // Update task
      const obj = {
        taskName: input,
        isDone: updateTask.isDone,
        _id: updateTask._id
      };
      await handleUpdateItem(obj);
      setInput('');
      setUpdateTask(null);
    } else if (updateTask == null && input) {
      // Create new task
      await handleCreateTask();
      setInput('');
    }
  };

  const handleCreateTask = async () => {
    try {
      const { success, message, data } = await CreateTask({ taskName: input, isDone: false });
      if (success) {
        setTasks([...tasks, data]);
        setCopyTasks([...tasks, data]);
        notify(message, 'success');
      } else {
        notify(message, 'error');
      }
    } catch (error) {
      console.error('Error creating task:', error);
      notify('Failed to create task', 'error');
    }
  };

  const handleUpdateItem = async (item) => {
    try {
      const { success, message, data } = await UpdateTask(item._id, item);
      if (success) {
        setTasks(tasks.map(task => (task._id === item._id ? data : task)));
        setCopyTasks(tasks.map(task => (task._id === item._id ? data : task)));
        notify(message, 'success');
      } else {
        notify(message, 'error');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      notify('Failed to update task', 'error');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const { success, message } = await DeleteTaskById(id);
      if (success) {
        setTasks(tasks.filter(task => task._id !== id));
        setCopyTasks(tasks.filter(task => task._id !== id));
        notify(message, 'success');
      } else {
        notify(message, 'error');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      notify('Failed to delete task', 'error');
    }
  };

  const handleCheckAndUncheck = async (item) => {
    const obj = {
      ...item,
      isDone: !item.isDone
    };
    await handleUpdateItem(obj);
  };

  const handleEditTask = (task) => {
    setInput(task.taskName);
    setUpdateTask(task);
  };

  return (
    <div className="container">
      <ToastContainer />
      <LogoutButton />
      <h1 className="text-center my-4">Task Manager</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleTask}>
          {updateTask ? <FaPencilAlt /> : <FaPlus />}
        </button>
      </div>
      <ul className="list-group">
        {tasks.map(task => (
          <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
            <span className={task.isDone ? 'completed' : ''}>{task.taskName}</span>
            <div>
              <button className="btn btn-success me-2" onClick={() => handleCheckAndUncheck(task)}>
                <FaCheck />
              </button>
              <button className="btn btn-warning me-2" onClick={() => handleEditTask(task)}>
                <FaPencilAlt />
              </button>
              <button className="btn btn-danger" onClick={() => handleDeleteTask(task._id)}>
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;