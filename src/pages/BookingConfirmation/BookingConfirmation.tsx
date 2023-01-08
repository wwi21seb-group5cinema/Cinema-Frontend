import "./BookingConfirmation.css";
import {Table, Col, Row, Button, Form, Input, ConfigProvider, theme, Typography, Image, Collapse} from 'antd';
import Navbar from "../../components/Navbar/Navbar";
import React, {useState} from "react";
import Cookies from "js-cookie";

const { Title } = Typography;
const { Panel } = Collapse;

interface Stammdaten {
    firstName: string,
    lastName: string,
    street: string,
    houseNumber: string,
    plz: string,
    cityName: string,
    email: string
}

function BookingConfirmation(){

        if(Cookies.get("isLoggedIn") === "true") {
            //check authenticity of user login
        } else {
            window.location.href = '/Login';
        }

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        street: '',
        houseNumber: '',
        plz: '',
        cityName: '',
        email: ''
    });

    getUserData();

    const columns = [
        {
            title: 'Platz',
            dataIndex: 'seatNumber',
            key: 'seatNumber',
        },
        {
            title: 'Reihe',
            dataIndex: 'seatRow',
            key: 'seatNumber',
        },
        {
            title: 'Sitzart',
            dataIndex: 'seatType',
            key: 'seatType',
        },
        {
            title: 'Nachlass',
            dataIndex: 'seatDiscount',
            key: 'seatDiscount',
        },
        {
            title: 'Preis',
            dataIndex: 'seatPrice',
            key: 'seatPrice',
        }
    ];

    if (Cookies.get("shoppingCartContent") === undefined) {
        Cookies.set("shoppingCartContent", "[]");
    }

    const content = JSON.parse(Cookies.get("shoppingCartContent") as string);

    const eventInfo = getEventData();
    const movieData = getMovieData(eventInfo);

    const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };

    function submitButtonClicked() {
        Cookies.remove("shoppingCartContent");
        window.location.href = '..';
    }

    function changeButtonClicked() {
        window.location.href = '/Booking';
    }

    function calcTotal(): string {
        let newTotal: number = 0;
        for (let i = 0; i< content.length; i++)
        {
            newTotal += Number(content[i].seatPrice);
        }
        return "Gesamtpreis in €: "
            + newTotal.toFixed(2);
    }

    function getEventData() {
        if(Cookies.get("eventInfo") === undefined) {
            let eventInfo = require('../Booking/defaultEvent.json');
            Cookies.set("eventInfo", JSON.stringify(eventInfo));
            return eventInfo;
        } else {
            return JSON.parse(Cookies.get("eventInfo")!);
        }
    }

    function getMovieData(eventInfo: any) {
        const year: number = eventInfo.eventDay[0];
        const month: number = eventInfo.eventDay[1];
        const day: number = eventInfo.eventDay[2];
        const hour: number = eventInfo.eventTime[0];
        const minute: number = eventInfo.eventTime[1];
        const second: number = 0;
        return {
            imageData: eventInfo.movie.image.imageData,
            title: eventInfo.movie.name,
            fsk: eventInfo.movie.fsk,
            eventDate: new Date(Date.UTC(year, month, day, hour, minute, second))
        }
    }

    function getUserData() {
        if(!(Cookies.get("userID") === undefined)) {
            const userID = Cookies.get("userID");
            fetch("http://localhost:8082/v1/user/" + userID)
                .then( response => response.json()
                ).then( data => {
                    const userInfo: Stammdaten = {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        street: data.street,
                        houseNumber: data.houseNumber,
                        plz: data.city.plz,
                        cityName: data.city.name,
                        email: data.email
                        };
                    setUserData(userInfo);
                }

            ).catch(error =>{
                console.log(error)
            });
        }
    }

    return(

        <div className="app">

            <ConfigProvider
                theme={
                    {
                        algorithm: theme.darkAlgorithm,
                    }
                }
            >

                <Row id={"Header"}>
                    <Col span={24}>
                        <Navbar />
                    </Col>
                </Row>

                <Row id={"Content"}>
                    <Col span={6}>
                        <Image
                            width={200}
                            height={200}
                            src={"data:image/png;base64, " + movieData.imageData}
                            fallback={"data:image/png;base64,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"}
                        ></Image>
                        <Title>{movieData.title}</Title>
                        <Title level={3}>
                            {movieData.eventDate.toLocaleDateString('de-DE', dateOptions)}
                            {" um "}
                            {movieData.eventDate.toLocaleTimeString('de-DE')}
                            {" Uhr"}
                        </Title>
                        <Title level={3}>FSK-Freigabe: {movieData.fsk}</Title>
                    </Col>
                    <Col span={12}>
                        <Row id={"splitContent"}>
                            <Row id={"personalInfoContainer"}>
                                <Form
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 32 }}
                                    layout="horizontal"
                                >
                                    <Form.Item label={"Vorname"}>
                                        <Input value={userData.firstName} />
                                    </Form.Item>
                                    <Form.Item label={"Nachname"}>
                                        <Input value={userData.lastName} />
                                    </Form.Item>
                                    <Form.Item label={"Straße"}>
                                        <Input value={userData.street} />
                                    </Form.Item>
                                    <Form.Item label={"Hausnummer"}>
                                        <Input value={userData.houseNumber} />
                                    </Form.Item>
                                    <Form.Item label={"Postleitzahl"}>
                                        <Input value={userData.plz} />
                                    </Form.Item>
                                    <Form.Item label={"Ort"}>
                                        <Input value={userData.cityName} />
                                    </Form.Item>
                                    <Form.Item label={"E-Mail"}>
                                        <Input value={userData.email} />
                                    </Form.Item>
                                </Form>
                            </Row>
                            <Row id={"paymentMethodContainer"}>
                                <p><Title level={2}>Zahlungsart wählen:</Title></p>
                                <Collapse accordion defaultActiveKey={1}>
                                    <Panel header={"Bahrzahlung"} key={1}>
                                        <p>{"Sie wollen an der Kasse bezahlen."}</p>
                                    </Panel>
                                    <Panel header={"PayPal"} key={2}>
                                        <p>{"Nach Ihrer Bestätigung werden Sie an NICHT an Paypal weitergeleitet."}</p>
                                    </Panel>
                                    <Panel header={"Kreditkarte"} key={3}>
                                        <p>{"Alle Ihre Angaben sind ohne Gewähr."}</p>
                                    </Panel>
                                    <Panel header={"Überweisung"} key={4}>
                                        <p>{"Bitte den Betrag hierhin überweisen."}</p>
                                    </Panel>
                                </Collapse>
                            </Row>
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Table dataSource={[...content]}
                               rowKey="uid"
                               columns={columns}
                               pagination={false}
                               scroll={{ x: 230, y: 400}}
                               footer={calcTotal}
                        />
                        <Button onClick={changeButtonClicked}>Bearbeiten</Button>
                        <Button onClick={submitButtonClicked}>Bestätigen und buchen</Button>
                    </Col>
                </Row>

            </ConfigProvider>

        </div>

    );
}

export default BookingConfirmation;