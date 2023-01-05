import "./Login.css"
import Navbar from "../../components/Navbar/Navbar";
import LoginForm from "../../components/LoginForm/LoginForm";

function Login(){

    return(
        <div className="app">
            <Navbar/>
            <LoginForm/>
        </div>
    );
}
export default Login