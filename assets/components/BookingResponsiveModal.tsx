import { Modal } from "antd"
import React from "react"
import { BookingStatusEnum } from "../enums/BookingStatusEnum"
import { BookingHelper } from "../services/helpers/BookingHelper"
import { DateHelper } from "../services/helpers/DateHelper"
import { AdminBookingButtonsAction } from "./AdminBookingButtonsAction"
import { CancellingBookingButton } from "./CancellingBookingButton"

export const BookingResponsiveModal = ({ selectedBooking, setSelectedBooking, loadData, inUserProfile }) => {

    return (
        <Modal title={`Réservation`} centered={true} closable={true} visible={selectedBooking ? true : false} onCancel={() => setSelectedBooking(null)} footer={null} width={'700px'}>

            <div className="flex-column">
                <span className="title-booking-modal"> Date de début : </span>
                <span>{DateHelper.dateFormatterWithHours(selectedBooking.startAt)} </span>
            </div>
            <div className="flex-column">
                <span className="title-booking-modal">Date de fin : </span>
                <span> {DateHelper.dateFormatterWithHours(selectedBooking.endAt)} </span>
            </div>
            <div className="flex-column">
                <span className="title-booking-modal"> Statut : </span>
                <span>{BookingHelper.renderStatus(selectedBooking.status)}</span>
            </div>
            {!inUserProfile &&
                <div className="flex-column">
                    <span className="title-booking-modal"> Demandeur : </span>
                    <span> {selectedBooking.user.firstName} {selectedBooking.user.lastName} </span>
                </div>
            }
            {selectedBooking.comment &&
                <div className="flex-column">
                    <span className="title-booking-modal"> Commentaire : </span>
                    <span> {selectedBooking.comment}</span>
                </div>
            }
            {selectedBooking.cancellingReason &&
                <div className="flex-column">
                    <span className="title-booking-modal"> Commentaire : </span>
                    <span> {selectedBooking.cancellingReason}</span>
                </div>
            }
            {inUserProfile && selectedBooking.status === BookingStatusEnum.pending &&
                <div className="flex-column">
                    <span className="title-booking-modal"> Annuler : </span>
                    <span> <CancellingBookingButton booking={selectedBooking}/> </span>
                </div>           
            }

            {selectedBooking.status === BookingStatusEnum.pending &&
                <div className="flex-column actions-container-modal">
                    <span className="title-booking-modal"> Action </span>
                    <AdminBookingButtonsAction loadData={loadData} booking={selectedBooking} />
                </div>}

        </Modal>

    )
}