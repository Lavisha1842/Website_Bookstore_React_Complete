
import HomeCategoryList from './HomeCategoryList';
import '../assets/css/global.css';
import '../assets/css/Home.css'

import { Link } from 'react-router-dom';






function Home() {

    return (

        <div className="home-pages">

            <div className="home-page">
                <img className ="background-image"
                             src={require('../assets/images/site/hero.jpg')}
                             alt="Hero image background"
                             width="1200px"
                             height="600px"
                />

                <div className="photo-container container dark-background">
                    <i className="fa fa-angle-left fa-lg"></i>


                    <button className="button-shopnow"> <Link to={`/categories/Classics`} style={{ textDecoration: 'none' }}>SHOP NOW  </Link></button>

                        <HomeCategoryList/>
                    <i className="fa fa-angle-right fa-lg"></i>
                </div>

            </div>

        </div>
    )
}

export default Home;
