//import './Movie.css'

import React, {useEffect, useState} from 'react';
import { Card, Col, ConfigProvider, Row, theme } from 'antd';
import {Link} from "react-router-dom";

const styles = {
    movie: {
        margin: 20,
        backgroundColor: "#555555",
        borderColor: "#61dafb",
        color: "white"
    }
};

interface Props {
    imageUrl: string;
    title: string;
    description: string;
    events: any;
}

const Movie: React.FC<Props> = ({ imageUrl, title, description, events }) => {

    const eventLink: React.ReactElement[] = [];
    const [allEventLinks,setEventLinks] = useState<React.ReactElement[]>();
    function clickHandlerMovie(){
        window.location.href = '/MovieInfo'
    }

    useEffect(()=>{
        for(let i = 0; i<events.length;i++){
            eventLink.push(
                <Link to="Booking" state={{props: events[i].id}}><p>{events[i].eventDateTime}</p></Link>
            )
        }
        setEventLinks(eventLink);
    },);




    return (
        <ConfigProvider theme={{algorithm: theme.darkAlgorithm}}>
            <Card
                title="Movie"
                style={styles.movie}
                headStyle={{color: "white"}}
            >
                <Row>
                    <Col span={12}>
                        <img src={imageUrl} alt={title} onClick={clickHandlerMovie}/>
                    </Col>
                    <Col span={12}>
                        <h3>{title}</h3>
                        <p>{description}</p>
                        <ul>
                            {allEventLinks}
                        </ul>
                    </Col>
                </Row>
            </Card>
        </ConfigProvider>
    );
};

export default Movie;