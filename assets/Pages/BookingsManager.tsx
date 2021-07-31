import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ResponsiveContext } from '../AppContainer';
import { Booking } from '../classes/Booking';
import { AdminBookingButtonsAction } from '../components/AdminBookingButtonsAction';
import { PageContent } from '../components/generics/PageContent';
import { ResponsivesLinesBooking } from '../components/ResponsivesLinesBooking';
import { TableBookings } from '../components/TableBookings';
import "../css/bookingsManager.less";
import { BookingStatusEnum } from '../enums/BookingStatusEnum';
import { BookingApiService } from '../services/BookingApiService';

export const BookingsManager = () => {
    const [bookings, setBookings] = useState<Booking[]>();
    const bookingApiService = new BookingApiService();
    const history = useHistory();
    const responsiveContext = useContext(ResponsiveContext);

    const loadData = () => {
        bookingApiService.getCalendar().then(response => setBookings(response))
    }

    useEffect(() => {
        loadData()
    }, [])

    


    return (
        <PageContent title="Gestion des réservations" returnBouton={true} history={history}>
            <div id="bookings-manager-container">
                {bookings &&
                <React.Fragment>
                    {responsiveContext.responsiveData.isPhone ? <ResponsivesLinesBooking loadData={loadData} bookings={bookings}/> : <TableBookings bookings={bookings} loadData={loadData}/>}
                </React.Fragment>                   
                }
            </div>
        </PageContent>
    )
}

