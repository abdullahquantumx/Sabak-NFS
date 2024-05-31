"use client";

// components/TaskList.js
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '@/context/userContext';

const TaskList = () => {
  const { user } = useContext(UserContext);

  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`/api/users/${user?._id}/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Failed to fetch tasks.');
      }
    };

    fetchTasks();
  }, []);

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Task List</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="border-b border-gray-200 py-4 flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">{task.title}</p>
              <p className="text-gray-600">{task.description}</p>
            </div>
            <button onClick={() => handleDeleteTask(task._id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
