import ModalWindow from '../../components/ModalWindow/ModalWindow';
import {showModal} from '../../components/ModalWindow/ModalWindow';
import {Col, Row, Table} from 'antd';
import "./BookingConfirmation.css";
import Navbar from "../../components/Navbar/Navbar";


const dataSource = [
    {
        key: '1',
        pos: '1',
        price: '32,00 €',
        seat: 'Reihe A, Platz B, Tarif C'
    },
    {
        key: '2',
        pos: '2',
        price: '42,00 €',
        seat: 'Reihe X, Platz Y, Tarif Z'
    },
];

const columns = [
    {
        title: 'Position',
        dataIndex: 'pos',
        key: 'pos',
    },
    {
        title: 'Sitzplatz',
        dataIndex: 'seat',
        key: 'seat',
    },
    {
        title: 'Preis',
        dataIndex: 'price',
        key: 'price',
    }
];

function BookingConfirmation(){

    function submitButtonClicked() {
        window.location.href = '..';
    }

    return(

        <div className="app">

            <Row id={"Header"}>
                <Col span={24}>
                    Header
                </Col>
            </Row>

            <Row id={"Content"}>
                <Col span={6}>
                    Left
                </Col>
                <Col span={12}>
                    <Row id={"splitContent"}>
                        <Row id={"personalInfoContainer"}>
                            Stammdaten
                        </Row>
                        <Row id={"paymentMethodContainer"}>
                            Zahlungsart
                        </Row>
                    </Row>
                </Col>
                <Col span={6}>
                    <Table dataSource={dataSource} columns={columns} pagination={false}></Table>
                    <button onClick={submitButtonClicked}>Bestätigen und kaufen</button>
                </Col>
            </Row>

            <Row id={"Footer"}>
                <Col span={24}>
                    Footer
                </Col>
            </Row>

        </div>

    );
}

export default BookingConfirmation;