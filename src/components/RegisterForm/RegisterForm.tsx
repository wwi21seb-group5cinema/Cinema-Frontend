import React from 'react';
import {Button, Form, Input, ConfigProvider, theme, InputNumber} from 'antd';
import "./RegisterForm.css";
import {To, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';


const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },

};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const Register: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        delete values.confirm;
        values.isAdmin = "false";

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(values),
        }
        fetch('http://localhost:8082/v1/register', options)
            .then(response => {
                console.log(response.status);
                if(response.status === 201){
                    Cookies.set('isLoggedIn', 'true', { expires: 7 });
                    navigate(-2 as To, { replace: true })
                }
            })
            .catch(error =>{
                console.log(error)
            })
    };


    return (
            <div className="App">
                <ConfigProvider theme ={{algorithm: theme.darkAlgorithm,}}>
                    <Form
                    {...formItemLayout}
                    form={form}
                    size="large"
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <h1 className="Title">Registrierung</h1>
                    <Form.Item
                        name="firstName"
                        label="Vorname"
                        rules={[{ required: true, message:"Bitte geben sie ihren Vornamen ein", whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="lastName"
                        label="Nachname"
                        rules={[{ required: true, message:"Bitte geben sie ihren Nachnamen ein", whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="userName"
                        label="Benutzername"
                        rules={[{ required: true, message:"Bitte geben sie ihren Benutzernamen ein", whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'Bitte geben sie eine gültige E-mail ein',
                            },
                            {
                                required: true,
                                message:"Bitte geben sie ihre E-Mail ein",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Passwort"
                        rules={[{required: true, message:"Bitte geben sie ihr Passwort ein",}]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Passwort bestätigen"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Bitte bestätigen sie ihr Passwort',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Die Passwörter sind nicht identisch!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>


                    <Form.Item
                        name="cityName"
                        label="Stadt"
                        rules={[{ required: true, message:"Bitte geben sie ihren Wohnort ein",whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="plz"
                        label="Postleitzahl"
                        rules={[{ required: true, message:"Bitte geben sie ihre PLZ ein" }]}
                    >
                        <InputNumber
                            onChange={value =>
                                form.setFieldsValue({ plz: value ? value.toString() : '' })
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="street"
                        label="Straße"
                        rules={[{ required: true, message: 'Bitte geben sie ihre Straße ein', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="houseNumber"
                        label="Hausnummer"
                        rules={[{ required: true, message: 'Bitte geben sie ihre Hausnummer ein'}]}
                    >
                        <InputNumber
                            onChange={value =>
                                form.setFieldsValue({ houseNumber: value ? value.toString() : '' })
                            }
                        />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            registrieren
                        </Button>
                    </Form.Item>
                </Form>
                </ConfigProvider>
            </div>
    );
};

export default Register;