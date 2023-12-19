import '../assets/css/CategoryNav.css'
import '../assets/css/global.css'
import {CategoryItem} from '../types';
import {Link, useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from 'react';
import {Category} from "../contexts/CategoryContext";

function CategoryNav() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();
    const [lastVisitedCategory, setLastVisitedCategory] = useState('');
    useEffect(() => {
        const storedCategory = localStorage.getItem('lastVisitedCategory');
        if(storedCategory){
            setLastVisitedCategory(storedCategory);
        }
    }, []);

    const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    localStorage.setItem('lastVisitedCategory', categoryName);

    navigate(`/Categories/${categoryName}`);
  };


  const categories = useContext<CategoryItem[]>(Category);
  return (

      <nav className="category-nav">
        <ul className="category-buttons">
          {categories.map((category) => (
              <li
                  key={category.name}
                  className={`button ${selectedCategory === category.name ? 'selected-category-button' : 'unselected-category-button'}`}
              >
                <Link
                    to={`/categories/${category.name}`}
                    style={{
                      color: 'var(--secondary-background-color)',
                      textDecoration: selectedCategory === category.name ? 'underline' : 'none',
                    }}
                    onClick={() => handleCategoryClick(category.name)}
                >
                  {category.name}
                </Link>
              </li>
          ))}
        </ul>
      </nav>
)
}

export default CategoryNav;


