import React, { useContext, useState } from 'react';
import { AppContext } from '../AppContainer';
import { BookingModal } from "../components/BookingModal";
import { BookingApiService } from '../services/BookingApiService';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Booking } from '../classes/Booking';
import { FullCalendarHelper } from '../services/helpers/FullCalendarHelper';
import { BookingPopover } from '../components/BookingPopover';
import { BookingHelper } from '../services/helpers/BookingHelper';
import { notificationType, openNotificationWithIcon } from '../components/generics/Notification';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

export const Dashboard = () => {
    let calendar;
    const { user } = useContext(AppContext);
    const [events, setEvents] = useState<any>([]);
    const [bookings, setBookings] =useState<Booking[]>([])
    const [date, setDate] = useState(null);
    const bookingService = new BookingApiService()
    const history = useHistory();

    const getEvents = (dates) => {
        bookingService.getCalendar(dates.startStr, dates.endStr).then(response => {
            setEvents(FullCalendarHelper.bookingsToEvents(response))
            setBookings(response)
        } )
    }
    const onClickDate = (args) => {
        if(!BookingHelper.bookable(args.date)){
            openNotificationWithIcon(notificationType.warning, "Réservation impossible", "Vous ne pouvez pas réserver moins de 15 jours avant la date prévue")
            return
        }
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
            <Button onClick={() => history.push("/profil")}> Mon profil </Button>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                locale="fr"
                events={events}
                datesSet={(dates) => getEvents(dates)}
                dateClick={onClickDate}
                eventContent={eventRender}
                headerToolbar={{
                    center: 'dayGridMonth,timeGridWeek,timeGridDay',
                  }}

            />
            <BookingModal date={date} setDate={setDate} />

        </React.Fragment>

    )
}