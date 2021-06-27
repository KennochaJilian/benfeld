import React from 'react';
import  { Input, Form }  from 'antd';
import { AuthApiService } from '../../services/AuthApiService';

export const UserForm = ({setIsModalOpen}) => {

    const authService = new AuthApiService();

    const onSubmit = (values) => {
        console.log(values);
        
        authService.register(values).then(response => {
            setIsModalOpen(false);
            console.log("response ", response);
            
        }).catch(response => {
            console.log("errooor ", response);     
        })
    }

    return (
        <Form onFinish={onSubmit} layout="vertical">
            <Form.Item name="email">
                <Input type="email" placeholder="Addresse e-mail" />
            </Form.Item>
            <Form.Item name="password">
                <Input type="password" placeholder="Mot de passe " />
            </Form.Item>
            <Form.Item name="firstName">
                <Input type="text" placeholder="Prénom" />
            </Form.Item>
            <Form.Item name="lastName">
                <Input type="text" placeholder="Nom" />
            </Form.Item>
        <button type="submit">Enregistrer</button>
        </Form>
    )
}