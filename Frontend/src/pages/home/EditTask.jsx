import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';
import { toast, Bounce } from 'react-toastify';

const EditTask = ({ isOpen, closeModal, mode, id }) => {
    const [taskData, setTaskData] = useState({ title: '', description: '', dueDate: '' });
    const [error, setError] = useState(null);
    // console.log(id);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({ ...taskData, [name]: value });
    };

    const url = import.meta.env.VITE_REACT_APP_API_URL;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
    };

    useEffect(() => {
        setError(null);
        const getSingleTask = async () => {
            try {
                const response = await axios.get(`${url}/getSingleTask/${id}`, config)
                setTaskData(response.data); // Assuming response.data contains task information
            } catch (error) {
                console.error(error);
            }
        };
        if (isOpen && id) {
            getSingleTask();
        }
    }, [isOpen, id]); // Dependency array to trigger useEffect on isOpen or id change

    const handleEditTask = async () => {
        try {
            const response = await axios.put(`${url}/editTask/${id}`, taskData, config);
            // console.log(response);
            if (response.status === 200) {
                closeModal();
                setTaskData({ title: '', description: '', dueDate: '' });
                toast.success('🦄 Task Edited sucessfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        } catch (error) {
            console.error(error);
            setError("Failed to Edit Task"); // Set error state if adding task fails
        }
    };

    return (
        <div className='relative z-10'>
            {isOpen && (
                <div className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-opacity-50'>
                    <div className='p-10 rounded-xl relative' style={{ backgroundColor: mode === 'dark' ? 'rgb(50, 50, 50)' : '#E5E7EB', color: mode === 'dark' ? 'white' : 'black' }}>
                        <div className="">
                            <h1 className='text-center text-white text-xl mb-4 font-bold' style={{ color: mode === 'dark' ? 'white' : 'black' }}>Edit Task</h1>
                            <button onClick={closeModal} className='absolute top-0 right-0 m-4 text-red-600 hover:text-gray-400 bg-slate-300 rounded-full p-1'>
                                <AiOutlineClose size={20} />
                            </button>
                        </div>
                        {error && <div className="text-red-500">{error}</div>}
                        <div>
                            <input type="text"
                                name='title'
                                value={taskData.title}
                                onChange={handleChange}
                                className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg outline-none'
                                placeholder='Title'
                                style={{ backgroundColor: mode === 'dark' ? 'rgb(40, 40, 40)' : 'rgb(240, 240, 240)', color: mode === 'dark' ? 'white' : 'black' }}
                            />
                        </div>
                        <div>
                            <textarea cols="25" rows="8" name='description'
                                value={taskData.description}
                                onChange={handleChange}
                                className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white outline-none'
                                placeholder='Description'
                                style={{ backgroundColor: mode === 'dark' ? 'rgb(40, 40, 40)' : 'rgb(240, 240, 240)', color: mode === 'dark' ? 'white' : 'black' }}
                            />
                        </div>
                        <div>
                            <input type="date"
                                name='dueDate'
                                value={taskData.dueDate.split('T')[0]}
                                onChange={handleChange}
                                className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white outline-none'
                                placeholder='Due Date'
                                style={{ backgroundColor: mode === 'dark' ? 'rgb(40, 40, 40)' : 'rgb(240, 240, 240)', color: mode === 'dark' ? 'white' : 'black' }}
                            />
                        </div>
                        <div className='flex justify-center mb-3'>
                            <button
                                onClick={handleEditTask}
                                className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg'
                                style={{ backgroundColor: mode === 'dark' ? 'rgb(255, 165, 0)' : 'rgb(255, 165, 0)', color: mode === 'dark' ? 'white' : 'black' }}>
                                Edit Task
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditTask;
