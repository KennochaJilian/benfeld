import { Table } from "antd"
import React from "react"
import { BookingStatusEnum } from "../enums/BookingStatusEnum"
import { BookingHelper } from "../services/helpers/BookingHelper"
import { DateHelper } from "../services/helpers/DateHelper"
import { AdminBookingButtonsAction } from "./AdminBookingButtonsAction"

export const TableBookings = ({bookings, loadData}) => {
    const renderAction = (booking) => {
        if (booking.status !== BookingStatusEnum.pending) {
            return
        }
        return <AdminBookingButtonsAction loadData={loadData} booking={booking} />

    }
    
    return(
        <Table pagination={{ pageSize: 5 }} dataSource={bookings} >
        <Table.Column title="Date de début" render={(date) => DateHelper.dateFormatterWithHours(date)} dataIndex={["startAt"]} key="startAt" />
        <Table.Column title="Date de fin" render={(date) => DateHelper.dateFormatterWithHours(date)} dataIndex={["endAt"]} key="endAt" />
        <Table.Column title="Statut" render={(status) => BookingHelper.renderStatus(status)} dataIndex={["status"]} key="status" />
        <Table.Column title="Salle" dataIndex={["room"]} render={room => <p> {room.name}</p>} key="room" />
        <Table.Column title="Demandeur" dataIndex={["user"]} render={(user) => <p>  {user.firstName} {user.lastName}</p>} />
        <Table.Column title="Commentaire" dataIndex={["comment"]} />
        <Table.Column title="Action" render={(booking) => renderAction(booking)} key="status" />
    </Table>
    )
}