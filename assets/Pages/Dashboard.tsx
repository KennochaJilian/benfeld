import React, { useContext, useState } from 'react';
import { AppContext } from '../AppContainer';
import { BookingModal } from "../components/BookingModal";
import { BookingApiService } from '../services/BookingApiService';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import { Booking } from '../classes/Booking';
import { FullCalendarHelper } from '../services/helpers/FullCalendarHelper';
import { BookingPopover } from '../components/BookingPopover';

export const Dashboard = () => {
    let calendar;
    const { user } = useContext(AppContext);
    const [events, setEvents] = useState<any>([]);
    const [bookings, setBookings] =useState<Booking[]>([])
    const [date, setDate] = useState(null);
    const bookingService = new BookingApiService()

    const getEvents = (dates) => {
        bookingService.getCalendar(dates.startStr, dates.endStr).then(response => {
            setEvents(FullCalendarHelper.bookingsToEvents(response))
            setBookings(response)
        } )
    }
    const onClickDate = (args) => {
        console.log(args.date)
        setDate(args.date)
    }

    const eventRender = ({event}) => {
        const booking = bookings.find(x => x.id == event.id)
        if(!booking){return}
        return <BookingPopover booking={booking} event={event}/>
    }

    return (
        <React.Fragment>
            <p> Dashboard</p>
            <p> Bonjour {user.firstName} </p>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale="fr"
                events={events}
                datesSet={(dates) => getEvents(dates)}
                dateClick={onClickDate}
                eventContent={eventRender}

            />
            <BookingModal date={date} setDate={setDate} />

        </React.Fragment>

    )
}