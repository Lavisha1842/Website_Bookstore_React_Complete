import HeaderDropdown from './HeaderDropdown';
import '../assets/css/global.css'
import '../assets/css/AppHeader.css';
import { Link } from 'react-router-dom';

import {useContext} from "react";

import {CartStore} from "../contexts/CartContext";


function AppHeader(){
    // const [isToggled, setIsToggled] = useState(false);
    const {cart} = useContext(CartStore);
    const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

return(

    <header className="header">
        <div className="logo-and-title">
            <Link to="/">
                <svg width="56" height="54" viewBox="0 0 56 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_7_6)">
                        <path d="M20 0V38.3333H28V0H20ZM28 5.11111L38.6667 38.3333L46.6667 35.7778L36 2.55556L28 5.11111ZM9.33333 5.11111V38.3333H17.3333V5.11111H9.33333ZM4 40.8889V46H52V40.8889H4Z" fill="white"/>
                        <path d="M27.5 0.5V4.74594L27.3709 4.78719L27.5 5.18941V37.8333H20.5V0.5H27.5ZM38.9901 37.7051L28.6291 5.43503L35.6766 3.18377L46.0375 35.4539L38.9901 37.7051ZM16.8333 37.8333H9.83333V5.61111H16.8333V37.8333ZM51.5 45.5H4.5V41.3889H51.5V45.5Z" stroke="#710808"/>
                    </g>
                    <defs>
                        <filter id="filter0_d_7_6" x="0" y="0" width="56" height="54" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="4"/>
                            <feGaussianBlur stdDeviation="2"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7_6"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7_6" result="shape"/>
                        </filter>
                    </defs>
                </svg>
            </Link>
            <div>
                <Link to="/">  <h1 className="text-logo">THE BOOK HACKER'S NOOK</h1> </Link>
            </div>
        </div>
        <div className="search-box">

            <input type="text" className="search-bar" placeholder="Search Books"/>
            <Link to="/"> <i className="fa fa-search"></i> </Link>
        </div>
        <div className="header-dropdown">
            <HeaderDropdown/>
            {/*<button onClick={() => setIsToggled(!isToggled)}>Toggle</button>*/}
            {/*{isToggled && <HeaderDropdown />}*/}
        </div>
        <div>
            <Link to="/cart">
          <span className="fa-stack fa-2x has-badge" data-count={cartQuantity}>
            <i className="fa fa-circle fa-stack-2x"></i>
            <i className="fa fa-shopping-cart fa-stack-1x fa-inverse"></i>
          </span>
            </Link>
        </div>
        <div>
            <Link to="/">  <button className="button-login">LOGIN</button> </Link>
        </div>

    </header>
)
}
export default AppHeader;

