import axios from "axios";
import { GenericApiService } from "./GenericApiService";
import {FullCalendarHelper} from "./helpers/FullCalendarHelper"
import moment from 'moment';

export class BookingApiService extends GenericApiService {
    constructor() {
        super('bookings');
    }
    getCalendar(startDate, endDate) {
        const url = `${this.baseUrl}/calendar?start_date=${startDate}&end_date=${endDate}`
        return axios.get(url).then(r => r.data)
    }

    getBookingPayload(user, value){

        return({
            startAt : moment(value.startAt).toDate(), 
            endAt : moment(value.endAt).toDate(),
            status : "pending", 
            createdAt : new Date(), 
            updatedAt : new Date(), 
            user : `api/users/${user.id}`,
            room : `api/rooms/${value.room}`
        })

    }

    
}