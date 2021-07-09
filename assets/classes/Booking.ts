import Room from './Room'
import { IUser } from '../interfaces/IUser'

export class Booking{
    id: number;
    startAt: string;
    endAt: string;
    status: string; 
    createdAt: string; 
    cancellingReason: string;
    updatedAt: string;
    user : IUser;
    room: Room;
    comment: string;
}