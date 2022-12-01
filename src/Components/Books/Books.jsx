import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import './Books.css'
import axios from "axios";

const Books = () => {
    
    const [users , setUsers] = useState([]);
    
    useEffect( () => {
        axios("https://jsonplaceholder.typicode.com/users").then((res) =>
        setUsers(res.data));
    },[])

    return (
        <div className="Books">
           <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
           </ul>
        </div>
    )
}

export default Books