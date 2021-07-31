import { Button, Select, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { $enum } from "ts-enum-util";
import { AppContext, ResponsiveContext } from '../AppContainer';
import { Booking } from '../classes/Booking';
import { BookingStatusEnum } from '../enums/BookingStatusEnum';
import { BookingHelper } from '../services/helpers/BookingHelper';
import { DateHelper } from '../services/helpers/DateHelper';
import { UserApiService } from '../services/UserApiService';
import { CancellingBookingButton } from './CancellingBookingButton';
import { ResponsivesLinesBooking } from './ResponsivesLinesBooking';

export const UserBookings = () => {

    const [userBookings, setUserBookings] = useState<Booking[]>();
    const userApiService = new UserApiService();

    const { user } = useContext(AppContext);
    const [status, setStatus] = useState<string>();
    const responsiveContext = useContext(ResponsiveContext)

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
                <React.Fragment>
                    {responsiveContext.responsiveData.isPhone ?
                        <ResponsivesLinesBooking bookings={userBookings} inUserProfil={true} loadData={getBookings} />
                        :
                        <Table pagination={{ pageSize: 5 }} dataSource={userBookings}>
                            <Table.Column title="Date de début" render={(date) => DateHelper.dateFormatterWithHours(date)} dataIndex={["startAt"]} key="startAt" />
                            <Table.Column title="Date de fin" render={(date) => DateHelper.dateFormatterWithHours(date)} dataIndex={["endAt"]} key="endAt" />
                            <Table.Column title="Statut" render={(status) => BookingHelper.renderStatus(status)} dataIndex={["status"]} key="status" />
                            <Table.Column title="Raison d'annulation" dataIndex={["cancellingReason"]} key="cancellingReason" />
                            <Table.Column title="Action" render={(booking) => <CancellingBookingButton booking={booking} />} key="cancellingReason" />
                        </Table>}
                </React.Fragment>
            }
        </div>
    )
}