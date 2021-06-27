import { Booking } from '../../classes/Booking';
import { BookingStatusEnum } from '../../enums/BookingStatusEnum';

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
}