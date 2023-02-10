import "./Booking.css";
import {Table, Col, Row, Button, Modal, theme, ConfigProvider, Typography, Image} from 'antd';
import Navbar from "../../components/Navbar/Navbar";
import React, { useEffect, useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import Timer from "../../components/Timer/Timer";

const API_URL = process.env.REACT_APP_API_URL;

interface wantedTicket {
    seatDiscount: number;
    seatNumber: number;
    seatPrice: string;
    seatRow: number;
    seatType: string;
    seatState: string;
}

interface MovieDataType {
    imageData: any
    title: any
    fsk: any
    eventDate: any
}
let eventInfo:any ;
const { Title } = Typography;

 function Booking() {


    const parameters = useLocation();
    const eventID = parameters.state.props;
    const navigate = useNavigate();
    const initMovieData: MovieDataType = {
        imageData : "Loading",
        title: "Loading",
        fsk: "Loading",
        eventDate: new Date(Date.UTC(0, 0, 0, 0, 0))

    };
    const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    const [movieData,setMovieData] = useState<MovieDataType>(initMovieData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [seatNumberText, setSeatNumberText] = useState(1);
    const [rowNumberText, setRowNumberText] = useState(1);
    const [seatTypeText, setSeatTypeText] = useState('loge');
    const [seatPriceText, setSeatPriceText] = useState('11.00');
    const [colheads,setColheads] = useState<JSX.Element[]>([]);
    const [seatrows,setSeatrows] = useState<any[]>([]);
    const [content, setContent] = useState<any[]>([]);
    const [TimerDeadline, setDeadline] = useState<string>("0");
    const [TimerDisplay, setTimerDisplay] = useState<boolean>(false);


    useEffect(() => {
        getEventData().then(()=>{
            createTicketPlan();
            getMovieData();
        })
        console.log("movieinfo effect funktioniert");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);



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




    function addTicket(newTicket: wantedTicket) {
        setContent((pre: wantedTicket[]) => {
            if(!isTicketNew(pre, newTicket)) {
                alert("Dieses Ticket befindet sich bereits in Ihrem Einkauf");
                return [...pre];
            } else {
                const buttonID = newTicket.seatRow + "_" + newTicket.seatNumber;
                const button = document.getElementById(buttonID)!;
                button.style.backgroundColor = 'green';
                return [...pre, newTicket];
            }
        });
        const data = [
            {
            eventID: eventID,
            row: newTicket.seatRow,
            place: newTicket.seatNumber
        }
        ]
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        }
        fetch(API_URL + "/booking/tempReserve",options)
            .then(response=>{
                if(response.ok){
                    console.log("ticket reserviert");
                }
                response.json()
                    .then(res => {
                        setDeadline(res);
                        setTimerDisplay(true);
                    })
            })
            .catch(error =>{
                console.log(error);
        })


    }

    function isTicketNew(existing: wantedTicket[], ticket: wantedTicket) {
        for (let i = 0; i < existing.length; i++) {
            if( (existing[i].seatNumber === ticket.seatNumber)
                && (existing[i].seatRow === ticket.seatRow)) {
                return false;
            }
        }
        return true;
    }

    function firstTotal(): string {
        let newTotal: number = 0;
        for (let i = 0; i< content.length; i++)
        {
            newTotal += Number(content[i].seatPrice);
        }
        return "Gesamtpreis in €: "
            + newTotal.toFixed(2);
    }

    /* function updateTotal(action: string, newTicket: wantedTicket) {
        let newTotal: number = 0;
        for (let i = 0; i< content.length; i++)
        {
            newTotal += Number(content[i].seatPrice);
        }
        switch (action) {
            case "add":
                newTotal += Number(newTicket.seatPrice);
                break;
            case "remove":
                newTotal -= Number(newTicket.seatPrice);
                break;
        }
        document.getElementsByClassName("ant-table-footer")[0].innerHTML
            = "Gesamtpreis in €: "
            + newTotal.toFixed(2);
    } */

    function buyButtonClicked(){
        if(content.length===0) {
            alert("Bitte wählen Sie zuerst mindestens ein Ticket aus!");
        } else {
           navigate('/BookingConfirmation',{state:{eventInfo:eventInfo, movieData:movieData, content:content, timerDeadline:TimerDeadline,timerDisplay:TimerDisplay }});
        }
    }


    async function getEventData(){
        try {
            const response = await fetch(API_URL + "/event/get?id=" + eventID);
            eventInfo =  await response.json();
        }catch{
            console.log("error while fetching event data");
        }

    }

    function getMovieData() {
        const year: number = eventInfo.eventDay[0];
        const month: number = eventInfo.eventDay[1];
        const day: number = eventInfo.eventDay[2];
        const hour: number = eventInfo.eventTime[0];
        const minute: number = eventInfo.eventTime[1];
        setMovieData( {
            imageData: eventInfo.movie.image.imageData,
            title: eventInfo.movie.name,
            fsk: eventInfo.movie.fsk,
            eventDate: new Date(Date.UTC(year, month, day, hour, minute))
        })

    }

     function createTicketPlan() {

        let rowsAmount = eventInfo.cinemaHall.seatingPlan.rows;
        let rowsArray = [];
        let rowArray = [];
        let columnsAmount = eventInfo.cinemaHall.seatingPlan.seats.length / rowsAmount;
        let columnsArray: JSX.Element[] = [<td>Reihe\Platz</td>];
        let buttonId = '';
        for (let i = 1; i < rowsAmount + 1; i++) {
            rowArray = [<td>{i}</td>];
            for (let j = 1; j < columnsAmount + 1; j++) {
                let seatTicket = getSeatTicket(eventInfo, i, j);
                let newTicket: wantedTicket;
                newTicket = {
                    seatNumber: j,
                    seatRow: i,
                    seatType: seatTicket.seat.seatType.name,
                    seatDiscount: 0,
                    seatPrice: seatTicket.seat.seatType.price.toFixed(2),
                    seatState: seatTicket.seat.seatState
                };
                buttonId = i + '_' + j;
                let color:string = "black";
                let booked:boolean = false;
                if(newTicket.seatState === "RESERVED" || newTicket.seatState === "TEMPORAL_RESERVED"){
                    color = "red";
                    booked = true;
                }
                rowArray.push(<td><Button style={{background : color}} disabled={booked} size={"small"} id={buttonId} onClick={() => ticketButtonClicked(newTicket)}>{j}</Button> </td>)
            }
            rowsArray.push(<tr>{rowArray}</tr>);
        }
        setColheads(columnsArray,);
        setSeatrows(rowsArray);
    }

    function getSeatTicket(eventInfo: any, row: number, place: number) {
        return eventInfo.tickets.filter(
            function(ticket: any) {
                return ticket.seat.row === row && ticket.seat.place === place;
            }
        )[0];
    }

    function ticketButtonClicked(newTicket: wantedTicket) {
        setRowNumberText(newTicket.seatRow);
        setSeatNumberText(newTicket.seatNumber);
        setSeatTypeText(newTicket.seatType);
        setSeatPriceText(newTicket.seatPrice);
        showModal();
    }

    function showModal() {
        setIsModalOpen(true);
    }

    function handleOk() {
        let discount = (document.getElementById("discount")) as HTMLSelectElement;
        let discountFactor = parseInt(discount.value) / 100;
        if (discountFactor === 0) {
            discountFactor = 1;
        }
        let newPrice = parseInt(document.getElementById("seatPriceSpan")!.innerHTML) * discountFactor;
        let discountValue = newPrice/discountFactor - newPrice;
        let newTicket: wantedTicket;
        newTicket = {
            seatNumber: parseInt(document.getElementById("seatNumberSpan")!.innerHTML),
            seatRow: parseInt(document.getElementById("rowNumberSpan")!.innerHTML),
            seatType: document.getElementById("seatTypeSpan")!.innerHTML,
            seatDiscount: discountValue,
            seatPrice: newPrice.toFixed(2),
            seatState: "TEMPORAL_RESERVED"
        };
        addTicket(newTicket);
        setIsModalOpen(false);
    }
    function cancelButtonClicked(){
        window.location.href = "..";
    }
    function handleCancel() {
        setIsModalOpen(false);
    }


    return (
        <div className="app" onLoad={firstTotal}>

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
                <Row className={"Content-Row"}  id={"Content"}>
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
                    <Col  span={12}>
                        <table className="seatingPlan">
                            <thead id={"columnHeaders"}>
                            <tr>
                                {colheads}
                            </tr>
                            </thead>
                            <tbody id={"seatPlanRows"}>{seatrows}</tbody>
                        </table>
                    </Col>
                    <Col span={6}>
                        <Table dataSource={[...content]}
                               rowKey="uid"
                               columns={columns}
                               pagination={false}
                               scroll={{ x: 230, y: 400}}
                               footer={firstTotal}
                        />
                        <Button onClick={cancelButtonClicked}>Abbrechen</Button>
                        <Button onClick={buyButtonClicked}>Tickets kaufen</Button>
                        <Timer key={TimerDeadline} deadline={TimerDeadline} display={TimerDisplay}/>
                    </Col>
                </Row>
            <Modal
                title="Ticketauswahl"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelText={"Abbrechen"}
                okText={"In den Warenkorb"}
                destroyOnClose={true}
            >
                <p>Platz: <span id={"seatNumberSpan"}>{seatNumberText}</span></p>
                <p>Reihe: <span id={"rowNumberSpan"}>{rowNumberText}</span></p>
                <p>Sitzart: <span id={"seatTypeSpan"}>{seatTypeText}</span></p>
                <p>Preis in €: <span id={"seatPriceSpan"}>{seatPriceText}</span></p>
                <p>Vergünstigung:
                    <select name={"discount"} id={"discount"}>
                        <option value={0}>Standardpreis (0 %)</option>
                        <option value={50}>Schüler/Studenten (50 %)</option>
                    </select>
                </p>
            </Modal>
            </ConfigProvider>
</div>);
}
export default Booking;