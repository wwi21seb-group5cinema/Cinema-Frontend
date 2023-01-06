import "./Navbar.css"
import Searchbar from "../../components/Searchbar/Searchbar";
import {Link} from "react-router-dom";
import MovieDBLogo from "../../images/MovieDBLogo.svg";


function Navbar(){
    return(

        <nav className="navbar">
            <img src={MovieDBLogo} alt="MovieDB"/>
            <h3>
                <Searchbar/>
            </h3>
            <ul className="links">
                <Link className="linkText" to="/">
                    <li>Veranstaltungen</li>
                </Link>
                <Link className="linkText" to="/Movies">
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