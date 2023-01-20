import "./Navbar.css"
import Searchbar from "../../components/Searchbar/Searchbar";
import {Link} from "react-router-dom";
import CinemaLogo from "../../images/CinemaLogo.png";


function Navbar(){
    return(

        <nav className="navbar">
            <Link to="/">
                <img src={CinemaLogo} alt="Cinema5"/>
            </Link>
            <h3>
                <Searchbar/>
            </h3>
            <ul className="links">
                <Link className="linkText" to="/">
                    <li>Veranstaltungen</li>
                </Link>
                <Link className="linkText" to="/MovieInfo">
                    <li>Filme</li>
                </Link>
                <Link className="linkText" to="/Account">
                    <li>Konto</li>
                </Link>
            </ul>
        </nav>

    )
}
export default Navbar