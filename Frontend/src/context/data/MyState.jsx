import React, { useState } from 'react';
import MyContext from './MyContext.jsx';

const MyState = (props) => {
    // Retrieve mode from localStorage if available, otherwise default to 'light'
    const initialMode = localStorage.getItem('mode') || 'light';
    const [mode, setMode] = useState(initialMode);

    const toggleMode = () => {
        // Toggle mode between light and dark
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);

        // Update body background color based on mode
        document.body.style.backgroundColor = newMode === 'dark' ? 'rgb(17, 24, 39)' : 'white';

        // Save mode to localStorage
        localStorage.setItem('mode', newMode);
    }

    return (
        <MyContext.Provider value={{ mode, toggleMode }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyState;
