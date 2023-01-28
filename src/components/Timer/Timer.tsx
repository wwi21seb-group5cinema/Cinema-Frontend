import React from 'react';
import { useState, useEffect } from 'react';

interface Props {
    deadline: string;
    display: boolean;
}

const Timer = ({deadline, display}: Props) => {

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const getTime = (deadline: string) => {
        const time = Date.parse(deadline) - Date.now();

        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    };

    useEffect(() => {
        const interval = setInterval(() => getTime(deadline), 1000);

        return () => clearInterval(interval);
    }, []);

    return (<>
        {display && <div className="timer">
            {minutes}
            {seconds}
        </div>}
        </>
    );
};

export default Timer;