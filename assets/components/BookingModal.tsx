import { Button, DatePicker, Form, Modal, Select } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContainer';
import Room from '../classes/Room';
import { RoomApiService } from '../services/RoomApiService';
import moment from 'moment';
import { BookingApiService } from '../services/BookingApiService';
import { notificationType, openNotificationWithIcon } from './generics/Notification';

export const BookingModal = ({ date, setDate }) => {
    const { user } = useContext(AppContext);
    const roomService = new RoomApiService();
    const bookingService = new BookingApiService(); 
    const [rooms, setRooms] = useState<Room[]>();


    useEffect(() => {
        
        roomService.list().then(response => setRooms(response))
    }, [])

    const onSubmit = (values) => {
        const payload = bookingService.getBookingPayload(user,values)
        bookingService.create(payload).then(response => {
            openNotificationWithIcon(notificationType.success, "Demande de réservation effectuée" , "Votre demande a bien été prise en compte")
            setDate(null)
        }).catch(response => {
            openNotificationWithIcon(notificationType.error, "Demande non prise en compte", "Une erreur est survenue")
        })
    }

    return (
        <Modal title={"Demande de reservation"} centered={true} closable={true} visible={date ? true : false} onCancel={() => setDate(null)} footer={null} width={'700px'}>
            <Form onFinish={onSubmit}>
                <p> Nom : {user.firstName} {user.lastName} </p>
                {user.sport && <p> Sport : {user.sport} </p>}
                <Form.Item name="startAt" label="Date de début" initialValue={moment(date)}>
                    <DatePicker minuteStep={15} showTime  format={'DD/MM/YYYY, HH:mm'} />
                </Form.Item>
                <Form.Item name="endAt" label="Date de fin">
                    <DatePicker minuteStep={15} showTime format={'DD/MM/YYYY, HH:mm'}/>
                </Form.Item>
                <Form.Item name="room" label="Salle">
                    {rooms && <Select>
                        {rooms.map(room => <Select.Option value={room.id}>{room.name} </Select.Option>)}
                    </Select>}
                </Form.Item>
                <Button htmlType="submit" type='primary'> Reserver ! </Button>
            </Form>

        </Modal>

    )
}