import axios from "axios";
import React, { useEffect, useState } from "react";
import { RoomApiService } from "./services/RoomApiService";
import Room from "./classes/Room"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login } from "./components/Login";

export const AppContainer = () => {
    const service = new RoomApiService(); 
    const [rooms, setRooms] = useState<Room[]>(); 

    const setupAxios = () => {
        axios.defaults.baseURL = process.env.APP_API_ENDPOINT;
    }

    useEffect(() => {
        setupAxios()
    }, [])

    return (
        <React.Fragment>
            <BrowserRouter>
            <Switch>
                <Route path="/login"> <Login/> </Route>
            </Switch>
            </BrowserRouter>            
        </React.Fragment>
    )
};