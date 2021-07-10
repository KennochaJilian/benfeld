import { Select, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../AppContainer';
import { Booking } from '../classes/Booking';
import { BookingStatusEnum } from '../enums/BookingStatusEnum';
import { DateHelper } from '../services/helpers/DateHelper';
import { UserApiService } from '../services/UserApiService';
import { $enum } from "ts-enum-util";
import { BookingHelper } from '../services/helpers/BookingHelper';

export const UserBookings = () => {
    
    const [userBookings, setUserBookings] = useState<Booking[]>();
    const userApiService = new UserApiService();
    const { user } = useContext(AppContext);
    const [status,setStatus] = useState<string>(); 

    const getBookings = (status=null) => {
        userApiService.getUserBookings(user.id, status).then(response =>{
            setUserBookings(response)
        })
    } 
    
    useEffect(() => {
        if (!user) { return }
        getBookings()
    }, [])
    useEffect(() =>{getBookings(status)}, [status])

    

    return(
        <React.Fragment>
            <p> Vos réservations : </p>
                <Select className="select-sport" onChange={(value:string) => setStatus(value)}>
                    {$enum(BookingStatusEnum).map(v => <Select.Option value={v}> {BookingHelper.renderStatus(v)} </Select.Option>)}

                </Select>
                {userBookings &&
                    <Table pagination={{pageSize: 5}} dataSource={userBookings}>
                        <Table.Column title="Date de début" render={(date) => DateHelper.dateFormatterWithHours(date)} dataIndex={["startAt"]} key="startAt" />
                        <Table.Column title="Date de fin" render={(date) => DateHelper.dateFormatterWithHours(date)}  dataIndex={["endAt"]} key="endAt" />
                        <Table.Column title="Statut" render={(status) => BookingHelper.renderStatus(status)} dataIndex={["status"]} key="status" />
                        <Table.Column title="Statut" dataIndex={["cancellingReason"]} key="cancellingReason"/>
                    </Table>
                }

        </React.Fragment>
    )
}