import { Popover } from 'antd';
import React , {useContext} from 'react'
import { AppContext } from '../AppContainer';
import { BookingHelper } from '../services/helpers/BookingHelper';
import { DateHelper } from '../services/helpers/DateHelper';
import {UserHelper} from '../services/helpers/UserHelper'
import { AdminBookingButtonsAction } from './AdminBookingButtonsAction';

export const BookingPopover = ({event, booking}) => {
    const { user } = useContext(AppContext);

    const content = (
        <div>
          
          {/* <p> Date de début : {DateHelper.dateFormatterWithHours(booking.startAt)}</p>

          <p> Date de fin : {DateHelper.dateFormatterWithHours(booking.endAt)}</p>
          <p>Status : {BookingHelper.renderStatus(booking.status)}</p>
          {UserHelper.isAdmin(user) && BookingHelper.canManage(booking.status) && <AdminBookingButtonsAction booking={booking}/>} */}
        </div>
      );
      
    return(
        <Popover content={content} title={event.title}>
          {console.log(DateHelper.dateFormatterWithHours(booking.startAt))}
        <p> {event.title} </p>
    </Popover>
    )
}