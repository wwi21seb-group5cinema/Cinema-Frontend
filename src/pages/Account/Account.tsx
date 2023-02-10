import React, {useEffect, useState} from "react";
import "./Account.css";
import Navbar from "../../components/Navbar/Navbar";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {Layout, Button, theme, ConfigProvider, Divider, List} from 'antd';

const API_URL = process.env.REACT_APP_API_URL;
const { Footer, Content} = Layout;

const Account: React.FC = () => {

    const navigate = useNavigate();

    const [userData ,setUserData] = useState<{ title: string; description: any; }[]>([]);



    useEffect(()=>{
        if( !(Cookies.get("isLoggedIn") === "true")){
            navigate('/Login');
        }
        const userID = Cookies.get("userID");
         fetch(API_URL + "/user/" + userID)
        .then( response => response.json()
        ).then( data => {
            const userInfo =[
                {
                    title: "Vorname",
                    description: data.firstName
                },
                {
                    title: "Nachname",
                    description: data.lastName
                },
                {
                    title: "Benutzername",
                    description: data.userName
                },
                {
                    title: "E-Mail",
                    description: data.email
                },
                {
                    title: "Stadt",
                    description: data.city.name
                },
                {
                    title: "Postleitzahl",
                    description: data.city.plz
                },
                {
                    title: "Hausnummer",
                    description: data.houseNumber
                }

             ]
             setUserData(userInfo);
            }

        ).catch(error =>{
            console.log(error)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function LogOff(){
        Cookies.remove("isLoggedIn");
        navigate('/');
    }

    return(
        <div className="Account">

            <Navbar/>
            <ConfigProvider theme={{algorithm:theme.darkAlgorithm,
                token: {
                    colorPrimary: '#61dafb',
                }}}>
                <Layout>
                    <Content className="Account-Content">
                        <Divider orientation="left"><h1>dein Konto </h1></Divider>
                        <List
                            size="large"
                            bordered
                            dataSource={userData}
                            renderItem={(item) =>
                                <List.Item>
                                    <List.Item.Meta title={item.title} description={item.description}/>
                                </List.Item>}
                        />
                    </Content>
                    <Footer className="Account-Footer">
                        <Button size="large" onClick={LogOff}>Abmelden</Button>
                    </Footer>

                </Layout>
            </ConfigProvider>
        </div>

    );
}
export default Account