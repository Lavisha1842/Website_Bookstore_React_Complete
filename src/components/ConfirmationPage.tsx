


import '../assets/css/Confirmation.css'
import ConfirmationTable from "./ConfirmationTable";
import {useContext} from "react";
import {OrderDetailsStore} from "../contexts/OrderDetailsContext";
import {formatCreditCardNumber} from './utils';

function ConfirmationPage()
{
    const { orderDetails} = useContext(OrderDetailsStore);

    const orderDate =  () => {
        let date = new Date(orderDetails.order.dateCreated);
        return ( date.toLocaleString());
    };

    // const ccExpDate =  (): Date =>{
    //      return new Date(orderDetails.customer.ccExpDate);
    //    // return new Date(orderDetails.customer.ccExpiryYear, orderDetails.customer.ccExpiryMonth + 1, 0);
    // };

    const ccExpDate = (): string => {
        const expirationDate = new Date(orderDetails.customer.ccExpDate);

        // Options for formatting the date
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };

        // Get the formatted date string (e.g., "Dec 2023")
        const formattedDate = expirationDate.toLocaleDateString(undefined, options);

        return formattedDate;
    };

    // const ccExpDate = () => {
    //     // Assuming ccExpDate is a string in the format 'MM/YYYY'
    //     return orderDetails.customer.ccExpDate;
    // };


    // const ccExpDate = () => {
    //     // Adjust month and format date
    //     let expDate = new Date(orderDetails.customer.ccExpiryYear, orderDetails.customer.ccExpiryMonth - 1);
    //     return expDate.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit' });
    // };


    return(
        <div className="confirmationView">
            <ul className="confirmation_table_ul">
                <li className="confirmation_table_li"><b>Confirmation #:</b> { orderDetails?.order?.confirmationNumber}</li>
                <li className="confirmation_table_li"><b>Order Date: </b> {orderDate()}</li>
            </ul>
            <ConfirmationTable />
            <ul className="confirmation_table_ul">
                <li className="confirmation_table_li"><b>Name:</b> { orderDetails?.customer?.customerName}</li>
                <li className="confirmation_table_li"><b>Address:</b> { orderDetails?.customer?.address }</li>
                <li className="confirmation_table_li"><b>Email:</b> { orderDetails?.customer?.email }</li>
                <li className="confirmation_table_li"><b>Phone:</b> { orderDetails?.customer?.phone }</li>
                <li className="confirmation_table_li"><b>Credit Card:</b> {`${orderDetails?.customer?.ccNumber && formatCreditCardNumber(orderDetails.customer.ccNumber)} ${ccExpDate()}`}</li>

            </ul>
            <div id="customerInfo"></div>
        </div>
    )
}
export default ConfirmationPage;