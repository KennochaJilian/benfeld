import { Button, Form, Input} from 'antd';
import axios from 'axios';
import React, { useContext } from 'react';
import { AppContext } from "../AppContainer";
import { AuthApiService } from '../services/AuthApiService';
import {openNotificationWithIcon, notificationType} from "../components/generics/Notification"

export const Login = () => {
    const authService = new AuthApiService();
    const { setUser } = useContext(AppContext);

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
        <React.Fragment>
            <Form onFinish={onSubmit} layout="vertical">
                <Form.Item name="username">
                    <Input type="email" placeholder="Addresse e-mail" />
                </Form.Item>
                <Form.Item name="password">
                    <Input type="password" placeholder="Mot de passe " />
                </Form.Item>
                <button type="submit"> Se connecter</button>
            </Form>
        </React.Fragment>
    )
}