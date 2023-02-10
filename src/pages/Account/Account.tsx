import React, {useEffect, useState} from "react";
import "./Account.css";
import Navbar from "../../components/Navbar/Navbar";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {Layout, Button, theme, ConfigProvider, Divider, List, Col, Row} from 'antd';
import Ticket from "../../components/Ticktet/Ticket";

const API_URL = process.env.REACT_APP_API_URL;
const { Footer, Content} = Layout;

const Account: React.FC = () => {

    const navigate = useNavigate();

    const [userData ,setUserData] = useState<{ title: string; description: any; }[]>([]);
    const [allTickets ,setTickets] = useState<React.ReactElement[]>();
    const [ticketData ,setTicketData] = useState<any[]>([]);


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

    async function onClick (id:any){
        console.log(id)
        const options = {
            method: 'POST'
        }
        const response = await fetch(API_URL + "/ticket/cancel?ticketId=" +ticketData[id].id,options);
        await response.json();
            if(response.ok) {
                {
                    ticketData.splice(id, 1)
                }
                setTicketData(ticketData)
            }else{
                alert("Fehler")
            }
        }





    useEffect(()=>{
        const userID = Cookies.get("userID");
        fetch(API_URL + "/ticket/get?userId=" + userID)
      .then( response => response.json()
      ).then( data => {
          console.log(data)
            setTicketData(data)});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(()=>{
        const Tickets: React.ReactElement[] = []

        for(let i = 0; i< ticketData.length; i++) {
        //Daten ersetzen
        Tickets.push(<Ticket title={ticketData[i].title} date={ticketData[i].date.toString()} cinemaHall={ticketData[i].cinemaHall} row={ticketData[i].row} place={ticketData[i].place} id={i}
                             onClickHandler={onClick}/>)
    }
    setTickets(Tickets)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ticketData]);


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
                        <Row>
                            <Col style={{width: "50%", textAlign:"left"}}>
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
                                <Footer className="Account-Footer">
                                    <Button size="large" onClick={LogOff}>Abmelden</Button>
                                </Footer>
                            </Col>

                            <Col style={{width: "50%"}}>
                                <Divider orientation="left"><h1>deine Tickets </h1></Divider>
                                {allTickets}
                                </Col>
                        </Row>

                    </Content>


                </Layout>
            </ConfigProvider>
        </div>

    );
}
export default Account