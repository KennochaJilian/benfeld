import { CloseOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Select, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { $enum } from "ts-enum-util";
import { AppContext } from '../AppContainer';
import { Booking } from '../classes/Booking';
import { BookingStatusEnum } from '../enums/BookingStatusEnum';
import { BookingApiService } from '../services/BookingApiService';
import { BookingHelper } from '../services/helpers/BookingHelper';
import { DateHelper } from '../services/helpers/DateHelper';
import { UserApiService } from '../services/UserApiService';
import { notificationType, openNotificationWithIcon } from './generics/Notification';

export const UserBookings = () => {

    const [userBookings, setUserBookings] = useState<Booking[]>();
    const userApiService = new UserApiService();
    const bookingApiService = new BookingApiService();
    const { user } = useContext(AppContext);
    const [status, setStatus] = useState<string>();

    const getBookings = (status = null) => {
        userApiService.getUserBookings(user.id, status).then(response => {
            setUserBookings(response)
        })
    }

    useEffect(() => {
        if (!user) { return }
        getBookings()
    }, [])
    useEffect(() => { getBookings(status) }, [status])

    const onClickButton = (booking) => {
        bookingApiService.update(booking.id, { status: BookingStatusEnum.cancelled }).then(response => {
            openNotificationWithIcon(notificationType.success, "Réservation mise à jour", "")
        })
    }

    const renderPopoverCancelling = (booking) => {
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



    return (
        <div className="user-bookings">
            <p> Vos réservations : </p>
            <div className="select-container">
                <Select placeholder="Filtrer..." className="select-sport" onChange={(value: string) => setStatus(value)}>
                    {$enum(BookingStatusEnum).map(v => <Select.Option value={v}> {BookingHelper.renderStatus(v)} </Select.Option>)}

                </Select>
                <Button onClick={() => setStatus(null)} className="btn-profil" type="primary"> Toutes les réservations</Button>

            </div>
            {userBookings &&
                <Table pagination={{ pageSize: 5 }} dataSource={userBookings}>
                    <Table.Column title="Date de début" render={(date) => DateHelper.dateFormatterWithHours(date)} dataIndex={["startAt"]} key="startAt" />
                    <Table.Column title="Date de fin" render={(date) => DateHelper.dateFormatterWithHours(date)} dataIndex={["endAt"]} key="endAt" />
                    <Table.Column title="Statut" render={(status) => BookingHelper.renderStatus(status)} dataIndex={["status"]} key="status" />
                    <Table.Column title="Raison d'annulation" dataIndex={["cancellingReason"]} key="cancellingReason" />
                    <Table.Column title="Action" render={(booking) => renderPopoverCancelling(booking)} key="cancellingReason" />


                </Table>
            }

        </div>
    )
}