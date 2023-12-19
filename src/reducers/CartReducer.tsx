import {ShoppingCartItem, BookItem} from "../types";

export const CartTypes = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    CLEAR:'CLEAR'
};
//const findItem = (cart, id) => cart.find((item) => item.id === id);
export type AppActions = {
    id:number;
    type: 'ADD' | 'REMOVE'  | 'CLEAR';
    item: BookItem;
}

const findItem = (cart: ShoppingCartItem[], id: number) => cart.find((item) => item.id === id);
export const cartReducer = (state:ShoppingCartItem[], action:AppActions) => {
    switch (action.type) {
        case CartTypes.ADD:
            if (findItem(state, action.item.bookId)) {
                return state.map((book) =>
                    book.id === action.item.bookId
                        ? { ...book, quantity: book.quantity + 1 }
                        : book
                );
            }
            return [
                ...state,
                { id: action.item.bookId, book: action.item, quantity: 1 }
            ];
        case CartTypes.REMOVE:
            const existingItem = findItem(state, action.item.bookId);

            if (existingItem) {
                if (existingItem.quantity > 1) {
                    // If quantity is greater than 1, decrement the quantity
                    return state.map((book) =>
                        book.id === action.item.bookId
                            ? { ...book, quantity: book.quantity - 1 }
                            : book
                    );
                } else {
                    // If quantity is 1, remove the item from the cart
                    return state.filter((book) => book.id !== action.item.bookId);
                }
            }
            return state;

        case CartTypes.CLEAR:
            return [];
            // return state;
        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
};