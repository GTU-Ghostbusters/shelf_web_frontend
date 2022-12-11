import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import './Members.css'
import axios from "axios";

const Members = () => {

    const [users , setUsers] = useState([]);
    const classes = {
        'container':true,
        "MermberList":true,
    };

    const [userInfoUserName , setUserInfoUserName] = useState();
    const [userInfoFirstName , setUserInfoFirstName] = useState();
    const [userInfoLastName , setUserInfoLastName] = useState();
    const [userInfoEmail , setUserInfoEmail] = useState();
    const [userInfoPhone , setUserInfoPhone] = useState();
    const [userInfoVis , setUserInfoVis] = useState(0);
    
    useEffect( () => {
        axios
        .get('users.json')
        .then((res) =>
        setUsers(res.data));
    },[])

    return (
        <div>
            <h1 className="header">MEMBERS</h1>
            
            <div className="Members">
                <ul className={classes} >
                    {users.map((user) => (
                        <li className="MembersListElement" key={user.id}
                            onClick = { () =>
                                {
                                    setUserInfoUserName(user.username)
                                    setUserInfoFirstName(user.firstname)
                                    setUserInfoLastName(user.lastname)
                                    setUserInfoEmail(user.email)
                                    setUserInfoPhone(user.phone)
                                    setUserInfoVis(1)
                                }
                            }>
                            {user.username}
                        </li>
                    ))}
                </ul>
                {(() => {
                    switch (userInfoVis) {
                    case 0:
                        return
                    case 1:
                        return  <div className="userInfo">
                                    <pre>
                                    username: 
                                    {userInfoUserName}
                                    </pre>
                                    <pre>
                                    firstname: 
                                    {userInfoFirstName}
                                    </pre>
                                    <pre>
                                    lastname:
                                    {userInfoLastName}
                                    </pre>
                                    <pre>
                                    email:
                                    {userInfoEmail}
                                    </pre>
                                    <pre>
                                    phone:
                                    {userInfoPhone}
                                    </pre>
                                    
                                </div>
                    default:
                        return null
                    }
                })()}
                
            </div>
        </div>
    )
}

export default Members