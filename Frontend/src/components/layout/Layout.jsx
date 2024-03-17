import React, { useContext } from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer';
import Mycontext from '../../context/data/Mycontext';

const Layout = ({ children }) => {
    const context = useContext(Mycontext);
    const { mode } = context;


    return (
        <div>
            <Navbar />
            <div className='content' style={{ backgroundColor: mode === 'dark' ? 'rgb(40, 44, 52)' : '', color: mode === 'dark' ? 'white' : '', minHeight: '78vh' }}>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout