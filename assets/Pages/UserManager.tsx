import { Button, Input, Modal, Select } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ResponsiveContext } from '../AppContainer';
import { DisplayUsersTable } from '../components/DisplayUsersTable';
import { UserForm } from '../components/forms/UserForm';
import { PageContent } from '../components/generics/PageContent';
import { ResponsivesLinesUser } from '../components/ResponsivesLinesUser';
import "../css/userManager.less";
import { UserApiService } from '../services/UserApiService';

export const UserManager = () => {
    const userApiService = new UserApiService();
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { Option } = Select;
    const history = useHistory();
    const responsiveContext = useContext(ResponsiveContext);

    const loadUsers = () => {
        userApiService.getNoDeletedUser().then(r => setUsers(r))
    }

    useEffect(() => {
        loadUsers()
    }, []);


    const onSearchUser = (value) => {
        userApiService.searchByName(value).then(response => setUsers(response))
    }
    useEffect(() => { }, [users])

    const nameColumns = ['email', 'firstName', 'lastName', 'phoneNumber']

    return (
        <PageContent title="Gestion des utilisateurs" returnBouton={true} history={history}>
            <div id="user-manager-container">
                <div className="header-table-users">
                    <Input className="input-search-user" placeholder="Rechercher..." onChange={e => onSearchUser(e.target.value)} />
                    <Button className="add-user-btn" type="primary" onClick={(() => setIsModalOpen(true))}>Créer un compte</Button>
                </div>
                {responsiveContext.responsiveData.isPhone ? <ResponsivesLinesUser users={users} loadUsers={loadUsers}/> :
                    <DisplayUsersTable users={users} loadUsers={loadUsers} />
                }

                <Modal
                    title="Enregistrer un utilisateur"
                    onCancel={() => setIsModalOpen(false)}
                    visible={isModalOpen}
                    footer={null}>
                    <UserForm loadData={loadUsers} setIsModalOpen={setIsModalOpen} />
                </Modal>
            </div>

        </PageContent>

    )
}
