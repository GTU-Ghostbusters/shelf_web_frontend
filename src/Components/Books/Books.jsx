import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import './Books.css'
import axios from "axios";

const Books = () => {
    
    const [books , setBooks] = useState([]);
    
    useEffect( () => {
        axios
        .get('book_data.json')
        .then((res) =>
        setBooks(res.data));
    },[])

    return (
        <div className="Books">
            <input className="BookInput"></input>

            <ul className="BooksList">
                {books.map((book) => (
                    <li className="BooksListElement" key={book.id}>
                        {book.name}
                    </li>
                ))}
            </ul>

            
        </div>
    )
}

export default Books