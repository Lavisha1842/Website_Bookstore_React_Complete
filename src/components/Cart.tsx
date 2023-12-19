import CartTable from "./CartTable";

import {CartStore} from "../contexts/CartContext";
import {useContext} from "react";
import '../assets/css/global.css'
import '../assets/css/cart.css';
function Cart() {
    const {cart} = useContext(CartStore);


    return (
        <div>
            <h3 className="cart-page">Cart Summary</h3>
            <CartTable />
        </div>
            )
        }

        export default Cart;