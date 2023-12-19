import '../assets/css/AppFooter.css'
import '../assets/css/global.css'
import {Link} from "react-router-dom";


function AppFooter(){
return(
    <footer className="container footer-style">
        <div className="centered-section">
            <section className="links">
                <Link to="/" className="no-underline"><i className="fa fa-copyright"></i>&nbsp;2023 All Rights Reserved</Link>
                <span>&nbsp;|&nbsp;</span>
                <Link to="/" className="no-underline">Terms of Use</Link>
                <span>&nbsp;|&nbsp;</span>
                <Link to="/" className="no-underline">Privacy Notice</Link>
                <span>&nbsp;|&nbsp;</span>
                <Link to="/" className="no-underline">Directions</Link>
                <span>&nbsp;|&nbsp;</span>
                <Link to="/" className="no-underline">Contact</Link>
            </section>
        </div>
        <section className="social-media-icons">
            <Link to="/"><i className="fa fa-twitter fa-lg" ></i></Link>&nbsp;&nbsp;
            <Link to="/"><i className="fa fa-facebook-f fa-lg" ></i></Link>&nbsp;&nbsp;
            <Link to="/"><i className="fa fa-instagram fa-lg" ></i></Link>&nbsp;&nbsp;
        </section>
    </footer>
)
}
export default AppFooter;
