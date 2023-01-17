import {Result, ConfigProvider, theme} from "antd";
import Navbar from "../../components/Navbar/Navbar";
import "./EmailConfirmation.css";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;
function EmailConfirmation(){
    const location = useLocation();

    useEffect(()=>{
        let token = location.pathname.slice(location.pathname.lastIndexOf("/")).substring(1);
        console.log(token);
        fetch(API_URL + '/confirm?token=' + token, {method: "POST"})
            .then(response =>response.json())
            .then(data => {
                console.log(data);
            })
            .catch(err =>{
                console.log(err);
            })

    },[]);


    return(
        <div className="app">
            <Navbar/>
            <ConfigProvider theme={{algorithm:theme.darkAlgorithm}}>

            <Result
                className="result"
                status="success"
                title="dein Konto wurde erfolgreich verifiziert"
                subTitle="du kannst nun zum Login zurückkehren und dich anmelden."
            />

            </ConfigProvider>
        </div>
    );
}
export default EmailConfirmation