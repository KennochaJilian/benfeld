import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";
import "./css/app.less";
import { IUser } from "./interfaces/IUser";
import { AuthApiService } from "./services/AuthApiService";

const AppContext: React.Context<any> = React.createContext(null);

export const AppContainer = () => {
    const [user, setUser] = useState<IUser>();
    const authService = new AuthApiService();



    const setupAxios = () => {
        axios.defaults.baseURL = process.env.APP_API_ENDPOINT;
    }

    useEffect(() => {
        setupAxios()
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            authService.me().then(response => {
                setUser(response)
            })
        }
    }, [])

    return (
        <React.Fragment>
            <AppContext.Provider value={{ user, setUser }}>
                <BrowserRouter>
                    <Switch>
                        {user ?
                            <Route path="/"> <Dashboard /> </Route>
                            :
                            <Route path="/"> <Login /> </Route>
                        }
                    </Switch>
                </BrowserRouter>
            </AppContext.Provider>
        </React.Fragment>
    )
};

export { AppContext };
