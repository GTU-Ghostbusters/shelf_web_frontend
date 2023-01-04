import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import './Books.css'
import axios from "axios";

const Books = () => {
    
    const [books , setBooks] = useState([]);
    const [bookInfo , setBookInfo] = useState([]);
    const [bookInfoVis , setBookInfoVis] = useState(0);
    const classes = {
        'container':true,
        "BookList":true,
    };
    
    useEffect( () => {
        axios.get('https://hodikids.com/api/books')
        .then((res) =>
        setBooks(res.data));
    },[bookInfoVis])

    return (
        <div>
            <div className="Books">            
                {(() => {
                    switch (bookInfoVis) {
                    case 0:
                        return  <ul className={classes}>
                                    {books.map((book) => (
                                        <li className="BooksListElement" key={book.id}
                                            onClick = { () =>
                                            {   
                                                setBookInfo(book)
                                                setBookInfoVis(1)
                                            }
                                            }>
                                            {book.name}
                                        </li>
                                    ))}
                                </ul>
                    case 1:
                        return  <div className="bookInfo">
                                    <button className="buttonVis"
                                        onClick={ () => setBookInfoVis(0)}>EXIT</button>
                                    <pre>
                                        bookname: 
                                        {bookInfo.name}
                                    </pre>
                                    <pre>
                                        page count: 
                                        {bookInfo.page_count}
                                    </pre>
                                    <pre>
                                        donator:
                                        {bookInfo.donator}
                                    </pre>
                                    <pre>
                                        author:
                                        {bookInfo.author}
                                    </pre>
                                    <pre>
                                        category:
                                        {bookInfo.category}
                                    </pre>     
                                    <button onClick={() => 
                                    {
                                        setBookInfoVis(2)
                                    }}>
                                        delete
                                    </button>
                                </div>
                    case 2:
                        return  <div className="popup">
                                    The user with that name: <b>{bookInfo.name}</b> will be blocked. Are you sure?
                                    <button onClick={ () => { 
                                        axios
                                        .get(`https://hodikids.com/api/books/${bookInfo.id}/delete`) 
                                        setBookInfoVis(0)}}
                                        > Yes
                                    </button>
                                    <button onClick={ () => {setBookInfoVis(1)}}>
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

export default Books