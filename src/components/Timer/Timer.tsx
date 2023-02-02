import React from 'react';
import { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";

interface Props {
    deadline: string;
    display: boolean;
}

const Timer = ({deadline, display}: Props) => {

    const [minutes, setMinutes] = useState(-1);
    const [seconds, setSeconds] = useState(0);
    const navigate = useNavigate();
    const contentStyle: React.CSSProperties = {
        fontSize : "1.5rem",
        marginTop : "5px"
    };

    const getTime = (deadline: string) => {
        const time = Date.parse(deadline) - Date.now();

        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
        if(time ===0 && display)
        {
            alert("Die Reservierung ist abgelaufen! Du wirst auf die Startseite zurückgeführt!");
            navigate('../');
        }
    };

    useEffect(() => {
        const interval = setInterval(() => getTime(deadline), 1000);

        return () => clearInterval(interval);
    }, []);

    function getNumberDisplay(num:number)
    {
        return num<10 ? "0"+num : num;
    }
    return (<>
        {((minutes >-1) && display) &&
            <div className="timer" style={contentStyle}>
                Tickets reserviert für: {getNumberDisplay(minutes)}:{getNumberDisplay(seconds)} Minuten
        </div>}
        </>
    );
};

export default Timer;