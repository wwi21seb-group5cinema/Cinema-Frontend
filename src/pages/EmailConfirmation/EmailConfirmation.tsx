import {Result, ConfigProvider, theme} from "antd";
import Navbar from "../../components/Navbar/Navbar";
import "./EmailConfirmation.css";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;
function EmailConfirmation(){
    const location = useLocation();
    const [statusText,setStatusText] = useState<React.ReactElement>();


    useEffect(()=>{
        let token = location.pathname.slice(location.pathname.lastIndexOf("/")).substring(1);
        console.log(token);
        fetch(API_URL + '/confirm?token=' + token, {method: "POST"})
            .then(response =>{
                console.log(response.status);
                if(response.ok && response.status !== 208){
                    setStatusText(
                        <Result
                            className="result"
                            status="success"
                            title="Dein Konto wurde erfolgreich verifiziert"
                            subTitle="Du kannst nun zum Login zurückkehren und dich anmelden."
                        />
                    )
                }
                else if(response.status === 208){
                    setStatusText(
                        <Result
                            className="result"
                            status="warning"
                            title="Dein Konto wurde bereits verifiziert"
                            subTitle="Du kannst nun zum Login zurückkehren und dich anmelden."
                        />
                    )
                }
                else{
                    setStatusText(
                        <Result
                            className="result"
                            status="error"
                            title="Fehler bei der Verifizierung deines Kontos"
                            subTitle={response.status}
                        />
                    )
                }
            })
            .catch(err =>{
                console.log(err);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    return(
        <div className="app">
            <Navbar/>
            <ConfigProvider theme={{algorithm:theme.darkAlgorithm}}>
                {statusText}
            </ConfigProvider>
        </div>
    );
}
export default EmailConfirmation