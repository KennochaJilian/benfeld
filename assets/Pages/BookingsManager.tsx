import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Booking } from '../classes/Booking';
import { AdminBookingButtonsAction } from '../components/AdminBookingButtonsAction';
import { PageContent } from '../components/generics/PageContent';
import { BookingStatusEnum } from '../enums/BookingStatusEnum';
import { BookingApiService } from '../services/BookingApiService';
import { BookingHelper } from '../services/helpers/BookingHelper';
import { DateHelper } from '../services/helpers/DateHelper';
import { useHistory } from 'react-router-dom';

export const BookingsManager = () => {
    const [bookings, setBookings] = useState<Booking[]>();
    const bookingApiService = new BookingApiService();
    const history = useHistory();

    const loadData = () => {
        bookingApiService.getCalendar().then(response => setBookings(response))
    }

    useEffect(() => {
        loadData()
    }, [])

    const renderAction = (booking) => {
        if(booking.status !== BookingStatusEnum.pending){
            return
        }
        return <AdminBookingButtonsAction  loadData={loadData} booking={booking}/>

    }


    return (
        <PageContent title="Gestion des réservations" returnBouton={true} history={history}>
            {bookings &&
                <Table pagination={{pageSize: 5}} dataSource={bookings} >
                    <Table.Column title="Date de début" render={(date) => DateHelper.dateFormatterWithHours(date)} dataIndex={["startAt"]} key="startAt" />
                    <Table.Column title="Date de fin" render={(date) => DateHelper.dateFormatterWithHours(date)} dataIndex={["endAt"]} key="endAt" />
                    <Table.Column title="Statut" render={(status) => BookingHelper.renderStatus(status)} dataIndex={["status"]} key="status" />
                    <Table.Column title="Salle" dataIndex={["room"]} render={room => <p> {room.name}</p>} key="room" />
                    <Table.Column title="Demandeur" dataIndex={["user"]} render={(user) => <p>  {user.firstName} {user.lastName}</p>} />
                    <Table.Column title="Commentaire" dataIndex={["comment"]}/>
                    <Table.Column title="Action" render={(booking) => renderAction(booking)} key="status" />

                </Table>
            }

        </PageContent>
    )
}

