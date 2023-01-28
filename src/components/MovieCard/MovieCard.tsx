import React from 'react';
import { Card, Col, ConfigProvider, Divider, Row, theme } from 'antd';
import { StarOutlined } from '@ant-design/icons';

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
                headStyle={{color: "white"}}
                onClick={() => {clickHandlerMovie(currentMovie)}}
            >
               <Row>
               
               <Col style={{width: "33%"}}>
                   <img src={imageUrl} alt={title}/>
               </Col>
               <Col style={{width: "33%"}}>
                    <div style={{color: "lightgrey"}}> {getText()}</div>
                   <Divider style={{color: "white"}}/>
                   <div style={{margin: 10}}>{(description.length<=200) ? description : description.substring(0,199)+"..."}</div>
               </Col>  
               <Col style={{width: "33%"}}>
                   <h3> Rating: {parseFloat(rating).toFixed(1)} <StarOutlined /></h3>
                   <h3> Startdatum: {getDate(start_date.toString())}</h3>
                   {end_date!==null && <h3> Enddatum: {getDate(end_date.toString())}</h3>}
               </Col> 
                
           </Row>
            </Card>
        </ConfigProvider>
    );
};

export default MovieCard;