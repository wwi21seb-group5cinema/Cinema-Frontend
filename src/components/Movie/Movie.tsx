
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
}

const Movie: React.FC<Props> = ({ imageUrl, title, description }) => {

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
                <Link className="linkText" to="/Booking">
                    <li>Veranstaltung 16.12.22</li>
                </Link>
                <Link className="linkText" to="/Booking">
                    <li>Veranstaltung 17.12.22</li>
                </Link>
            </ul>
            </Col>
        </Row>
        </Card>
    </ConfigProvider>
  );
};

export default Movie;