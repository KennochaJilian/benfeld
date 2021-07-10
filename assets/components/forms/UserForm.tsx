import React, { useEffect, useState } from 'react';
import  { Input, Form, Button, Select }  from 'antd';
import { AuthApiService } from '../../services/AuthApiService';
import { notificationType, openNotificationWithIcon } from '../generics/Notification';
import Sport from '../../classes/Sport';
import { SportApiService } from '../../services/SportApiService';

export const UserForm = ({setIsModalOpen, loadData}) => {

    const authService = new AuthApiService();
    const [sports,setSports] = useState<Sport[]>();
    const sportApiService = new SportApiService(); 
    
    useEffect(() => {
        sportApiService.list().then(response => setSports(response))
    }, [])

    const onSubmit = (values) => {   
        values.sport = `api/sports/${values.sport}`     
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
            <Form.Item name="sport" label="Sport">
                    {sports && <Select>
                        {sports.map(room => <Select.Option value={room.id}>{room.name} </Select.Option>)}
                    </Select>}
                </Form.Item>
        <Button type="primary" htmlType="submit"> Créer utilisateur</Button>
        </Form>
    )
}