import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

function AddTaskModal({ isOpen, mode, closeModal }) {
    return (
        <div className=' relative z-10'>
            {isOpen && (
                <div className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-opacity-50' >
                    <div className='p-10 rounded-xl relative' style={{
                        backgroundColor: mode === 'dark' ? 'rgb(50, 50, 50)' : '#E5E7EB', color: mode === 'dark' ? 'white' : 'black'
                    }}>
                        <div className="">
                            <h1 className='text-center text-white text-xl mb-4 font-bold' style={{ color: mode === 'dark' ? 'white' : 'black' }}>Add Task</h1>
                            <button onClick={closeModal} className='absolute top-0 right-0 m-4 text-red-600 hover:text-gray-400 bg-slate-300 rounded-full p-1'>
                                <AiOutlineClose size={20} />
                            </button>
                        </div>
                        <div>
                            <input type="text"
                                name='title'
                                className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg  outline-none'
                                placeholder='title'
                                style={{ backgroundColor: mode === 'dark' ? 'rgb(40, 40, 40)' : 'rgb(240, 240, 240)', color: mode === 'dark' ? 'white' : 'black' }}
                            />
                        </div>
                        <div>
                            <textarea cols="25" rows="8" name='description'
                                className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white outline-none'
                                placeholder='description'
                                style={{ backgroundColor: mode === 'dark' ? 'rgb(40, 40, 40)' : 'rgb(240, 240, 240)', color: mode === 'dark' ? 'white' : 'black' }}
                            >

                            </textarea>
                        </div>
                        <div>
                            <input type="date"
                                name='dueDate'
                                className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em]rounded-lg text-white outline-none'
                                placeholder='due date'
                                style={{ backgroundColor: mode === 'dark' ? 'rgb(40, 40, 40)' : 'rgb(240, 240, 240)', color: mode === 'dark' ? 'white' : 'black' }}
                            />
                        </div>
                        <div className=' flex justify-center mb-3'>
                            <button
                                onClick={closeModal}
                                className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'
                                style={{ backgroundColor: mode === 'dark' ? 'rgb(255, 165, 0)' : 'rgb(255, 165, 0)', color: mode === 'dark' ? 'white' : 'black' }}>
                                Add Task
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddTaskModal