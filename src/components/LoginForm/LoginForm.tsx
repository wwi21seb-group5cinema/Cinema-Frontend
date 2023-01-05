import React from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import {Button, ConfigProvider, Form, Input, theme} from 'antd';
import {Link} from "react-router-dom";

const LoginForm: React.FC = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(values),
        }
        fetch('http://localhost:8082/v1/login', options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
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