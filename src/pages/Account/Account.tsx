import {useEffect} from "react";
import Navbar from "../../components/Navbar/Navbar";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

function Account(){

    const navigate = useNavigate();

    useEffect(()=>{
        if( !(Cookies.get("isLoggedIn") === "true")){
            console.log((Cookies.get("isLoggedIn") === "true"));
            console.log(Cookies.get('isLoggedIn'));
            navigate('/Login');
        }

    },)

    function LogOff(){
        Cookies.remove("isLoggedIn");
        navigate('/');
    }
    return(
        <div className="app">
            <Navbar/>
            <p>Hier kommt die Konto Seite rein </p>
            <button onClick={LogOff}>Abmelden</button>
        </div>
    );
}
export default Account