import moment from 'moment'
import {Booking} from '../../classes/Booking'
import { BookingStatusEnum } from '../../enums/BookingStatusEnum'
import {DateHelper} from './DateHelper'

export class FullCalendarHelper{

    public static getEventColor = (status) => {
        switch (status) {
            case BookingStatusEnum.pending:
                return "yellow"
            case BookingStatusEnum.cancelled:
                return "grey"
            case BookingStatusEnum.passed:
                return "grey"
            case BookingStatusEnum.refused:
                return "red"
            case BookingStatusEnum.validated:
                return "green"
        }
    }

    public static bookingsToEvents(bookings : Booking[]){
        const format = "YYYY-MM-DD"
        
        return bookings.map(booking => {
            return {
                id: booking.id,
                title: `${booking.user.firstName} ${booking.user.lastName} - ${booking.room.name}`, 
                start : booking.startAt,
                end : booking.endAt, 
                eventColor: FullCalendarHelper.getEventColor(status)
            }
        })
    }
}