import "./addEvent.css"
import Navbar from "../../../components/Navbar/Navbar";
import {Button, ConfigProvider,  List, theme,DatePicker,Select} from "antd";


import React, {useEffect, useState} from "react";
const API_URL = process.env.REACT_APP_API_URL;


let cinemaHalls:any = {};
let cinemaHallMap:any = {};
let cinemaHallID:string = "";
let MovieId :string = "";
let EventDateTime:string = "";

function Admin(){

    const [ResultList,setResultList] = useState<React.ReactElement>();
    const [EventForm,setEventForm] = useState<React.ReactElement>();

    const dropdownlist: React.ReactElement[] = [];

    useEffect(()=>{
        fetch(API_URL + "/cinemaHall/getAll")
            .then(response => response.json())
            .then(data =>{
                cinemaHalls = data;
                let i:number = 0;
                cinemaHalls.map(async (id: any) => {
                    const response = await fetch(API_URL + "/cinemaHall/get?id=" + id)
                    const data = await response.json();
                    cinemaHallMap[data.name] = id;
                    dropdownlist.push(<Select.Option key={i} value={data.name}>{data.name}</Select.Option>);
                    i++;
                });
            })
        fetch(API_URL + "/movie/getAll")
            .then(response => response.json())
            .then(data =>{
                const Movies:any[] = data;
                console.log(Movies);
                setResultList(
                    <List
                        className = "list"
                        itemLayout="horizontal"
                        bordered={true}
                        dataSource={Movies}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <Button onClick={()=>{addEvent(item.id, item.name)}}>
                                        Event hinzufügen
                                    </Button>
                                ]}>
                                <List.Item.Meta
                                    avatar={<img alt="movieImage" className=".search_image" src={item.image_url}/>}
                                    title={item.name}
                                    description={(item.description.length<=400) ? item.overview : item.description.substring(0,399)+"..."}
                                />
                            </List.Item>

                        )}
                    />

                )
            })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);



    function datePicked(e:any){
        let day:string =  "" + e.$D;
        let month:string = "" +  (e.$M+1);
        let hour:string = "" + e.$H;

        if(month.length === 1){
            month = 0 + month;
            console.log(month);
        }
        if(day.length === 1){
            day = 0 + day;
        }
        if(hour.length === 1){
            hour = 0 + hour;
        }

        const DateTimeString:string = day + "-" + month + "-" + e.$y + " " + hour + ":" + e.$m;
        console.log(DateTimeString);
        EventDateTime = DateTimeString;
    }

    function cinemaHallSelected(e:any){
        cinemaHallID = cinemaHallMap[e];


    }

    function createEventRequest(){
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                "movieId": MovieId,
                "cinemaHallId": cinemaHallID,
                "eventDateTime": EventDateTime
            }),
        }
        fetch(API_URL + "/event/add", options)
            .then(response => {
                if(response.ok){
                    alert("Event erfolgreich hinzugefügt")
                }
            })
            .catch(error =>{
                console.log(error)
            })
    }

    function addEvent(id:string, name:string,){
        MovieId = id;
        setEventForm(
                <div>
                    <div className="Title">
                    <h2>{name}</h2>
                    </div>
                    <div className="EventForm">
                        <Select  className="SaalSelect" onSelect={cinemaHallSelected}>
                            {dropdownlist}
                        </Select>
                        <DatePicker showTime format="YYYY-MM-DD HH:mm" onOk={datePicked} />
                        <Button className="EventButton" onClick={createEventRequest}>Event erstellen</Button>
                    </div>



                </div>

        )


    }



    return(
        <div className="Admin">
            <Navbar/>
            <ConfigProvider
                theme={
                    {
                        algorithm: theme.darkAlgorithm,
                        token: {
                            colorPrimary: '#61dafb',
                        }
                    }
                }
            >
                <div className="addMovie">
                    {ResultList}
                </div>
                <div className="Form">
                    {EventForm}
                </div>


            </ConfigProvider>
        </div>
    );
}
export default Admin