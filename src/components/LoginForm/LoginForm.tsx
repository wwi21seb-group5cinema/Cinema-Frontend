import React from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import {Button, ConfigProvider, Form, Input, theme} from 'antd';
import {Link, useNavigate, To} from "react-router-dom";
import Cookies from "js-cookie";

const API_URL = process.env.REACT_APP_API_URL;


const LoginForm: React.FC = () => {

    const navigate = useNavigate();
    const onFinish = (values: any) => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(values),
        }
        let responseStatus : boolean = false;
        fetch(API_URL + '/login', options)
            .then(response => {
                responseStatus = response.ok;
                if(response.status === 200){
                    navigate(-1 as To,{replace: true});
                    return response.json();
                }else{
                    alert("Benutzer mit diesen Daten ist nicht vorhanden oder nicht verifiziert");
                }
            })
            .then(data =>{
                if(responseStatus) {
                    Cookies.set('isLoggedIn', 'true', {expires: 7});
                    Cookies.set('userID', data.id, {expires: 7});
                }
            })
            .catch(error =>{
                console.log(error)
            })
    };

    return (
        <div className="App">
            <ConfigProvider theme={{algorithm:theme.darkAlgorithm}}>
                <Form
                    name="login"
                    className="login-form"
                    size="large"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <h1 className="Title">Anmeldung</h1>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Bitte geben sie ihre E-Mail ein' }]}
                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="E-Mail" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Bitte geben sie ihr Passwort ein' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Passwort"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            anmelden
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        noch kein Konto?
                        <Link to="/Register">
                            <p>jetzt registrieren</p>
                        </Link>
                    </Form.Item>
                </Form>
            </ConfigProvider>
        </div>
    );
};

export default LoginForm;