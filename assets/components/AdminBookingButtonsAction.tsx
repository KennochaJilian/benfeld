import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'
import React from 'react'
import { BookingStatusEnum } from '../enums/BookingStatusEnum'
import { BookingApiService } from '../services/BookingApiService'
import { notificationType, openNotificationWithIcon } from './generics/Notification'

export const AdminBookingButtonsAction = ({ booking }) => {
    const bookingService = new BookingApiService();


    const onClickButton = (action) => {
        bookingService.update(booking.id,
            { status: action == "deny" ? BookingStatusEnum.refused : BookingStatusEnum.validated }).then(response => {
                openNotificationWithIcon(notificationType.success, "Modification prise en compte", "Le statut de la résrvation a été modifié avec succès")
            })
    }

    return (
        <div className="flex-between">
            <Popconfirm
                title={"Refuser la réservation ? "}
                onConfirm={() => onClickButton("deny")}
                okText="Oui"
                cancelText="Non" >
                <Button danger={true} type="link"> <CloseOutlined /></Button>
            </Popconfirm>
            <Button onClick={() => onClickButton("validate")} type="link"> <CheckOutlined /> </Button>
        </div>
    )
}