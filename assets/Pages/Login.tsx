import { Button, Form, Input} from 'antd';
import axios from 'axios';
import React, { useContext } from 'react';
import { AppContext } from "../AppContainer";
import { AuthApiService } from '../services/AuthApiService';
import {openNotificationWithIcon, notificationType} from "../components/generics/Notification";
import "../css/login.less";
import { Rules } from '../classes/Rules';

export const Login = () => {
    const authService = new AuthApiService();
    const { setUser } = useContext(AppContext);
    const requiredRules = [Rules.Required];

    const onSubmit = (values) => {
        authService.login(values).then(response => {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.token;
            localStorage.setItem('token', response.token)
            authService.me().then(response => {
                setUser(response)
                openNotificationWithIcon(notificationType.success, "Connecté" , `Bonjour ${response.firstName}`)
            })
        }).catch(response => {
                openNotificationWithIcon(notificationType.error, "Identifiants incorrects" , ` Nous n'avons pas réussi à vous authentifier`)
        })
    }

    return (
        <div className="login-container">
            <div className="form-container">
                <h1>BENFELD</h1>
                <Form className="form-input" onFinish={onSubmit} layout="vertical">
                    <Form.Item rules={requiredRules}  name="username">
                        <Input type="email" placeholder="Addresse e-mail" />
                    </Form.Item>
                    <Form.Item rules={requiredRules} name="password">
                        <Input type="password" placeholder="Mot de passe " />
                    </Form.Item>
                    <Button type="default" htmlType="submit" className="login-button">Se connecter</Button>
                </Form>
            </div>
        </div>
    )
}