import '../assets/css/HomeCategoryList.css';
import {categoryImages, CategoryItem} from '../types';
import {Category} from "../contexts/CategoryContext";
import {useContext} from "react";


function HomeCategoryList(){
    const categories = useContext<CategoryItem[]>(Category);
    return(

<div>
            {categories.map((category) => (
                <li key={category.name} className="photo-container-img">
                    <img src={categoryImages[category.name.toLowerCase()]}
                         alt="book.title"
                    />
                </li>
            ))}


        </div>

)
}
export default HomeCategoryList;
