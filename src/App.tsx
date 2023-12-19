import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Home from './components/Home'
import CategoryBookList from './components/CategoryBookList';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import {useEffect, useState} from "react";
import axios from "axios";
import Cart from "./components/Cart";

import CheckoutPage from "./components/CheckoutPage";
import ConfirmationPage from "./components/ConfirmationPage";


function App() {
    // const [categories, setCategories]  = useState([]);
    // useEffect(() => {
    //     axios.get('http://localhost:8080/LavishaBookstoreReactState/api/categories')
    //         .then((result) => setCategories(result.data ))
    //         .catch(console.error);
    // }, []);
  return (
      <Router basename={"LavishaBookstoreReactTransact"}>
        <AppHeader/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<CategoryBookList />} >
                <Route path=":id" element={<CategoryBookList/>} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>

        <AppFooter />

      </Router>
  );
}

export default App;

