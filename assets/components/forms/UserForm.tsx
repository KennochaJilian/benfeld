import { Button, Form, Input, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react';
import { Rules } from '../../classes/Rules';
import Sport from '../../classes/Sport';
import { AuthApiService } from '../../services/AuthApiService';
import { SportApiService } from '../../services/SportApiService';
import { notificationType, openNotificationWithIcon } from '../generics/Notification';

export const UserForm = ({ setIsModalOpen, loadData }) => {

    const authService = new AuthApiService();
    const [sports, setSports] = useState<Sport[]>();
    const sportApiService = new SportApiService();
    const [form] = useForm(); 
    const requiredRules = [Rules.Required];

    useEffect(() => {
        sportApiService.list().then(response => setSports(response))
    }, [])

    const onSubmit = (values) => {
        values.sport = `api/sports/${values.sport}`
        authService.register(values).then(response => {
            setIsModalOpen(false);
            openNotificationWithIcon(notificationType.success, "Utilisateur créé", "Le nouvel utilisateur a bien été créé")
            loadData()
            form.resetFields()

        }).catch(response => {
            openNotificationWithIcon(notificationType.error, "Une erreur s'est produite", "")
        })
        
    }

    return (
        <Form form={form} onFinish={onSubmit} layout="vertical">
            <Form.Item rules={requiredRules} name="email">
                <Input type="email" placeholder="Addresse e-mail" />
            </Form.Item>
            <Form.Item rules={requiredRules} name="password">
                <Input type="password" placeholder="Mot de passe " />
            </Form.Item>
            <Form.Item rules={requiredRules} name="firstName">
                <Input type="text" placeholder="Prénom" />
            </Form.Item>
            <Form.Item rules={requiredRules} name="lastName">
                <Input type="text" placeholder="Nom" />
            </Form.Item>
            <Form.Item rules={requiredRules}  name="phoneNumber">
                <Input type="phone" placeholder="Téléphone" />
            </Form.Item>
            <Form.Item name="sport" label="Sport">
                {sports && <Select>
                    {sports.map(room => <Select.Option className="sport-options" value={room.id}>{room.name} </Select.Option>)}
                </Select>}
            </Form.Item>
            <div className="flex-end">
                <Button type="primary" htmlType="submit"> Créer utilisateur</Button>
            </div>
        </Form>
    )
}