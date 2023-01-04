import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './Members.css'
import axios from "axios"

const Members = () => {

    const [users , setUsers] = useState([]);
    const [userInfo , setUserInfo] = useState([]);
    const [userInfoVis , setUserInfoVis] = useState(0);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [query, setQuery] = useState(""); 
    const classes = {
        'container':true,
        "BookList":true,
    };

    useEffect( () => {
        setLoading(1);
        axios
        .get('https://hodikids.com/api/users')
        .then((res) =>
        setUsers(res.data.filter(isAdmin)));
        setLoading(0);
    },[userInfoVis])
    
    function isAdmin(item) {
        if (item.is_superuser === 1) {
            return false;
        }
        return true;
    }
    function search(users) {
        return users.filter(
          (item) =>
            search_parameters.some((parameter) =>
              item[parameter].toString().toLowerCase().includes(query)
            )
        );
    }

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const pageNumbers = [];
    const search_parameters = ["name","email"];

    for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div>
            <div  className="Members">
                {(() => {
                    switch (userInfoVis) {
                    case 0:
                        if (loading) {
                            return <h2>Loading...</h2>;
                        }
                        return  <div className={classes}>
                                    <label htmlFor="search-form">
                                        <input
                                            type="search"
                                            name="search-form"
                                            id="search-form"
                                            className="search-input"
                                            placeholder="Search user..."
                                            onChange={(e) => setQuery(e.target.value)}
                                        />
                                    </label>
                                    {search(currentUsers).map((user) => (
                                        <li className="MemberList" key={user.id} 
                                        onClick = { () =>
                                           {   
                                               setUserInfo(user)
                                               setUserInfoVis(1)
                                           }
                                           }>
                                       {user.email}
                                       </li>
                                    ))}
                                    <nav className="page">
                                        {pageNumbers.map(number => (
                                            <button onClick={() => paginate(number)} href='!#' key={number} className='page-item'>
                                              {number}
                                            </button>
                                        ))}
                                    </nav>
                                </div>  
                    case 1:
                        return  <div className="userInfo">
                                    <button className="buttonVis"
                                        onClick={ () => setUserInfoVis(0)}>EXIT</button>
                                    <pre>
                                        Name: 
                                        {userInfo.name}
                                    </pre>
                                    <pre>
                                        E-mail:
                                        {userInfo.email}
                                    </pre>
                                    <button onClick={() => 
                                    {
                                        setUserInfoVis(2)
                                    }}>
                                        delete
                                    </button>
                                </div>
                    case 2:
                        return  <div className="popup">
                                    The user with that email: <b>{userInfo.email}</b> will be blocked. Are you sure?
                                    <button onClick={ () => {
                                        axios
                                        .get(`https://hodikids.com/api/user/${userInfo.id}/delete`)
                                        setUserInfoVis(0) }}
                                        > Yes
                                    </button>
                                    <button onClick={ () => {setUserInfoVis(1)}}>
                                        No
                                    </button>
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