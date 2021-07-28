import { Button } from 'antd';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../AppContainer';
import { PageContent } from '../components/generics/PageContent';
import { ProfilModals } from '../components/ProfilModals';
import { SelectUserSport } from '../components/SelectUserSport';
import { UserBookings } from '../components/UserBookings';
import "../css/profil.less";

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
            <div id="profil-container">
                {user && <React.Fragment>
                    <div className="user-information-container">
                        <div>
                            <div>
                                <span>  Bonjour <span className="profil-name"> {user.firstName} {user.lastName} </span></span>
                            </div>
                            <div className="select-user-sport">
                                <SelectUserSport />
                            </div>
                        </div>
                        <div>
                            <Button className="btn-profil" type="primary" onClick={() => onClickButton("information")}> Modifier mes informations personnelles</Button>
                            <Button className="btn-profil" type="primary" onClick={() => onClickButton("password")}> Modifier mon mot de passe</Button>
                        </div>
                    </div>


                    <ProfilModals visible={visible} setVisible={setVisible} formView={formView} />
                    <UserBookings />
                </React.Fragment>}
            </div>

        </PageContent >
    )
}
