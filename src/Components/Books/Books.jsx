import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import './Books.css'
import axios from "axios";

const Books = () => {
    
    const [books , setBooks] = useState([]);
    const classes = {
        'container':true,
        "BookList":true,
    };

    const [bookInfoBookName , setBookInfoBookName] = useState();
    const [bookInfoPage , setBookInfoPage] = useState();
    const [bookInfoDonator , setBookInfoDonator] = useState();
    const [bookInfoAuthor , setBookInfoAuthor] = useState();
    const [bookInfoCategory , setBookInfoCategory] = useState();
    const [bookInfoVis , setBookInfoVis] = useState(0);

    useEffect( () => {
        axios
        .get('books.json')
        .then((res) =>
        setBooks(res.data));
    },[])

    return (
        <div>
            <h1 className="header">BOOKS</h1>

        <div className="Books">            
            <ul className={classes}>
                {books.map((book) => (
                    <li className="BooksListElement" key={book.id}
                        onClick = { () =>
                            {
                                setBookInfoBookName(book.name)
                                setBookInfoPage(book.pagecount)
                                setBookInfoDonator(book.donator)
                                setBookInfoAuthor(book.author)
                                setBookInfoCategory(book.category)
                                setBookInfoVis(1)
                            }
                        }>
                        {book.name}
                    </li>
                ))}
            </ul>
            {(() => {
                    switch (bookInfoVis) {
                    case 0:
                        return
                    case 1:
                        return  <div className="bookInfo">
                                    <pre>
                                    bookname: 
                                    {bookInfoBookName}
                                    </pre>
                                    <pre>
                                    page count: 
                                    {bookInfoPage}
                                    </pre>
                                    <pre>
                                    donator:
                                    {bookInfoDonator}
                                    </pre>
                                    <pre>
                                    author:
                                    {bookInfoAuthor}
                                    </pre>
                                    <pre>
                                    category:
                                    {bookInfoCategory}
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

export default Books