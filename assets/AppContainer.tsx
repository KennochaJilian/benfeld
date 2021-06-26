import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";
import { Login } from "./Pages/Login";
import "./css/app.less";
import { IUser } from "./interfaces/IUser";
import { AuthApiService } from "./services/AuthApiService";
import { notificationType, openNotificationWithIcon } from "./components/generics/Notification";

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
                openNotificationWithIcon(notificationType.success, "Connecté" , `Bonjour ${response.firstName}`)
            }).catch(response => {
                openNotificationWithIcon(notificationType.error, "Erreur" , `Une erreur est survenue`)
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
