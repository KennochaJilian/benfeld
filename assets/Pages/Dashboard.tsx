import React, { useContext } from 'react'
import { AppContext } from '../AppContainer';

export const Dashboard = () => {
    const { user } = useContext(AppContext);
    return(
        <React.Fragment>
            <p> Dashboard</p>
            <p> Bonjour {user.firstName} </p> 

        </React.Fragment>

    )
}