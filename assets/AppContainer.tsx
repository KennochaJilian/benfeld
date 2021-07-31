import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { debounce } from "../node_modules/lodash";
import { ResponsiveContext as Rc } from "./classes/ResponsiveContext";
import { notificationType, openNotificationWithIcon } from "./components/generics/Notification";
import "./css/app.less";
import "./css/modifyTheme.less";
import { IUser } from "./interfaces/IUser";
import { BookingsManager } from "./Pages/BookingsManager";
import { Dashboard } from "./Pages/Dashboard";
import { Login } from "./Pages/Login";
import { ManageApp } from "./Pages/ManageApp";
import { Profil } from "./Pages/Profil";
import { UserManager } from "./Pages/UserManager";
import { AuthApiService } from "./services/AuthApiService";
import { UserHelper } from "./services/helpers/UserHelper";


const ResponsiveContext = React.createContext<Rc>(null);

const AppContext: React.Context<any> = React.createContext(null);

export const AppContainer = () => {
    const [user, setUser] = useState<IUser>();
    const authService = new AuthApiService();
    const responsiveContext = new Rc();

    const setupAxios = () => {
        axios.defaults.baseURL = process.env.APP_API_ENDPOINT;
    }

    const handleResize = () => { responsiveContext.setResponsiveData({ isDesktop: window.innerWidth > responsiveContext.mediaTablett, isPhone: window.innerWidth < responsiveContext.mediaPhone }) }

    const debounceResize = React.useCallback(debounce(handleResize, 400), []);

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
        responsiveContext.setResponsiveData({ isDesktop: window.innerWidth > responsiveContext.mediaTablett, isPhone: window.innerWidth <= responsiveContext.mediaPhone });
        window.addEventListener("resize", debounceResize);
    }, [])


    return (
        <React.Fragment>
            <AppContext.Provider value={{ user, setUser }}>
                <ResponsiveContext.Provider value={responsiveContext}>
                    <BrowserRouter>
                        <Switch>
                            {user ?
                                <React.Fragment>
                                    {UserHelper.isAdmin(user) && <React.Fragment>
                                        <Route path="/gestion-reservations"> <BookingsManager /> </Route>
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
                </ResponsiveContext.Provider>
            </AppContext.Provider>
        </React.Fragment>
    )
};

export { AppContext, ResponsiveContext };
