import moment from 'moment'
import {Booking} from '../../classes/Booking'
import {DateHelper} from './DateHelper'

export class FullCalendarHelper{

    public static bookingsToEvents(bookings : Booking[]){
        const format = "YYYY-MM-DD"
        
        return bookings.map(booking => {
            return {
                id: booking.id,
                title: `${booking.user.firstName} ${booking.user.lastName} - ${booking.room.name}`, 
                start : moment(booking.startAt).format(format),
                end : moment(booking.endAt).format(format)
            }
        })
    }
}