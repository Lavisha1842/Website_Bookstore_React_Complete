import {createContext} from "react";
import {CategoryItem} from "../types";
import {useEffect, useState} from "react";
import axios from "axios";

export const Category = createContext<CategoryItem[] | []>([]);   // creates a context called Category
Category.displayName = 'CategoryContext';

function CategoryContext ({ children }: any)  {
    // cut/paste the categories code here from the App component
    const [categories, setCategories]  = useState([]);
    useEffect(() => {
        axios.get('/LavishaBookstoreReactTransact/api/categories')
            .then((result) => {
                setCategories(result.data)
            })
            .catch(console.error);
    }, []);
    return (
        <Category.Provider value ={categories}>{children}</Category.Provider>
    );
}
export default CategoryContext;