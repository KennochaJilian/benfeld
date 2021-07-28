import { Button, Col, DatePicker, Form, Modal, Row, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContainer';
import Room from '../classes/Room';
import { BookingApiService } from '../services/BookingApiService';
import { BookingHelper } from '../services/helpers/BookingHelper';
import { RoomApiService } from '../services/RoomApiService';
import { notificationType, openNotificationWithIcon } from './generics/Notification';

export const BookingModal = ({ date, setDate, bookings, loadData }) => {
    const { user } = useContext(AppContext);
    const roomService = new RoomApiService();
    const bookingService = new BookingApiService();
    const [rooms, setRooms] = useState<Room[]>();

    useEffect(() => {
        roomService.list().then(response => setRooms(response))
    }, [])

    const onSubmit = (values) => {

        const payload = bookingService.getBookingPayload(user, values)

        if (!BookingHelper.canBooking(values.startAt, values.endAt, values.room, bookings)) {
            openNotificationWithIcon(notificationType.warning, "Réservation impossible", "Votre réservation chevauche une réservation validée existante")
            return
        }
        if (!BookingHelper.bookable(values.startAt)) {
            openNotificationWithIcon(notificationType.warning, "Réservation impossible", "Vous ne pouvez pas réserver moins de 15 jours avant la date prévue")
            return
        }
        bookingService.create(payload).then(response => {
            openNotificationWithIcon(notificationType.success, "Demande de réservation effectuée", "Votre demande a bien été prise en compte")
            loadData()
            setDate(null)
        }).catch(response => {
            openNotificationWithIcon(notificationType.error, "Demande non prise en compte", "Une erreur est survenue")
        })
    }
    const disabledDateTime = () => {
        return {
            disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7, 23]
        }
    }

    return (
        <Modal className="booking-modal" title={"Demande de reservation"} centered={true} closable={true} visible={date ? true : false} onCancel={() => setDate(null)} footer={null} width={'700px'}>
            <Form layout="vertical" onFinish={onSubmit}>
                <Row>
                    <Col md={12}>
                        <div className="info-form-container"> 
                            <p> Nom </p>
                            <p className="info-form">{user.firstName} {user.lastName} </p>
                        </div>
                        <Form.Item name="startAt" label="Date de début" initialValue={moment(date)}>
                            <DatePicker disabledTime={disabledDateTime} minuteStep={15} showTime format={'DD/MM/YYYY, HH:mm'} />
                        </Form.Item>
                        <Form.Item name="endAt" label="Date de fin" initialValue={moment(date)}>
                            <DatePicker disabledTime={disabledDateTime} minuteStep={15} showTime format={'DD/MM/YYYY, HH:mm'} />
                        </Form.Item>
                    </Col>
                    <Col md={12}>
                        <div className="info-form-container"> 
                            <p> Sport</p>
                            <p className="info-form"> {user.sport.name} </p>
                        </div>
                        <Form.Item name="room" label="Salle">
                            {rooms && <Select>
                                {rooms.map(room => <Select.Option className="sport-options" value={room.id}>{room.name} </Select.Option>)}
                            </Select>}
                        </Form.Item>
                        <Form.Item name="comment" label="Commentaire">
                            <TextArea placeholder="Laisser un commentaire" />
                        </Form.Item>
                        <div className="flex-end">
                            <Button htmlType="submit" type='primary'> Reserver ! </Button>
                        </div>
                    </Col>
                </Row>
            </Form>

        </Modal>

    )
}