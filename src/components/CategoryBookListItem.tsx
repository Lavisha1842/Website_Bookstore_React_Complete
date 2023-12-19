import '../assets/css/CategoryBookListItem.css';
import '../types'
import "../types";
import {BookItem} from "../types";
import {useContext} from "react";
import {CartStore} from "../contexts/CartContext";
import {CartTypes} from "../reducers/CartReducer";

const bookImageFileName =  (book:BookItem) => {
  let name = book.title.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return `${name}.gif`;
};

function CategoryBookListItem({book}: {book:BookItem}) {
    const  {dispatch} = useContext(CartStore);
    const addBookToCart = () => {
        dispatch({ type: CartTypes.ADD, item:book, id: book.bookId });
    };
    if(book.isPublic)
    {
        return (

            <div className="book-box">
                <div className="book-image">
                    <span className="read-now"><i className="fa fa-eye fa-lg"></i></span>
                    <img src={require('../assets/images/books/' + bookImageFileName(book))}
                         alt="book.title"
                    />
                </div>
                <div className="book-title">{book.title }</div>
                <div className="book-author">{ book.author }</div>
                <div className="book-price">${ (book.price / 100).toFixed(2) }</div>
                <button className="button-add-to-cart" onClick={addBookToCart}>Add to Cart</button>

            </div>

        )
    }
    else{
        return (

            <div className="book-box">
                <div className="book-image">
                    <img src={require('../assets/images/books/' + bookImageFileName(book))}
                         alt="book.title"
                    />
                </div>
                <div className="book-title">{book.title }</div>
                <div className="book-author">{ book.author }</div>
                <div className="book-price">${ (book.price / 100).toFixed(2) }</div>
                <button className="button-add-to-cart" onClick={addBookToCart}>Add to Cart</button>
                {/*<button className="button">Read Now</button>*/}
            </div>

        )
    }



}

export default CategoryBookListItem;
