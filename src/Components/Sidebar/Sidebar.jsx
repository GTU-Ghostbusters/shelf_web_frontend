import React from 'react'
import Logo from '../../imgs/logo.png'
import './Sidebar.css'

function Sidebar() {
  return (
    <div className="Sidebar">
        <div className="logo">
            <img src={Logo} alt="" />              
        </div>
    </div>
  );
};

export default Sidebar