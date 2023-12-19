
import '../assets/css/global.css';
import '../assets/css/HeaderDropdown.css';
import {CategoryItem} from '../types';
import { Link } from 'react-router-dom';
import {useContext, useState} from 'react';
import {Category} from "../contexts/CategoryContext";

function HeaderDropdown() {
    // State to manage whether the dropdown is open or closed
    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle the dropdown state
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const categories = useContext<CategoryItem[]>(Category);
    return (
        <div className="header-dropdown">
            <i
                className={`fa fa-${isOpen ? 'times' : 'bars'} categories-button fa-2x`}
                onClick={toggleDropdown}
            ></i>

            {isOpen && (
                <ul>
                    {categories.map((item) => (
                        <li key={item.name}>
                            <Link to={`/categories/${item.name}`}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default HeaderDropdown;
