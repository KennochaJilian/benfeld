import { Form, Input } from 'antd';
import React, { useContext } from 'react';
import { AppContext } from "../AppContainer";
import { AuthApiService } from '../services/AuthApiService';

export const Login = () => {
    const authService = new AuthApiService();
    const { user } = useContext(AppContext);

    const onSubmit = (values) => {
        authService.login(values).then(response => {
            console.log(response)
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