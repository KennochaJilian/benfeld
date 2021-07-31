import { Button, Popconfirm } from "antd";
import React from "react"
import { BookingStatusEnum } from "../enums/BookingStatusEnum";
import { BookingApiService } from "../services/BookingApiService";
import { notificationType, openNotificationWithIcon } from "./generics/Notification";
import { CloseOutlined } from '@ant-design/icons';

export const CancellingBookingButton = ({booking}) => {
    const bookingApiService = new BookingApiService();
    
    const onClickButton = (booking) => {
        bookingApiService.update(booking.id, { status: BookingStatusEnum.cancelled }).then(response => {
            openNotificationWithIcon(notificationType.success, "Réservation mise à jour", "")
        })
    }
        return (
            <React.Fragment>
                {booking.status === BookingStatusEnum.pending &&
                    <div className="flex-between">
                        <Popconfirm
                            title={"Annuler la réservation"}
                            onConfirm={() => onClickButton(booking)}
                            okText="Oui"
                            cancelText="Non" >
                            <Button danger={true} type="link"> <CloseOutlined /></Button>
                        </Popconfirm>
                    </div>
                }
            </React.Fragment>
        )
    
}