import { OrderDetails} from "../types";

export const OrderTypes = {
    UPDATE: 'UPDATE',
    CLEAR: 'CLEAR'
};

export type AppActions = {
    id:number;
    type: 'UPDATE'  | 'CLEAR';
    item: OrderDetails;
}

export const OrderReducer = (state: OrderDetails, action: AppActions): OrderDetails => {
    switch (action.type) {
        case 'CLEAR':
            return {
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
        case 'UPDATE':
            return action.item || state;
        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
};