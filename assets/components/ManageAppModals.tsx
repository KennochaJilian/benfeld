import { Button, Form, Input, Modal } from 'antd'
import React from 'react'
import { RoomApiService } from '../services/RoomApiService';
import { SportApiService } from '../services/SportApiService';
import { notificationType, openNotificationWithIcon } from './generics/Notification';

export const ManageAppModals = ({dataToManage, setDataToManage, loadData}) => {
    const sportApiService = new SportApiService(); 
    const roomApiService = new RoomApiService(); 

    const onSuccessCreated = (data) => {
        openNotificationWithIcon(notificationType.success, `${data} créé`, `Vous avez bien ajouté un ${data}`)
        setDataToManage(null)
        loadData()
    }
    const onSubmit = (values) => {
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

    return(
        <Modal title={"Ajout"} centered={true} closable={true} visible={dataToManage ? true : false} onCancel={() => setDataToManage(null)} footer={null} width={'700px'}>
            <Form onFinish={onSubmit}>
                <Form.Item name="name" label="Nom">
                    <Input/>
                </Form.Item>
                <Button htmlType="submit" type='primary'> Ajouter ! </Button>
            </Form>

        </Modal> 
    )
}