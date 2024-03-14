import React from 'react'

const ComplitedTask = () => {

    const tasks = [
        { id: 1, task: 'Close deal Emily' },
        { id: 2, task: 'Work on shoring up requirements for Phillips project' },
        { id: 3, task: 'Prepare for meeting with Alex' },
    ];

    return (
        <div className='md:w-3/5'>
            <h1 className="text-2xl font-bold mb-4">Completed Task</h1>
            <ul className="list-none p-4">
                {tasks.map((todo) => (
                    <li key={todo.id} className="border-b border-gray-300 transition-colors duration-300 ease-in-out hover:border-blue-500 py-2 flex justify-between">
                        <div>
                            <span>{todo.task}</span>
                        </div>
                        <span className="text-gray-500">{todo.dueDate}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ComplitedTask