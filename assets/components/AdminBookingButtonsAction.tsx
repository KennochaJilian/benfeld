import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Button, Input, Popconfirm } from 'antd'
import React, { useState } from 'react'
import { BookingStatusEnum } from '../enums/BookingStatusEnum'
import { BookingApiService } from '../services/BookingApiService'
import { notificationType, openNotificationWithIcon } from './generics/Notification'

export const AdminBookingButtonsAction = ({ booking, loadData=null }) => {
    const bookingService = new BookingApiService();
    const [cancellingReason, setCancellingReason] = useState<string>(); 


    const onClickButton = (action) => {
        bookingService.update(booking.id,
            { status: action == "deny" ? BookingStatusEnum.refused : BookingStatusEnum.validated, cancellingReason }).then(response => {
                openNotificationWithIcon(notificationType.success, "Modification prise en compte", "Le statut de la réservation a été modifié avec succès")
                loadData()
            })
    }

    const popConfirm = () => {
        return(
            <React.Fragment>
                <p> Refuser la réservation </p>
                <Input placeholder={"Indiquer une raison d'annulation"} onChange={e => setCancellingReason(e.target.value)}/> 
            </React.Fragment>
        )
    }

    return (
        <div className="flex-between">
            <Popconfirm
                title={popConfirm()}
                onConfirm={() => onClickButton("deny")}
                okText="Oui"
                cancelText="Non" >
                <Button danger={true} type="link"> <CloseOutlined /></Button>
            </Popconfirm>
            <Button onClick={() => onClickButton("validate")} type="link"> <CheckOutlined /> </Button>
        </div>
    )
}