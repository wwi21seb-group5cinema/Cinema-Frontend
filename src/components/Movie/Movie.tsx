//import './Movie.css'

import React, {useEffect, useState} from 'react';
import { Button, Card, Col, ConfigProvider, Divider, Row, Space, theme } from 'antd';
import {Link} from "react-router-dom";
import "./Movie.css"

const styles = {
    movie: {
        margin: 20,
        backgroundColor: "#212426",
        borderColor: "#61dafb",
        color: "#61dafb",

        
    },
    linkText: {
        color: "#212426",
        fontSize: "1rem",
        fontWeight: "500"

    },
    
    
};

interface Props {
    imageUrl: string;
    title: string;
    description: string;
    events: any;
    genre: any;
    length: any;
    fsk: any;
    clickHandlerMovie: any; 
    currentMovie: any;
}


const Movie: React.FC<Props> = ({ imageUrl, title, description, events, genre, length, fsk, clickHandlerMovie, currentMovie }) => {

    const eventLink: React.ReactElement[] = [];
    const [allEventLinks,setEventLinks] = useState<React.ReactElement[]>();
    

    useEffect(()=>{
        for(let i = 0; i<events.length;i++){
            eventLink.push(
                <Button type="primary" block>
                <Link to="/Booking" state={{props: events[i].id}} style={styles.linkText}><p>{getDateTime(events[i].eventDateTime.toString())}</p></Link>
                </Button>
            )
            if (i === 3){break}
        }
        setEventLinks(eventLink);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    function getText()
    {
        return "Genre: "+genre.name+" | FSK: "+getFSKString(fsk)+" | Länge: "+length.toString()+" min"}
    
    function getFSKString(fsk: any)
    {
            switch (fsk) {
            case "ZERO":
                return "0"
            case "SIX":
                return "6"
            case "TWELVE":
                return "12"
            case "SIXTEEN":
                return "16"
            case "EIGHTEEN":
                return "18"
        
        }
    }
    function getDateTime(date:String)
    {
        var s = date.split(',');
        return s[2]+"."+s[1]+"."+s[0]+" - "+s[3]+":"+getMinutes(s[4])

    }
    function getMinutes(minutes: String)
    {   
        var rightMinutes: String
        if (minutes === "0")
            rightMinutes = "00"
        else
            rightMinutes = minutes
        return rightMinutes
    }
    
    
    //onClick={clickHandler}
    return (
        <ConfigProvider theme={{
            algorithm: theme.darkAlgorithm,
            token: {
                colorPrimary: '#61dafb',
                fontFamily: "raleway"
            }}}>
            <Card

                    hoverable
                    title={title}
                    style={styles.movie}
                    headStyle={{color: '#61dafb', fontSize: "1.5rem", fontWeight: "500"}}
            >
                
                <Row>
               
                    <Col style={{width: "33%"}}>
                        <img className="image" src={imageUrl} alt={title} style={{cursor: "pointer", }} onClick={() => {clickHandlerMovie(currentMovie)}}/>
                    </Col>
                    <Col style={{width: "33%"}}>
                        <div style={{fontSize: "1.3rem", fontWeight: "500"}}> {getText()}</div>
                        <Divider style={{color: "white"}}/>
                        <div style={{color: "lightgrey", margin: 10, fontSize: "1.1rem", textAlign: "justify"}}>{(description.length<=500) ? description : description.substring(0,499)+"..."}</div>
                    </Col>
                    <Col style={{width: "33%"}}>
                        <Space wrap direction="vertical" style={{alignItems: "center", width:"100%"}}>
                            {allEventLinks}
                        </Space>
                    </Col> 
                     
                </Row>
                
            </Card>
        </ConfigProvider>
    );
};

export default Movie;

