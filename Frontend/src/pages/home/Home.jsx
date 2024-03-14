import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
// import { MdOutlineProductionQuantityLimits, IoReorderFour, FcSalesPerformance } from 'react-icons/all';
// import { Link } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import axios from 'axios';
import ComplitedTask from './ComplitedTask';
import AddTaskModal from './Addproduct';

const Home = () => {

  const context = useContext(myContext);
  const { mode } = context;
  const [path, setPath] = useState('task');

  const url = import.meta.env.VITE_REACT_APP_API_URL;

  

  // for add task model 
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const [tasks, settasks] = useState([]);


  const [quotes, setQuotes] = useState([]);


  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get('https://api.quotable.io/random?minLength=50&maxLength=200');
        setQuotes([response.data]);
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    };

    fetchQuotes();
  }, []);


  return (
    <Layout>
      <div className="flex flex-col sm:flex-col  md:flex-row">
        <div className="left-sidebar bg-slate-100 md:min-h-screen py-3 px-6 md:py-8 w-full sm:w-64" style={{ backgroundColor: mode === 'dark' ? 'rgb(30, 44, 40)' : '', color: mode === 'dark' ? 'white' : '' }}>
          <div className="flex flex-row md:flex-col gap-3">
            <div onClick={() => setPath('task')} className="nav-button-container bg-gray-200 p-3 rounded-lg flex items-center gap-4  hover:bg-blue-200" style={{ backgroundColor: mode === 'dark' ? 'rgb(40, 44, 52)' : '' }}>
              <button style={{ color: mode === 'dark' ? 'white' : '' }} className="nav-button text-gray-800 hover:text-white">My Tasks</button>
            </div>
            <div onClick={openModal} className="nav-button-container bg-gray-200 p-3 rounded-lg flex items-center gap-4  hover:bg-blue-200" style={{ backgroundColor: mode === 'dark' ? 'rgb(40, 44, 52)' : '' }}>
              <button style={{ color: mode === 'dark' ? 'white' : '' }} to='/addtask' className="nav-button text-gray-800 hover:text-white">
                Add Task
              </button>
            </div>
            <div onClick={() => setPath('completed')} style={{ backgroundColor: mode === 'dark' ? 'rgb(40, 44, 52)' : '' }} className="nav-button-container bg-gray-200 p-3 rounded-lg flex items-center gap-4  hover:bg-blue-200">
              {/* <MdOutlineProductionQuantityLimits /> */}
              <button style={{ color: mode === 'dark' ? 'white' : '' }} className="nav-button text-gray-800 hover:text-white">Completed Task</button>
            </div>
          </div>
        </div>

        <div className="flex-1 p-8 sm:p-8 sm:ml-6 flex flex-col md:flex-row  ">
          {path === 'task' && <div className=" md:w-3/5 ">
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>
            <ul className="list-none p-4">
              {tasks.map((todo) => (
                <li key={todo.id} className="border-b border-gray-300 transition-colors duration-300 ease-in-out hover:border-blue-500 py-2 flex justify-between">
                  <div>
                    <input type="radio" className="mr-2" />
                    <span>{todo.task}</span>
                  </div>
                  <span className="text-gray-500">{todo.dueDate}</span>
                </li>
              ))}
            </ul>
          </div>}

          {path === 'completed' && <ComplitedTask />}

          {/* ------------------------ */}
          <div className='md:w-2/5 border-t-4 sm:border-t-0 md:border-0 mt-10 md:mt-0  border-slate-400 '>
            <h1 className="text-2xl font-bold mb-0  md:mb-4 ps-0 pt-5 md:ps-4">Motivation Quotes</h1>
            <ul className="list-none p-4">
              {quotes.map((quote) => (
                <li key={quote._id} className="border-b border-gray-300 transition-colors duration-300 ease-in-out hover:border-blue-500 py-2">
                  <span className="block">{quote.content}</span>
                  <span style={{ color: mode === 'dark' ? '#737678' : '' }} className="text-gray-900 font-bold text-xl">- {quote.author}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      <AddTaskModal isOpen={isOpen} openModal={openModal} closeModal={closeModal} mode={mode} />
    </Layout>
  )
}

export default Home;