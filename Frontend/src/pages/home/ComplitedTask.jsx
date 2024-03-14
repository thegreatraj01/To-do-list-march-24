import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ComplitedTask = () => {

    const [tasks, settasks] = useState([]);
    const url = import.meta.env.VITE_REACT_APP_API_URL;

    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    };

    const getCompleteTask = async () => {
        try {
            const response = await axios.get(`${url}/complitedtasks`, config);
            if (response.status === 200) {
                settasks(response.data);
            } else {
                console.error(`Request failed with status: ${response.status}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCompleteTask();
    }, []);


    return (
        <div className='md:w-3/5'>
            <h1 className="text-2xl font-bold mb-4">Completed Task</h1>
            <ul className="list-none p-4">
                {tasks.map((todo) => (
                    <li key={todo._id} className="border-b border-gray-300 transition-colors duration-300 ease-in-out hover:border-blue-500 py-2 flex justify-between">
                        <div>
                            <span>{todo.title}</span>
                        </div>
                        <span className="text-gray-500">{todo.dueDate.split("T")[0]}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ComplitedTask