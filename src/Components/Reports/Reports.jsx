import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import './Reports.css'
import axios from "axios";

const Reports = () => {

    const [reports , setReports] = useState([]);
    const classes = {
        'container':true,
        "ReportList":true,
    };
    
    useEffect( () => {
        axios
        .get('https://hodikids.com/api/reports')
        .then((res) => 
        setReports(res.data));
    },[])
    
    return (
        <div>
           <div className="Reports">
                <ul className={classes} >
                    {reports.map((report) => (
                        <li className="ReportListElement" key={report.id}>
                            <div className="report">
                                <h4>Message:</h4>
                                <div>{report.message}</div>
                                <h4>Sender:</h4>
                                <div>{report.sender}</div>
                                {/* <button onClick={() => 
                                    {
                                        axios
                                        .get(`https://hodikids.com/api/user/${userInfo.id}/delete`)
                                    }}>
                                </button> */}
                            </div>
                        </li>
                    ))}
                </ul>
           </div>
        </div>
    )
}

export default Reports