import React from 'react';
import { Card, Col, ConfigProvider, Divider, Row, theme } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import "./MovieCard.css"

const styles = {
    movie: {
        margin: 20,
        backgroundColor: "#212426",
        borderColor: "#61dafb",
        color: "#61dafb"
    }
};

interface Props {
    
    imageUrl: string;
    title: string;
    description: string;
    genre: any;
    length: any;
    fsk: any;
    rating: any;
    start_date: any;
    end_date: any;
    clickHandlerMovie: any; 
    currentMovie: any;
    
}

const MovieCard: React.FC<Props> = ({ imageUrl, title, description, genre, length, fsk, rating, start_date, end_date, clickHandlerMovie, currentMovie }) => {

    
   
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
        
        };
    }
    function getDate(date:String)
    {
        var s = date.split(',');
        return s[2]+"."+s[1]+"."+s[0]

    }

    return (
        <ConfigProvider theme={{
            algorithm: theme.darkAlgorithm,
            token: {
                colorPrimary: '#61dafb',
            }}}>
            <Card
                hoverable
                title={title}
                style={styles.movie}
                headStyle={{color: '#61dafb', fontSize: "1.5rem", fontWeight: "500"}}
                onClick={() => {clickHandlerMovie(currentMovie)}}
            >
               <Row>
               
               <Col style={{width: "33%"}}>
                   <img className= "image" src={imageUrl} alt={title}/>
               </Col>
               <Col style={{width: "33%"}}>
                    <div style={{fontSize: "1.3rem", fontWeight: "500"}}> {getText()}</div>
                   <Divider style={{color: "white"}}/>
                   <div style={{color: "lightgrey", margin: 10, fontSize: "1.1rem", textAlign: "justify"}}>{(description.length<=500) ? description : description.substring(0,499)+"..."}</div>
               </Col>
                   <Col style={{width: "33%", fontSize: "1.3rem", fontWeight: "500",display: "flex", alignItems: "center"}}>
                   <span style={{ alignItems: "center", width:"100%"}} >
                   <div style={{marginTop: 10}}> Rating: {parseFloat(rating).toFixed(1)} <StarOutlined /></div>
                   <div style={{marginTop: 10}}> Startdatum: {getDate(start_date.toString())}</div>
                   {end_date!==null && <div style={{marginTop: 10}}> Enddatum: {getDate(end_date.toString())}</div>}
                       </span>
               </Col> 
                
           </Row>
            </Card>
        </ConfigProvider>
    );
};

export default MovieCard;