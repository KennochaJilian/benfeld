import React, { useEffect, useState } from "react";
import { BookingHelper } from "../services/helpers/BookingHelper";
import { DateHelper } from "../services/helpers/DateHelper";
import { BookingResponsiveModal } from "./BookingResponsiveModal";

export const ResponsivesLinesBooking = ({ bookings, loadData, inUserProfil = false }) => {
    const [nameColumns, setNameColumns] = useState(['Début', 'Fin', 'Statut']) ;
    const [selectedBooking, setSelectedBooking] = useState();

    useEffect(() => {
        if (!inUserProfil){
            setNameColumns([...nameColumns, 'Demandeur'])
        }
    }, [])

    return (
        <div>
            <div className="header-responsive-line">
                {nameColumns.map(name => <span> {name}</span>)}
            </div>
            <div className={`content-responsive-line ${inUserProfil ? "responsive-line-user" :""} `}>
                {bookings.map(booking =>
                    <div onClick={() => setSelectedBooking(booking)}>
                        <span>
                            {DateHelper.dateFormatterWithHours(booking.startAt)}
                        </span>
                        <span>
                            {DateHelper.dateFormatterWithHours(booking.endAt)}
                        </span>
                        <span>
                            {BookingHelper.renderStatus(booking.status)}
                        </span>
                        {!inUserProfil && <span>
                            {booking.user.firstName} {booking.user.lastName}
                        </span>}
                    </div>
                )}
            </div>
            {selectedBooking &&  <BookingResponsiveModal 
            inUserProfile={inUserProfil }selectedBooking={selectedBooking} setSelectedBooking={setSelectedBooking} loadData={loadData} />}
        </div>
    )
}