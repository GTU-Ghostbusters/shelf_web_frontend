import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import './Members.css'
import axios from "axios";

const Members = () => {

    const [users , setUsers] = useState([]);
    
    useEffect( () => {
        axios("https://jsonplaceholder.typicode.com/users").then((res) =>
        setUsers(res.data));
    },[])

    return (
        <div className="Members">
            <input className="MemberInput"/>

           <ul className="MembersList">
                {users.map((user) => (
                    <li className="MembersListElement" key={user.id}>
                        {user.name}
                    </li>
                ))}
           </ul>
        </div>
    )
}

export default Members