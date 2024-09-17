

import React from 'react';
import '../../assets/style/DashLeftnav.css';

const Button = ({ type, onClick, children }) => {
    return (
        <button 
            className={`btn ${type === 'primary' ? 'btn-primary' : 
                          type === 'secondary' ? 'btn-secondary' : 
                          type === 'danger' ? 'btn-danger' : 
                          'btn-default'}`} 
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
