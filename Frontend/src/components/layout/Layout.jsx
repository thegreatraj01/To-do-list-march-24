import React, { useContext } from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer';
import myContext from '../../context/data/myContext';

const Layout = ({ children }) => {
    const context = useContext(myContext);
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