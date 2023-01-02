import ModalWindow from '../../components/ModalWindow/ModalWindow';
import {showModal} from '../../components/ModalWindow/ModalWindow';
import { Table, Col, Row } from 'antd';
import "./Booking.css";
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

let columns = [
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
], loggedIn;

function Booking(){

    function buyButtonClick(){
        let loggedIn = true
        if(loggedIn==true) {
            window.location.href = '/BookingConfirmation';
        } else {
            alert('Will be redirected to Login page...');
            //window.location.href = '/Login';
        }
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
                      Content
                  </Col>
                  <Col span={6}>
                      <Table dataSource={dataSource} columns={columns} pagination={false}></Table>
                      <button onClick={buyButtonClick}>Tickets kaufen</button>
                  </Col>
              </Row>
              <Row id={"Footer"}>
                  <Col span={24}>
                      Footer
                  </Col>
              </Row>

          {/*<ModalWindow />*/}

          {/*-- <Navbar />*/}

          {/*<div className="splitContainer">

              <div className="leftColumn">
                  <p>
                      hier Filminfo anzeigen:
                  </p>
              </div>

              <div className="middleColumn">
                  <p>
                      hier Sitzplätze aussuchen:
                  </p>
                  <p>
                      <button onClick={showModal}>Sitzplatz 1</button>
                  </p>
              </div>

              <div className="rightColumn">
                  <p>
                      hier Zusammenfassung und buchen:
                  </p>
              </div>

          </div>*/}

      </div>

    );

}
export default Booking