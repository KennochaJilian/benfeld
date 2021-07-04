import { Button, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../AppContainer';
import { Booking } from '../classes/Booking';
import { PageContent } from '../components/generics/PageContent';
import { ProfilModals } from '../components/ProfilModals';
import { SelectUserSport } from '../components/SelectUserSport';
import { UserBookings } from '../components/UserBookings';
import { BookingHelper } from '../services/helpers/BookingHelper';
import { DateHelper } from '../services/helpers/DateHelper';
import { UserApiService } from '../services/UserApiService';

export const Profil = () => {
    const { user } = useContext(AppContext);
    const history = useHistory();
    const [visible, setVisible] = useState<boolean>(false);
    const [formView, setFormView] = useState<string>();


    const onClickButton = (formAsked) => {
        setFormView(formAsked)
        setVisible(true)
    }



 

    return (
        <PageContent title="Mon Profil" returnBouton={true} history={history}>
            {user && <React.Fragment>
                Bonjour {user.firstName} {user.lastName}
                <SelectUserSport/>
                <Button onClick={() => onClickButton("information")}> Modifier mes informations personnelles</Button>
                <Button onClick={() => onClickButton("password")}> Modifier mon mot de passe</Button>
                <ProfilModals visible={visible} setVisible={setVisible} formView={formView} />
                <UserBookings/>
            </React.Fragment>}

        </PageContent >
    )
}
