import   '../types';
import '../assets/css/CategoryBookList.css';
import CategoryBookListItem from './CategoryBookListItem';
import CategoryNav from './CategoryNav';
import  "../types";
import {BookItem} from "../types";

import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";


function CategoryBookList() {
    const {id} = useParams ();
   // axios.get(`http://webdev.cs.vt.edu:8080/LavishaBookstoreReactFetch/api/categories/name/${id}/books/`);
    const [books, setBook]  = useState([]);
    useEffect(() => {
        axios.get(`/LavishaBookstoreReactTransact/api/categories/name/${id}/books/`)
            .then((result) => setBook(result.data ))
            .catch(console.error);
    }, [id]);


  return (

      <>  <CategoryNav/>
          <div id="book-boxes">
              {/*{bookList.map((book:BookItem)}*/}
              {books.map((book:BookItem) => (
                  <CategoryBookListItem  book = {book}/>))}
          </div>
</>
)
}

export default CategoryBookList;
