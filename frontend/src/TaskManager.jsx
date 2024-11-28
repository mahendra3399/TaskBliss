import React, { useEffect, useState } from 'react';
import { FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { CreateTask, DeleteTaskById, GetAllTasks } from './api';
import { notify } from './utils';

const TaskManager = () => {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [copyTasks, setCopyTasks] = useState([]);

  const handleAddTask = async () => {
    const obj = {
      taskName: input,
      isDone: false,
    };
    try {
      const { success, message } = await CreateTask(obj);
      if (success) {
        // Show success toast
        notify(message, 'success');
      } else {
        // Show error toast
        notify(message, 'error');
      }
      setInput('');
      fetchAllTasks()
    } catch (error) {
      console.error(error);
      notify('Failed to create task', 'error');
    }
  };

  const fetchAllTasks = async () => {
    try {
      const { data } = await GetAllTasks();
      setTasks(data);
      setCopyTasks(data);
    } catch (error) {
      console.error(error);
      notify('Failed to fetch tasks', 'error');
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const handleDeleteTask = async (id) => {
    try {
      const { success, message } = await DeleteTaskById(id);
      if (success) {
        // Show success toast
        notify(message, 'success');
      } else {
        // Show error toast
        notify(message, 'error');
      }
      fetchAllTasks();
    } catch (error) {
      console.error(error);
      notify('Failed to delete task', 'error');
    }
  };

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-12 col-md-8 col-lg-6'>
          <h1 className='mb-4 text-center'>Task Manager App</h1>

          {/* Input and Search box */}
          <div className='d-flex flex-column flex-md-row justify-content-between align-items-center mb-4'>
            <div className='input-group mb-3 mb-md-0 me-md-2'>
              <input
                type='text'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className='form-control'
                placeholder='Add a new Task'
              />
              <button
                onClick={handleAddTask}
                className='btn btn-success btn-sm'
              >
                <FaPlus />
              </button>
            </div>

            <div className='input-group'>
              <span className='input-group-text'>
                <FaSearch />
              </span>
              <input
                className='form-control'
                type='text'
                placeholder='Search tasks'
              />
            </div>
          </div>

          {/* List of items */}
          <div className='d-flex flex-column'>
            {tasks.map((item) => (
              <div key={item._id} className='m-2 p-2 border bg-light rounded-3 d-flex justify-content-between align-items-center'>
                <span className={item.isDone ? 'text-decoration-line-through' : ''}>{item.taskName}</span>
                <div>
                  <button className='btn btn-success btn-sm me-2' type='button'>
                    <FaCheck />
                  </button>
                  <button className='btn btn-primary btn-sm me-2' type='button'>
                    <FaPencilAlt />
                  </button>
                  <button onClick={() => handleDeleteTask(item._id)} className='btn btn-danger btn-sm me-2' type='button'>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Toastify */}
          <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} />
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
