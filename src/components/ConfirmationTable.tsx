

import '../assets/css/ConfirmationTable.css'

import { asDollarsAndCents } from "./utils";

import {BookItem, LineItem, OrderDetails} from '../types'

import {OrderDetailsStore} from "../contexts/OrderDetailsContext";
import {useContext} from "react";

function ConfirmationTable() {
  const { orderDetails} = useContext(OrderDetailsStore);
    const totalOrderPrice = orderDetails.books.reduce(
        (total, book) => total + book.price * getQuantityForBook(orderDetails.lineItems, book.bookId),
        0
    );
    const totalPrice = orderDetails.books.reduce((total, book) => total + book.price, 0);
    const tax = totalPrice * 0.05; // Assuming a 5% tax rate
// A helper function - optional to use
  const bookAt = function (orderDetails: OrderDetails, index: number): BookItem {
  return orderDetails.books[index];
};
  return (
      <table className="confirmation_table">
          <thead className="confirmation_table_head">
          <tr>
              <th className="confirmation_table_head_th">Book Name</th>
              <th className="confirmation_table_head_th">Quantity</th>
              <th className="confirmation_table_head_th">Price</th>
          </tr>
          </thead>
          <tbody>
        {
          orderDetails.books?.map((book, i) => (

        <tr className="confirmation_tr" key={i}     >
        <td className="confirmation_td">
          {book.title}
        </td>
        {/*<td className = "confirmation_td">{book.quantity}</td>*/}
            <td className = "confirmation_td">{getQuantityForBook(orderDetails.lineItems, book.bookId)}</td>
            <td className = "confirmation_td">{asDollarsAndCents((book.price * getQuantityForBook(orderDetails.lineItems, book.bookId)))}</td>
        {/*<td className = "confirmation_td">{asDollarsAndCents((book.price))}</td>*/}
      </tr>
          ))}
          <tr>
              <td>Tax:</td>
              <td></td>
              <td>{asDollarsAndCents(tax)}</td>
          </tr>
          <tr>
              <td>Total:</td>
              <td></td>
              <td>{asDollarsAndCents(totalOrderPrice + tax)}</td>
          </tr>
          </tbody>
    </table>
  )}
function getQuantityForBook(lineItems: LineItem[], bookId: number): number {
    const matchingLineItem = lineItems.find((item) => item.bookId === bookId);
    return matchingLineItem ? matchingLineItem.quantity : 0;
}
export default ConfirmationTable;