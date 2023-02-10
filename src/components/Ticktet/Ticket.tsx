
import React from 'react';
import { Button, Card, Col, ConfigProvider, Row, theme } from 'antd';

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
    title: string;
    date:any;
    cinemaHall:string;
    place:any;
    row:any;
    id:any;
    onClickHandler: any;
}


const Movie: React.FC<Props> = ({  title, date, cinemaHall, place, row  }) => {


    function getText1()
    {
        return "Datum: "+getDateTime(date)+" | Saal: "+cinemaHall
    }

    function getText2()
    {
        return "Reihe: "+row+" | Platz: "+place
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
            }}}>
            <Card
                title={title}
                style={styles.movie}
                headStyle={{color: '#61dafb', fontSize: "1.5rem", fontWeight: "500"}}
            >
                <Row>
                    <Col style={{width: "70%"}}>
                        <div>{getText1()}</div>
                        <div>{getText2()}</div>

                    </Col>

                    <Col style={{width: "30%"}}>
                        <Button type="primary" block onClick={()=>{alert("bitte rufen sie für die Stonierung ihresTickets bei uns an :)")}}>
                            stornieren
                        </Button>
                    </Col>

                </Row>

            </Card>
        </ConfigProvider>
    );
};

export default Movie;