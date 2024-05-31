"use client";

import { useState, useContext } from 'react';
import Image from 'next/image';
import axios from 'axios';
import UserContext from '@/context/userContext';


const TaskForm = () => {


    const { user } = useContext(UserContext);


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/tasks', {
                title,
                description,
                userId: user?._id  // Example ObjectId of an existing user
            });
            console.log(user);

            if (res.status === 201) {
                setTitle('');
                setDescription('');
                setError('');
                setSuccess('Task added successfully!');
            } else {
                setSuccess('');
                setError(res.data.error || 'Failed to add task.');
            }
        } catch (error) {
            console.log(error);
            setSuccess('');
            setError(error.response?.data?.error || 'Failed to add task.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
            <Image
                src="/undraw_Add_tasks_re_s5yj.png"
                alt="Add Task Illustration"
                width={500}
                height={400}
            />
            <h2 className="text-2xl font-bold mb-4">Add Task</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;
