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
    public static canManage(status) {
        return status !== BookingStatusEnum.refused && status !== BookingStatusEnum.validated
    }

    public static bookable(dateAsk) {
        let date = new Date(dateAsk)

        return +date > +DateHelper.addDays(new Date(), 14)
    }

    public static checkIfDatesOverlap(a, b) {
        
        a.startAt = new Date(a.startAt)
        a.endAt = new Date(a.endAt)

        b.startAt = new Date(b.startAt);
        b.endAt = new Date(b.endAt)

        if (a.startAt <= b.startAt && b.startAt <= a.endAt) return true; // b starts in a
        if (a.startAt <= b.endAt   && b.endAt   <= a.endAt) return true; // b ends in a
        if (b.startAt <  a.startAt && a.endAt   <  b.endAt) return true; // a in b
        return false;
    }

    public static canBooking(startAt, endAt, askedRoomId, bookings: Booking[]) {
        let canBooking = true;        
        bookings.forEach(booking => {
            console.log(this.checkIfDatesOverlap(booking, { startAt, endAt } ))
            if(this.checkIfDatesOverlap(booking, { startAt, endAt } )){
                if(booking.room.id == askedRoomId){
                    if(booking.status == BookingStatusEnum.validated){
                        return canBooking = false; 
                    }
                }
            }            
        }) 
        return canBooking
    }

}