import React from 'react'
import { useState } from 'react';
import { SidebarData } from '../../Data/Data';
import Logo from '../../imgs/logo.png'
import './Sidebar.css'


function Sidebar() {

    const [selected , setSelected] = useState(0);
    return (
        <div className="Sidebar">
            <div className="logo">
                <img src={Logo} alt="" />              
            </div>

            <div classhName="menu">
                {SidebarData.map((item , index) => {
                    return(
                        <div className={selected===index?'menuItem active':'menuItem'}
                            key={index}
                            onClick={()=>setSelected(index)}
                        >
                            <item.icon/>
                            <span>
                                {item.heading}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Sidebar