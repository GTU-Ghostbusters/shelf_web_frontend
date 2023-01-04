import React from 'react'
import { useState } from 'react'
import './AccountPage.css'
import axios from "axios";
import { useEffect } from 'react';
import { useRef } from 'react';

const AccountPage = () => {

    const [admin , setAdmin] = useState([]);
    
    const [isOpen , setIsOpen] = useState(0);
    const infoNameRef  = useRef();
    const infoPassRef1 = useRef();
    const infoPassRef2 = useRef();
    const infoMailRef  = useRef();
    
    
    useEffect( () => {
        axios
        .get(`https://hodikids.com/api/users`)
        .then((res) => 
        setAdmin(res.data[2]))
    },[])

    

    return (    
        <div>
            <div className="info">
                {(() => {
                    switch(isOpen){
                        case 0:
                            return  <div>
                                        <pre>
                                            Name        : 
                                            {admin.name}
                                        </pre>
                                        {/* <pre>
                                            Password    :
                                            {admin.password}
                                        </pre> */}
                                        <pre>
                                            E-mail      :
                                            {admin.email}
                                        </pre>
                                            <button onClick={ () => {setIsOpen(1)}}>set</button>
                                        </div>
                        case 1:
                            return  <div>
                                        <pre>
                                            Name          : 
                                            <input ref={infoNameRef}></input>
                                        </pre>
                                        <pre>
                                            Password      :
                                            <input ref={infoPassRef1} type="password"></input>
                                        </pre>
                                        <pre>
                                            Password again:
                                            <input ref={infoPassRef2} type="password"></input>
                                        </pre>
                                        <pre>
                                            E-mail        :
                                            <input ref={infoMailRef}></input>
                                        </pre>
                                        <button onClick={ () => {setIsOpen(2)}}>exit</button>
                                        <button onClick={() => 
                                        {
                                            setIsOpen(0)
                                            // new_data = {
                                            //     name: infoNameRef.current.value,
                                            //     email: infoMailRef.current.value,
                                            //     // password: infoPassRef.current.value
                                            // };
                                            axios
                                            .put(`https://hodikids.com/api/user/${admin.id}/update`)
                                        }}>
                                            save
                                        </button>
                                    </div>
                        case 2:
                            return  <div className="exit_popup">
                                        <h4>Your changes will not be saved. Are you sure?</h4>
                                        <button onClick={ () => {setIsOpen(0)}}> Yes</button>
                                        <button onClick={ () => {setIsOpen(1)}}> No</button>
                                    </div>
                        default:
                            return null
                    }
                })()}
            </div>
        </div>
    )
}

export default AccountPage