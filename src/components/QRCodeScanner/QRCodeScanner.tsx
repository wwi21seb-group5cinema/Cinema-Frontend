import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';

const QRCodeScanner: React.FC = () => {
    const [result, setResult] = useState<string | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (result) {
                clearInterval(interval);
                // Do something with the scanned QR code
                alert(result);
            }
        }, 2000);
        return () => clearInterval(interval);
    }, [result]);

    const handleResult = (data: any | null, err: any | null) => {
        if (data) {
            setResult(data);
        } else if (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <QrReader
                scanDelay={500}
                onResult={handleResult}
             constraints={{}}/>
        </div>
    );
}

export default QRCodeScanner;
