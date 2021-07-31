import { Button, Form, Input, Modal } from 'antd'
import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react'
import { Rules } from '../classes/Rules';
import { RoomApiService } from '../services/RoomApiService';
import { SportApiService } from '../services/SportApiService';
import { notificationType, openNotificationWithIcon } from './generics/Notification';

export const ManageAppModals = ({dataToManage, setDataToManage, loadData}) => {
    const sportApiService = new SportApiService(); 
    const roomApiService = new RoomApiService();  
    const requiredRules = [Rules.Required];

    const [form] = useForm()

    const onSuccessCreated = (data) => {
        window.addEventListener("keydown", (e) => {
            if (e.keyCode == 13){
                form.submit()
            }
        })

        form.resetFields()
        openNotificationWithIcon(notificationType.success, `${data} créé`, `Vous avez bien ajouté un ${data}`)
        setDataToManage(null)
        loadData()
    }
    const onSubmit = (values) => {
        window.addEventListener("keydown", (e) => {
            if (e.keyCode == 13){
                e.preventDefault()
            }
        })

        if (dataToManage == "sport"){
            sportApiService.create(values).then(response => {
                onSuccessCreated('sport')
                
            })
            return
        }
        roomApiService.create(values).then(response => {
            onSuccessCreated('salle')
        })
        
    }
    const onCloseModal = () => {
        setDataToManage(null)
        form.resetFields();
    }


    return(
        <Modal title={"Ajout"} centered={true} closable={true} visible={dataToManage ? true : false} onCancel={() => onCloseModal()} footer={null} width={'700px'}>
            <Form form={form} onFinish={onSubmit}>
                <Form.Item rules={requiredRules} name="name" label="Nom">
                    <Input/>
                </Form.Item>
                <Button htmlType="submit" type='primary'> Ajouter ! </Button>
            </Form>

        </Modal> 
    )
}