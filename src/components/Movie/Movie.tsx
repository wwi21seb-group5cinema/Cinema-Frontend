//import './Movie.css'

import React from 'react';
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
  events: string;
}

const Movie: React.FC<Props> = ({ imageUrl, title, description, events }) => {

    function clickHandlerMovie(){
        window.location.href = '/MovieInfo'
    }

    

    
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
                <Link className="linkText" to="/Booking" state={{props: title}} >
                    <li>{events}</li>
                </Link>
                <Link className="linkText" to="/Booking">
                    <li>{events}</li>
                </Link>
            </ul>
            </Col>
        </Row>
        </Card>
    </ConfigProvider>
  );
};

export default Movie;