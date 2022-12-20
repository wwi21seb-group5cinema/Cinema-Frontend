import "./Navbar.css"
import Searchbar from "../../components/Searchbar/Searchbar";
import {Link} from "react-router-dom";

function Navbar(){
    return(

        <nav className="navbar">
            <h3>
                <Searchbar/>
            </h3>
            <ul className="links">
                <Link className="linkText" to="/">
                    <li>Veranstaltungen</li>
                </Link>
                <Link className="linkText" to="/Login">
                    <li>Login</li>
                </Link>
            </ul>
        </nav>

    )
}
export default Navbar