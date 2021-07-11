import axios from "axios";
import { GenericApiService } from "./GenericApiService";
import {FullCalendarHelper} from "./helpers/FullCalendarHelper"
import moment from 'moment-timezone';
import { DateHelper } from "./helpers/DateHelper";

export class BookingApiService extends GenericApiService {
    constructor() {
        super('bookings');
    }
    getCalendar(startDate=null, endDate=null) {
        let url = `${this.baseUrl}/calendar`
        if(startDate && endDate){
            url += `?start_date=${startDate}&end_date=${endDate}`
        }
        return axios.get(url).then(r => r.data)
    }

    getBookingPayload(user, value){
        const format = "YYYY-MM-DD hh:mm"

        return({
            startAt: moment(value.startAt).tz("Europe/Paris").format(format), 
            endAt :moment(value.endAt).tz("Europe/Paris").format(format),
            status : "pending", 
            createdAt : moment(new Date()).tz("Europe/Paris").format(format), 
            updatedAt : moment(new Date()).tz("Europe/Paris").format(format), 
            user : `api/users/${user.id}`,
            room : `api/rooms/${value.room}`, 
            comment: value.comment
        })

    }

    
}