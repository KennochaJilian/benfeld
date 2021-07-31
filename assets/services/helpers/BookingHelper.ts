import { Booking } from '../../classes/Booking';
import { BookingStatusEnum } from '../../enums/BookingStatusEnum';
import { DateHelper } from './DateHelper';

export class BookingHelper {
    public static renderStatus(status) {
        switch (status) {
            case BookingStatusEnum.pending:
                return "En attente"
            case BookingStatusEnum.cancelled:
                return "Annulée"
            case BookingStatusEnum.passed:
                return "Passée"
            case BookingStatusEnum.refused:
                return "Refusée"
            case BookingStatusEnum.validated:
                return "Validée"
        }
    }
    public static canManage(status){
        return status !== BookingStatusEnum.refused && status !== BookingStatusEnum.validated 
    }

    public static bookable(dateAsk){
        let date = new Date(dateAsk)

        return +date > +DateHelper.addDays(new Date(), 14)
    }

    public static checkIfDatesOverlap(a,b){
        b.startAt = new Date(b.startAt); 
        b.endAt = new Date(b.endAt)
        return !(b.startAt <= a.startAt && a.startAt <= b.endAt) &&
               !(b.startAt <= a.endAt && a.endAt <= b.endAt) 
    }

    public static canBooking(startAt, endAt, askedRoomId, bookings:Booking[]){
        return !bookings.every(booking => !this.checkIfDatesOverlap({startAt,endAt}, booking) && booking.room.id == askedRoomId && booking.status != BookingStatusEnum.pending)       
    }

}