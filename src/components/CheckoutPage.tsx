

import  "../assets/css/checkout.css"



import { isCreditCard, isMobilePhone, isvalidEmail } from './utils';
import {BookItem, CustomerForm, months, OrderDetails,  years} from "../types";
import {CartStore} from "../contexts/CartContext";
import {ChangeEvent, FormEvent, useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {CartTypes} from "../reducers/CartReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import axios from "axios";
import {OrderTypes} from "../reducers/OrderReducer";
import {OrderDetailsStore} from "../contexts/OrderDetailsContext";




function CheckoutPage()
{

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

   /*
    * This will be used by the month and year expiration of a credit card
    *  NOTE: For example yearFrom(0) == <current_year>
   */
   function yearFrom(index: number) {
      return new Date().getFullYear() + index;
   }

   const {cart, dispatch} = useContext(CartStore);
    const { orderDetails, orderDetailsDispatch: orderDetailsDispatch } = useContext(OrderDetailsStore);
  const cartTotalPrice = cart.reduce((total, cartItem) => {
      return total + (cartItem.book.price || 0) * cartItem.quantity;
   }, 0);
   const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

   const isCartEmpty = cart.length === 0;


   const [nameError, setNameError] = useState("");
   const [addressError, setAddressError] = useState("");
   const [phoneError, setPhoneError] = useState("");
   const [emailError, setEmailError] = useState("");
   const [ccError, setCcError] = useState("");
   const [ccExpiryMonthError, setCcExpiryMonthError] = useState("");
   const [ccExpiryYearError, setCcExpiryYearError] = useState("");

   const [formData, setFormData] = useState({name: "",address:"", phone:"",email: "",ccNumber: "", ccExpiryMonth:1,ccExpiryYear:yearFrom(0)});

   const [checkoutStatus, setCheckoutStatus] = useState("");


   const handleIncrement = (bookId: number) => {
      dispatch({ type: 'ADD', item: { bookId }, id: bookId });
   };

   const handleDecrement = (bookId: number) => {
      dispatch({ type: 'REMOVE', item: { bookId }, id: bookId });
   };

   function isValidForm() {
      let isValid = true;

      // Validation for name
      if (formData.name.length < 4 || formData.name.length > 45) {
         setNameError('Name must be between 4 and 45 characters long!');
         isValid = false;
      } else {
         setNameError('');
      }

      // Validation for address
      if (formData.address.length < 4 || formData.address.length > 45) {
         setAddressError('Address must be between 4 and 45 characters long!');
         isValid = false;
      } else {
         setAddressError('');
      }

      // Validation for phone
      // Implement phone validation logic here
      if (!isMobilePhone(formData.phone)) {
         setPhoneError('Invalid phone number!');
         isValid = false;
      } else {
         setPhoneError('');
      }

      // Validation for email
      // Implement email validation logic here
      if (!isvalidEmail(formData.email)) {
         setEmailError('Invalid email address!');
         isValid = false;
      } else {
         setEmailError('');
      }

      // Validation for credit card number
      // Implement credit card number validation logic here
      if (!isCreditCard(formData.ccNumber)) {
         setCcError('Invalid credit card number!');
         isValid = false;
      } else {
         setCcError('');
      }

      // // Validation for credit card expiry month and year
      // if (formData.ccExpiryMonth < 1 || formData.ccExpiryMonth > 12) {
      //    setCcExpiryMonthError('Invalid month');
      //    isValid = false;
      // } else {
      //    setCcExpiryMonthError('');
      // }
      //
      // const currentYear = new Date().getFullYear();
      // if (formData.ccExpiryYear < currentYear || formData.ccExpiryYear > currentYear + 10) {
      //    setCcExpiryYearError('Invalid year');
      //    isValid = false;
      // } else {
      //    setCcExpiryYearError('');
      // }

      return isValid;
   }


   // TO DO placeOrder function comes here. Needed for project 9 (not 8)

    const placeOrder =  async (customerForm: CustomerForm) =>  {
        //console.log(customerForm.ccExpiryMonth);
        const order = { customerForm: customerForm, cart:{itemArray:cart} };

        const orders = JSON.stringify(order);
        // console.log(orders);     //you can uncomment this to see the orders JSON on the console
        const url = 'api/orders';
        const orderDetails: OrderDetails = await axios.post(url, orders,
            {headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => {
                dispatch({type: CartTypes.CLEAR});
                return response.data;
            })
            .catch((error)=>console.log(error));
        orderDetailsDispatch({ type: OrderTypes.UPDATE, item: orderDetails });
        console.log("order details: ", orderDetails);
        return orderDetails;
    }

   // const currentCategory = window.location.pathname.split("/").pop() || 'Classics';
   // const lastVisitedCategory = localStorage.getItem("lastVisitedCategory") || 'Classics';
   // const isLastVisitedCategoryPage = lastVisitedCategory.startsWith("/categories");
   //
   // // If the last visited page is not a category page, set it to an empty string
   // if (!isLastVisitedCategoryPage) {
   //    localStorage.setItem("lastVisitedCategory", '');
   // }

    const navigate = useNavigate();
    const defaultCategory = 'Classics'; // Set your default category here

    const handleContinueShopping = () => {
        // Attempt to retrieve the last visited category from local storage
        const lastVisitedCategory = localStorage.getItem("lastVisitedCategory");

        if (lastVisitedCategory) {
            // Navigate to the last visited category
            navigate(`/categories/${lastVisitedCategory}`);
        } else {
            // If no last visited category is found, navigate to the default category
            navigate(`/categories/${defaultCategory}`);
        }
    };

   function handleInputChange(event:ChangeEvent<HTMLInputElement|HTMLSelectElement>) {

      const { name, value } = event.target;

      switch (name) {
         case 'name':
            setFormData((prevFormData) => ({...prevFormData, [name]: value}));
            if(value.length < 4 || value.length > 45) {
               setNameError("Name must be at least 4 characters long!");
            }
            else {
                   setNameError("");
                 }
            break;
         case 'address':


            setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
            if (value.length < 4 || value.length > 45) {
               setAddressError('Address must be between 4 and 45 characters long!');
            } else {
               setAddressError('');
            }
            break;
         case 'phone':


            setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
            // Add phone validation logic here using isMobilePhone
            if (!isMobilePhone(value)) {
               setPhoneError('Invalid phone number!');
            } else {
               setPhoneError('');
            }

            break;
         case 'email':


            setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
            // Add email validation logic here using isvalidEmail
            if (!isvalidEmail(value)) {
               setEmailError('Invalid email address!');
            } else {
               setEmailError('');
            }

            break;
         case 'ccNumber':


            setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
            // Add credit card validation logic here using isCreditCard
            if (!isCreditCard(value)) {
               setCcError('Invalid credit card number!');
            } else {
               setCcError('');
            }

            break;
         case 'ccExpiryMonth':
            setFormData((prevFormData) => ({...prevFormData, [name]:parseInt(value,10)}));
            break;
         case 'ccExpiryYear':
            setFormData((prevFormData) => ({...prevFormData, [name]: parseInt(value,10)}));
            break;
         default:
            break;
      }
   }


   // function submitOrder(event:FormEvent) {
   //    event.preventDefault();
   //    console.log("Submit order");
   //    const isFormCorrect = isValidForm();
   //    if (!isFormCorrect) {
   //       setCheckoutStatus("ERROR");     //Note that checkoutStatus is a state of the CheckoutPage
   //    }
   //    else {
   //       setCheckoutStatus("PENDING");
   //       setTimeout(() => {
   //          setCheckoutStatus("OK");
   //          setTimeout(() => {
   //             navigate('/confirmation') ; // please read about the useNavigate() hook of the react router
   //          }, 1000);
   //       }, 1000);
   //    }
   // }

    async function submitOrder(event:FormEvent) {
        event.preventDefault();
        console.log("Submit order");
        const isFormCorrect =  isValidForm();
        console.log(isFormCorrect);
        if (!isFormCorrect) {
            setCheckoutStatus("ERROR");
        } else {
            setCheckoutStatus("PENDING");

            const orders = await placeOrder({
                name: formData.name,
                address: formData.address,
                phone: formData.phone,
                email: formData.email,
                ccNumber: formData.ccNumber,
                ccExpiryMonth: formData.ccExpiryMonth,
                ccExpiryYear: formData.ccExpiryYear,
            })
            if(orders) {
                setCheckoutStatus("OK");
                navigate('/confirmation');}
            else{
                console.log("Error placing order");
            }
        }
    }

   return (
       <section className="checkout-cart-table-view">
          {isCartEmpty ? (
              <div className="empty-cart-message">
                 <p className="empty-cart">Your cart is empty. Please add items to proceed.</p>
                 <div>
                   <button className="button-continue-shopping" onClick={handleContinueShopping}>Continue Shopping</button>

                 </div>
              </div>
          ) : (
          <div className="checkout-view-layout">
          <div className="checkout-page-body">
             <div className="form-style">
                <form
                    className="checkout-form"
                     onSubmit ={(event)=>submitOrder(event)}
                    method="post"
                >
                   <div>
                      <label htmlFor="fname">Name</label>
                      <input
                          type="text"
                          size={20}
                          name="name"
                          id="fname"
                          value={formData.name}
                          onChange={handleInputChange}
                      />
                   </div>
                   <> {nameError && <div className="error"> {nameError}</div>}</>
                  <div>
                   <label htmlFor="Address">Address</label>
                   <input
                       type="text"
                       size={20}
                       name="address"
                       id="Address"
                       value={formData.address}
                       onChange={handleInputChange}
                   />
                  </div>
                   <> {addressError && <div className="error"> {addressError}</div>}</>

                   <div>
                      <label htmlFor="Phone">Phone</label>
                      <input
                          type="text"
                          size={20}
                          name="phone"
                          id="Phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                      />
                   </div>
                   <> {phoneError && <div className="error"> {phoneError}</div>}</>

                   <div>
                      <label htmlFor="Email">Email</label>
                      <input
                          type="text"
                          size={20}
                          name="email"
                          id="Email"
                          value={formData.email}
                          onChange={handleInputChange}
                      />
                   </div>
                   <> {emailError && <div className="error"> {emailError}</div>}</>

                   <div>
                      <label htmlFor="Card">Card</label>
                      <input
                          type="text"
                          size={20}
                          name="ccNumber"
                          id="Card"
                          value={formData.ccNumber}
                          onChange={handleInputChange}
                      />
                   </div>
                   <> {ccError && <div className="error"> {ccError}</div>}</>


                   <div >
                      <label htmlFor="ccExpiryMonth">Exp Date</label>
                      <select style={{color:'black'}} name ="ccExpiryMonth" value ={formData.ccExpiryMonth} onChange={handleInputChange}>
                         { months.map((month, i) => (
                             <option  key={i}  value={i + 1}  >
                                { month }
                             </option>
                         ))}
                      </select>

                      {/*<label htmlFor="ccExpiryYear">Exp Year</label>*/}
                      <select
                          style={{ color: 'black' }}
                          name="ccExpiryYear"
                          value={formData.ccExpiryYear}
                          onChange={handleInputChange}
                      >
                         {Array.from({ length: 15 }).map((_, index) => {
                            const year = yearFrom(index);
                            return (
                                <option key={index} value={year}>
                                   {year}
                                </option>
                            );
                         })}
                      </select>

                   </div>
                </form>
             </div>


             <div className="checkout-summary">
                <div className="checkout-items">
                   <p>Total Items: </p> &nbsp;&nbsp;
                   <p>{cartQuantity}</p>
                </div>
                <div className="checkout-total">
                   <p>Subtotal:</p> &nbsp;&nbsp;
                   <p>${(cartTotalPrice / 100).toFixed(2)}</p>
                </div>
                <div className="checkout-tax">
                   <p>Tax (5%):</p> &nbsp;&nbsp;
                   <p>${((cartTotalPrice/100) * 0.05).toFixed(2)}</p>
                </div>
                <div className="checkout-total-tax">
                   <p>Total: </p> &nbsp;&nbsp;
                   <p>{`$${((cartTotalPrice / 100) + (cartTotalPrice / 100 * 0.05)).toFixed(2)}`}</p>
                </div>
                <div className="checkout-button">
                   <button className="button-complete-purchase" onClick={submitOrder}>Complete Purchase</button>
                </div>
             </div>


                   <div>
                      {/*The following code displays different string based on the */}
                      {/*value of the checkoutStatus*/}
                      {/*Note the ternary operator*/}
                      {
                         checkoutStatus !== ''?
                             <>
                                <section className="checkoutStatusBox" >
                                   { (checkoutStatus === 'ERROR')?
                                       <div>
                                          Error: Please fix the problems above and try again.
                                       </div>: ( checkoutStatus === 'PENDING'?
                                           <div>
                                              Processing...
                                           </div> : (checkoutStatus === 'OK'?
                                               <div>
                                                  Order placed...
                                               </div>:
                                               <div>
                                                  An unexpected error occurred, please try again.
                                               </div>))}
                                </section>
                             </>
                             :<></>}
                   </div>
                </div>

          <div >
             {/*This displays the information about the items in the cart*/}

             <ul className="checkout-cart-info">
                {cart?.map((item, i) => (
                    <div className="checkout-cart-book-item" key={i}>
                       <div className="checkout-cart-book-image" key={i}>
                          <img
                              src={getBookImageUrl(item.book)}
                              alt="title"
                              className="checkout-cart-info-img"
                              width="20%"
                              height="20%"
                          />
                       </div>
                       <div className="checkout-cart-book-info">
                          <div className="checkout-cart-book-title">{item.book.title}</div>
                          <div className="checkout-cart-book-subtotal">
                             ${(item.book.price ?? 0) * item.quantity / 100}
                          </div>
                          <div className="checkout-cart-book-quantity">
                             <button className="checkout-icon-button inc-button" onClick={() => handleIncrement(item.book.bookId)}>
                                <FontAwesomeIcon icon={faPlusCircle} />
                             </button>
                             <button className="checkout-num-button">{item.quantity}</button>
                             <button className="checkout-icon-button dec-button" onClick={() => handleDecrement(item.book.bookId)}>
                                <FontAwesomeIcon icon={faMinusCircle} />
                             </button>
                          </div>
                       </div>

                    </div>
                ))}
             </ul>
          </div>

          </div>
          )}
       </section>
   )}

export default CheckoutPage;