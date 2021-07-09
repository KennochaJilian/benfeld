import React from 'react';
import  { Input, Form, Button }  from 'antd';
import { AuthApiService } from '../../services/AuthApiService';
import { notificationType, openNotificationWithIcon } from '../generics/Notification';

export const UserForm = ({setIsModalOpen, loadData}) => {

    const authService = new AuthApiService();

    const onSubmit = (values) => {        
        authService.register(values).then(response => {
            setIsModalOpen(false);
            openNotificationWithIcon(notificationType.success, "Utilisateur créé", "Le nouvel utilisateur a bien été créé")
            loadData()
            
        }).catch(response => {
            openNotificationWithIcon(notificationType.error, "Une erreur s'est produite", "")     
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
            <Form.Item name="phoneNumber">
                <Input type="phone" placeholder="Téléphone" />
            </Form.Item>
        <Button type="primary" htmlType="submit"> Créer utilisateur</Button>
        </Form>
    )
}