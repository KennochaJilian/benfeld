import axios from "axios";
import React, { useEffect, useState } from "react";
import { RoomApiService } from "./services/RoomApiService";
import Room from "./classes/Room"

export const AppContainer = () => {
    const service = new RoomApiService(); 
    const [rooms, setRooms] = useState<Room[]>(); 

    const setupAxios = () => {
        axios.defaults.baseURL = process.env.APP_API_ENDPOINT;
    }




    useEffect(() => {
        setupAxios()
        service.list().then(response => setRooms(response))
    }, [])

    return (
        <React.Fragment>
            <h1>Liste des salles : </h1>
            {rooms && rooms.map(room => <p> {room.name}</p>)}
        </React.Fragment>
    )
};