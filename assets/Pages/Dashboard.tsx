import { Button } from 'antd';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../AppContainer';
import { Booking } from '../classes/Booking';
import { BookingModal } from "../components/BookingModal";
import { BookingPopover } from '../components/BookingPopover';
import { notificationType, openNotificationWithIcon } from '../components/generics/Notification';
import LeftNavLayout from '../components/LeftNavLayout';
import { BookingApiService } from '../services/BookingApiService';
import { BookingHelper } from '../services/helpers/BookingHelper';
import { FullCalendarHelper } from '../services/helpers/FullCalendarHelper';
import { UserHelper } from '../services/helpers/UserHelper';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { DateHelper } from '../services/helpers/DateHelper';
import { PageContent } from '../components/generics/PageContent';

export const Dashboard = () => {
    const { user } = useContext(AppContext);
    const [events, setEvents] = useState<any>([]);
    const [bookings, setBookings] = useState<Booking[]>([])
    const [date, setDate] = useState(null);
    const bookingService = new BookingApiService()
    const history = useHistory();

    const getEvents = (dates) => {
        bookingService.getCalendar(dates.startStr, dates.endStr).then(response => {
            setEvents(FullCalendarHelper.bookingsToEvents(response))
            setBookings(response)
        })
    }
    const onClickDate = (args) => {
        if (!BookingHelper.bookable(args.date)) {
            openNotificationWithIcon(notificationType.warning, "Réservation impossible", "Vous ne pouvez pas réserver moins de 15 jours avant la date prévue")
            return
        }
        setDate(args.date)
    }

    const eventRender = ({ event }) => {
        const booking = bookings.find(x => x.id == event.id)
        if (!booking) { return }
        return <BookingPopover booking={booking} event={event} />
    }

    return (
        <PageContent title="Tableau de bord">
            {!UserHelper.isAdmin(user) &&
                <React.Fragment>
                    <p> Bonjour {user.firstName} </p>
                    <Button onClick={() => history.push("/profil")}> Mon profil </Button>
                </React.Fragment>
            }
            <div className="display-flex">
                <Button onClick={() => setDate(DateHelper.addDays(new Date(), 15))}> Demande de réservation</Button>
                <div className="calendar">
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
                </div>
            </div>
            <BookingModal date={date} setDate={setDate} />
        </PageContent>

    )
}