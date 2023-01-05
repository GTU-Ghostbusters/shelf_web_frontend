import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import './Books.css'
import axios from "axios";

const Books = () => {
    
    const [books , setBooks] = useState([]);
    const [bookInfo , setBookInfo] = useState([]);
    const [bookInfoVis , setBookInfoVis] = useState(0);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(10);
    const [query, setQuery] = useState(""); 
    const classes = {
        'container':true,
        "BookList":true,
    };
    
    useEffect( () => {
        setLoading(1);
        axios.get('https://hodikids.com/api/books')
        .then((res) =>
        setBooks(res.data));
        setLoading(0);
    },[bookInfoVis])

    function search(books) {
        return books.filter(
          (book) =>
            search_parameters.some((parameter) =>
              book[parameter].toString().toLowerCase().includes(query)
            )
        );
    }

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const pageNumbers = [];
    const search_parameters = ["name","author","category"];
    for (let i = 1; i <= Math.ceil(books.length / booksPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div>
            <div className="Books">            
                {(() => {
                    switch (bookInfoVis) {
                    case 0:
                        if (loading) {
                            return <h2>Loading...</h2>;
                        }
                        return  <div className={classes}>
                                    <label htmlFor="search-form" className="search">
                                        <input
                                            type="search"
                                            name="search-form"
                                            id="search-form"
                                            placeholder="Search user..."
                                            onChange={(e) => setQuery(e.target.value)}
                                        />
                                    </label>
                                    {search(currentBooks).map((book) => (
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
                                    <nav className="page">
                                        {pageNumbers.map(number => (
                                            <button onClick={() => paginate(number)} href='!#' key={number} className='page-item'>
                                              {number}
                                            </button>
                                        ))}
                                    </nav>
                                </div> 
                    case 1:
                        return  <div className="bookInfo">
                                    <pre>
                                        <b>Bookname  :</b> 
                                        {bookInfo.name}
                                    </pre>
                                    <pre>
                                        <b>Page count:</b> 
                                        {bookInfo.page_count}
                                    </pre>
                                    <pre>
                                        <b>Donor     :</b>
                                        {bookInfo.donor}
                                    </pre>
                                    <pre>
                                        <b>Author    :</b>
                                        {bookInfo.author}
                                    </pre>
                                    <pre>
                                        <b>Category  :</b>
                                        {bookInfo.category}
                                    </pre>     
                                    <button
                                        onClick={ () => setBookInfoVis(0)}>back</button>
                                    <button onClick={() => 
                                    {
                                        setBookInfoVis(2)
                                    }}>
                                        delete
                                    </button>
                                    
                                </div>
                    case 2:
                        return  <div className="popup">
                                    The user with that name: <b>{bookInfo.name}</b> will be deleted. Are you sure?
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