import { Button } from 'antd';
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../AppContainer';
import { Booking } from '../classes/Booking';
import { BookingModal } from "../components/BookingModal";
import { BookingPopover } from '../components/BookingPopover';
import { notificationType, openNotificationWithIcon } from '../components/generics/Notification';
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
import "../css/dashboard.less"

export const Dashboard = () => {
    const { user } = useContext(AppContext);
    const [events, setEvents] = useState<any>([]);
    const [bookings, setBookings] = useState<Booking[]>([])
    const [date, setDate] = useState(null);
    const [dates, setDates] =useState(null); 
    const bookingService = new BookingApiService()
    const history = useHistory();

    const loadData = () => {
        bookingService.getCalendar(dates.startStr, dates.endStr).then(response => {
            setEvents(FullCalendarHelper.bookingsToEvents(response))
            setBookings(response)
        })
    }

    useEffect(() => {
        if(!dates){return}
        loadData()
    }, [dates])

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
        return <BookingPopover loadData={loadData} booking={booking} event={event} />
    }

    return (
        <PageContent title="Tableau de bord">
            {!UserHelper.isAdmin(user) &&
                <React.Fragment>
                    <p> Bonjour {user.firstName} </p>
                    <Button onClick={() => history.push("/profil")}> Mon profil </Button>
                </React.Fragment>
            }
            <div>
                <Button type="primary" className="button-ask-booking" onClick={() => setDate(DateHelper.addDays(new Date(), 15))}> Demande de réservation</Button>
                <div className="calendar-container">

                <div className="calendar">
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                        initialView="dayGridMonth"
                        locale="fr"
                        events={events}
                        datesSet={(dates) => setDates(dates)}
                        dateClick={onClickDate}
                        eventContent={eventRender}
                        headerToolbar={{
                            center: 'dayGridMonth,timeGridWeek,timeGridDay',
                        }}
                    />
                </div>
                </div>
            </div>
            <BookingModal loadData={loadData} bookings={bookings} date={date} setDate={setDate} />
        </PageContent>

    )
}