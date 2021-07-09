import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { notificationType, openNotificationWithIcon } from "./components/generics/Notification";
import "./css/app.less";
import { IUser } from "./interfaces/IUser";
import { Dashboard } from "./Pages/Dashboard";
import { Login } from "./Pages/Login";
import { ManageApp } from "./Pages/ManageApp";
import { Profil } from "./Pages/Profil";
import { BookingsManager } from "./Pages/BookingsManager";
import { UserManager } from "./Pages/UserManager";
import { AuthApiService } from "./services/AuthApiService";
import { UserHelper } from "./services/helpers/UserHelper";

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
            }).catch(response => {
                openNotificationWithIcon(notificationType.error, "Erreur", `Une erreur est survenue`)
            })
        }
    }, [])

    return (
        <React.Fragment>
            <AppContext.Provider value={{ user, setUser }}>
                <BrowserRouter>
                    <Switch>
                        {user ?
                            <React.Fragment>
                                {UserHelper.isAdmin(user) && <React.Fragment>
                                    <Route path="/gestion-reservations"> <BookingsManager/> </Route>
                                    <Route path="/gestion-utilisateurs"> <UserManager /> </Route>
                                    <Route path="/gerer-app"> <ManageApp /> </Route>
                                </React.Fragment>}
                                <Route exact={true} path="/"> <Dashboard /> </Route>
                                <Route path="/profil"> <Profil /> </Route>
                            </React.Fragment>
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
