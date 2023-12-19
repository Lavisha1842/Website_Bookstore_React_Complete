import React, { createContext, Dispatch, ReactNode, useReducer, useEffect } from "react";
import { OrderReducer } from "../reducers/OrderReducer";
import {OrderDetails} from "../types";


const storageKey = 'orderDetails';

const initialOrderState: OrderDetails = {
    order: {
        orderId: 0,
        amount: 0,
        dateCreated: 0,
        confirmationNumber: 0,
        customerId: 0,
    },
    customer: {
        customerName: '',
        address: '',
        phone: '',
        email: '',
        ccNumber: '',
        ccExpDate:0,
    },
    books: [],
    lineItems: [],
};

export const OrderDetailsStore = createContext<{
    orderDetails: OrderDetails;
    orderDetailsDispatch: Dispatch<any>;
}>({
    orderDetails: initialOrderState,
    orderDetailsDispatch: () => null,
});

OrderDetailsStore.displayName = 'OrderDetailsContext';

interface OrderDetailsProviderProps {
    children: ReactNode;
}

function OrderDetailsProvider({ children }: OrderDetailsProviderProps) {
    const [orderDetails, orderDetailsDispatch] = useReducer(OrderReducer, initialOrderState,
        (initialState) => {
            try {
                const orderDetail = JSON.parse(localStorage.getItem(storageKey) || '[]');
                return orderDetail as OrderDetails|| initialState;
            } catch (error) {
                console.log('Error parsing cart', error);
                return initialState;
            }
        },
    );

    // Add useEffect to save orderDetails to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(orderDetails));
    }, [orderDetails]);

    return (
        <OrderDetailsStore.Provider value={{ orderDetails, orderDetailsDispatch }}>
            {children}
        </OrderDetailsStore.Provider>
    );
}

export default OrderDetailsProvider;