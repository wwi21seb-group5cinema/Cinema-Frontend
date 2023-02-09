import { StarOutlined } from "@ant-design/icons";
import { Button, Col, ConfigProvider, Divider, Row, Space, theme} from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const styles = {
    linkText: {
        color: "#212426",
        fontFamily: "raleway"
    },
}

function MoviePage (){

    const API_URL = process.env.REACT_APP_API_URL;

    const props = useLocation();
    
    const MovieData = props.state.MovieData;
    console.log(MovieData);

    function getURL(image:any)
    {
        return API_URL + "/image/get/"+image.id.toString()
    }
    
    

    const imageUrl = MovieData.externalImage ? MovieData.image_url : getURL(MovieData.image);
    const title = MovieData.name;
    const description= MovieData.description;
    const genre=MovieData.genre 
    const length=MovieData.length 
    const fsk=MovieData.fsk
    const rating=MovieData.rating 
    const start_date=MovieData.start_date 
    const end_date=MovieData.end_date 
    const producer=MovieData.producer
    const director=MovieData.director
    const actors=MovieData.actors
    

    function getGenre()
    {
        return "Genre: " +genre.name}
    function getFSK()
    {
        return "FSK: " + getFSKString(fsk)}
    function getLength()
    {
        return "Länge: " + length + " min"}
    function getRating()
    {
        return "Rating: " + parseFloat(rating).toFixed(1)}
    function getStartDate()
    {
        return "Startdatum: " +getDate(start_date.toString())}
    function getEndDate()
    {
        return "Enddatum: " +getDate(end_date.toString())}
    function getProducer()
    {
        return "Produktionsfirma: " +producer.name}
    function getDirector()
    {
        return "Regisseur: " +director.firstName + " " + director.name}
    function getActors()
    {
        return "Schauspieler: " +actors}


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

    function getDate(date:String)
    {
        var s = date.split(',');
        return s[2]+"."+s[1]+"."+s[0]

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
    
    const eventLink: React.ReactElement[] = [];
    const [allEventLinks,setEventLinks] = useState<React.ReactElement[]>();

    async function fetchEventData(){
        try {
            const response = await fetch(API_URL + "/event/get?movieId=" + MovieData.id)
            if(!response.ok){
                console.log("Fehler: " + response.ok);
            }
            const eventData = await response.json();   
            
            for(let i = 0; i<eventData.length;i++){
                eventLink.push(
                    <Button type="primary" block>
                    <Link to="/Booking" state={{props: eventData[i].id}} style={styles.linkText} ><p>{getDateTime(eventData[i].eventDateTime.toString())}</p></Link>
                    </Button>
                )
                if (i === 7){break}
            }
            setEventLinks(eventLink);
        }
        catch(error){
            console.log(error);
        }
        }
    


    useEffect( ()=>{
        fetchEventData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[MovieData]);

    return(
        <ConfigProvider theme={{
            algorithm: theme.darkAlgorithm,
            token: {
                colorPrimary: '#61dafb',
            }}}>
        <div className="app">
            <Navbar/>
            <Row>
                <Col style={{width: "33%"}}>
                    <Space wrap direction="vertical">
                        <img src={imageUrl} alt={title} />
                        <img src={imageUrl} alt={title} />
                    </Space>
                </Col>
                <Col style={{width: "33%"}}>
                    <h1 style={{fontFamily: "raleway"}}> {title} </h1>
                    <p style={{margin: 10, color: "white"}}>{description}</p>
                    <Divider/>
                    <Space wrap direction="vertical">
                            {allEventLinks}
                    </Space>
                </Col>
                <Col style={{width: "33%"}}>
                    <h3> {getGenre()} </h3>
                    <h3> {getFSK()}</h3>
                    <h3> {getLength()} </h3>
                    <h3> {getRating()} <StarOutlined /></h3>
                    <h3>  {getStartDate()}</h3>
                    {end_date!==null && <h3> {getEndDate()}</h3>}
                    <div> {getProducer()}</div>
                    <div> {getDirector()}</div>
                    <div> {getActors()}</div>
                </Col>
            </Row>
        </div>
        </ConfigProvider>
    );

}

export default MoviePage;   