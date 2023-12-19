
import  "../assets/css/CartTable.css";
import { BookItem } from "../types";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import {useContext} from "react";
import {CartStore} from "../contexts/CartContext";
import {Link, useNavigate} from "react-router-dom";
import {Category} from "../contexts/CategoryContext";



const getBookImageUrl = function (book: BookItem): string {
    let filename = book.title.toLowerCase();
    filename = filename.replace(/ /g, "-");
    filename = filename.replace(/'/g, "");
    filename = filename + ".gif";
    try {
        return require('../assets/images/books/' + filename);
    } catch (_) {
        return require('../assets/images/books/the-iliad.gif');
    }
};



function CartTable()
{
    const { cart, dispatch } = useContext(CartStore);

    // const currentCategory = window.location.pathname.split("/").pop() || 'Classics';
    // if (currentCategory !== 'cart') {
    //     localStorage.setItem("lastVisitedCategory", currentCategory);
    // }

    const currentCategory = window.location.pathname.split("/").pop() || 'Classics';

    // Check if the last visited page is a category page
    const lastVisitedCategory = localStorage.getItem("lastVisitedCategory") || 'Classics';
const navigate = useNavigate();
const categories = useContext(Category);
    const handleContinueShopping = () => {
        if (lastVisitedCategory) {
            navigate(`/Categories/${lastVisitedCategory}`);
        } else if (categories.length > 0) {
            // If no last visited category, go to the first category in the list
            navigate(`/Categories/${categories[0].name}`);
        }
    };

    // const isLastVisitedCategoryPage = lastVisitedCategory.startsWith("/categories");
    //
    // // If the last visited page is not a category page, set it to an empty string
    // if (!isLastVisitedCategoryPage) {
    //     localStorage.setItem("lastVisitedCategory", '');
    // }
    const handleIncrement = (bookId: number) => {
        dispatch({ type: 'ADD', item: { bookId }, id: bookId });
    };

    const handleDecrement = (bookId: number) => {
        dispatch({ type: 'REMOVE', item: { bookId }, id: bookId });
    };

    const handleClearCart = () => {
        dispatch({ type: 'CLEAR' });
    };

    const subtotal = cart.reduce((total, cartItem) => {
        return total + (cartItem.book.price || 0) * cartItem.quantity;
    }, 0);

    const totalItems = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);

    return (
        <div>
        <div className="cart-table">
            {cart.length > 0 ? (
                <>
                    <ul className="cart2">
                        <li className="table-heading">
                            <div className="heading-book">Book</div>
                            <div className="heading-price">Price / Quantity</div>
                            <div className="heading-subtotal">Amount</div>
                        </li>
                        {cart.map((cartItem, index) => (
                            <li key={index}>
                              <div className="cart-book-image">
                               <img
                                                        className="cart2"
                                                        src={getBookImageUrl(cartItem.book)}
                                                        alt={cartItem.book.title}
                              />
                                                </div>
                                                <div className="cart-book-title">{cartItem.book.title}</div>
                                                <div className="cart-book-price">
                                                    ${((cartItem.book.price ?? 0) / 100).toFixed(2)} / {cartItem.quantity}
                                                </div>
                                                <div className="cart-book-quantity">
                                                    <button className="icon-button inc-button" onClick={() => handleIncrement(cartItem.book.bookId)}>
                                                        <FontAwesomeIcon icon={faPlusCircle} />
                                                    </button>
                                                    <span className="quantity">{cartItem.quantity}</span>&nbsp;
                                                    <button className="icon-button dec-button" onClick={() => handleDecrement(cartItem.book.bookId)}>
                                                        <FontAwesomeIcon icon={faMinusCircle} />
                                                    </button>
                                                </div>
                                                <div className="cart-book-subtotal">
                                                    ${(cartItem.book.price ?? 0) * cartItem.quantity / 100}
                                                </div>
                                            </li>
                        ))}
                    </ul>
                    {/*<div>*/}
                    {/*    <button className="clear-cart-button" onClick={handleClearCart}>Clear Cart</button>*/}
                    {/*</div>*/}
                    <div className="buttons-cartpage">
                        {/*<div>*/}
                        {/*    {currentCategory !== 'cart' ? (*/}
                        {/*        <Link to={`/categories/${localStorage.getItem("lastVisitedCategory")}`}>*/}
                        {/*            <button className="button-continue-shopping">Continue Shopping</button>*/}
                        {/*        </Link>*/}
                        {/*    ) : (*/}
                        {/*        <button className="button-continue-shopping" onClick={() => window.history.back()}>Continue Shopping</button>*/}
                        {/*    )}*/}
                        {/*</div>*/}
                        <div>
                            {/*{currentCategory !== 'cart' && isLastVisitedCategoryPage ? (*/}
                            {/*    <Link to={lastVisitedCategory}>*/}
                            {/*        <button className="button-continue-shopping">Continue Shopping</button>*/}
                            {/*    </Link>*/}
                            {/*) : (*/}
                            {/*    <button className="button-continue-shopping" onClick={() => window.history.back()}>Continue Shopping</button>*/}
                            {/*)}*/}
                            <button className="button-continue-shopping" onClick={handleContinueShopping}>Continue Shopping</button>
                        </div>

                        <div className="subtotal-section">
                            <p className="subtotal-label">Total Items: {totalItems}</p>
                            <p className="subtotal-label">Subtotal:</p>
                            <p className="subtotal-value">${(subtotal / 100).toFixed(2)}</p>&nbsp;&nbsp;
                        </div>
                        <div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Link to="/checkout">
                                <button className="button-checkout">Proceed to checkout</button>
                            </Link>
                        </div>
                    </div>
                </>
            ) : (
                <div>
                    <p className="empty-cart">Your cart is empty.</p>
                    {/*<div>*/}
                    {/*    {currentCategory !== 'cart' ? (*/}
                    {/*        <Link to={`/categories/${localStorage.getItem("lastVisitedCategory")}`}>*/}
                    {/*            <button className="button-continue-shopping">Continue Shopping</button>*/}
                    {/*        </Link>*/}
                    {/*    ) : (*/}
                    {/*        <button className="button-continue-shopping" onClick={() => window.history.back()}>Continue Shopping</button>*/}
                    {/*    )}*/}
                    {/*</div>*/}
                    <div>
                        {/*{currentCategory !== 'cart' && isLastVisitedCategoryPage ? (*/}
                        {/*    <Link to={lastVisitedCategory}>*/}
                        {/*        <button className="button-continue-shopping">Continue Shopping</button>*/}
                        {/*    </Link>*/}
                        {/*) : (*/}
                        {/*    <button className="button-continue-shopping" onClick={() => window.history.back()}>Continue Shopping</button>*/}
                        {/*)}*/}
                        <button className="button-continue-shopping" onClick={handleContinueShopping}>Continue Shopping</button>

                    </div>
                </div>
            )}

        </div>
    <div>
        <button className="clear-cart-button" onClick={handleClearCart}>Clear Cart</button>
    </div>
    </div>
                    )
                }

                export default CartTable;

