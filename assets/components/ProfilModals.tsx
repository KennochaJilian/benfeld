import { Modal } from 'antd'
import React, { useContext } from 'react'
import { AppContext } from '../AppContainer';
import { EditProfileNameForm } from './FormEditProfileName';
import { EditProfilePasswordForm } from './FormEditProfilePassword';

export const ProfilModals = ({visible, setVisible, formView}) => {
    const { user } = useContext(AppContext);

    return(
        <Modal title={formView == "information" ? "Modifier les informations personnelles" : "Modifier le mot de passe"} centered={true} closable={true} visible={visible} onCancel={() => setVisible(false)} footer={null} width={'700px'}>
            {formView == "information" ? 
            <EditProfileNameForm setVisible={setVisible} initialValues={user}/> : 
            <EditProfilePasswordForm setVisible={setVisible}/>
        }

        </Modal>
    )
}