import React, { useEffect, useState } from 'react'
import { Modal, Button, Table, Popconfirm, message, Select, Input }  from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { UserApiService } from '../services/UserApiService';
import { UserForm } from '../components/forms/UserForm';
import { notificationType, openNotificationWithIcon } from '../components/generics/Notification';
import { PageContent } from '../components/generics/PageContent';
import { useHistory } from 'react-router-dom';

export const UserManager = () => {
    const userApiService = new UserApiService();
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { Option } = Select;
    const history = useHistory();

    const loadUsers = () => {
        userApiService.getNoDeletedUser().then(r => setData(r))
    }

    const deleteUser = (user) => {
        userApiService.update(user.id, {isDeleted:true}).then( r => {
            openNotificationWithIcon(notificationType.success, "Utilisateur supprimé", "L'utilisateur a bien été supprimé")
            loadUsers()
        })
    }
    
    useEffect(() => {
        loadUsers()
    }, []);

    const renderActions = (user) =>(
        <Popconfirm
        title="Êtes-vous sûr de vouloir supprimer un utilisateur ?"
        onConfirm={() => deleteUser(user)}
        okText="Oui"
        cancelText="Non"
        >
            <Button type="primary" danger={true}><DeleteOutlined /></Button>
        </Popconfirm>
    );

    const handleChangeRoles = (e, roles,id) => {
        if(e === "ROLE_ADMIN" && !roles.includes(e)){
            roles.push(e);
        } else if (e === "ROLE_USER" && roles.includes("ROLE_ADMIN")){
            roles.splice(roles.indexOf('ROLE_ADMIN'), 1);
        } else {
            return;
        }
        userApiService.update(id, {roles: roles});
    }

    const selectAdmin = (roles, id) => {
        const actualRoles = roles.includes("ROLE_ADMIN") ? "Administrateur" : "Utilisateur";
        return (
            <Select defaultValue={actualRoles} onChange={(e) => handleChangeRoles(e, roles, id)}>
                <Option value="ROLE_ADMIN">Administrateur</Option>
                <Option value="ROLE_USER">Utilisateur</Option>
            </Select>
        );
    }

    const onSearchUser = (value) => {
        userApiService.searchByName(value).then(response => setData(response))
    }
    useEffect(() => {}, [data])

    return(
        <PageContent title="Gestion des utilisateurs" returnBouton={true} history={history}>
            <Button type="primary" onClick={(() => setIsModalOpen(true))}>Ajouter</Button>
            <Input placeholder="Rechercher..." onChange={e => onSearchUser(e.target.value)}/>
            <Table pagination={{pageSize: 5}} dataSource={data} >
                <Table.Column title="Email" dataIndex={["email"]} key="email" />
                <Table.Column title="Prénom" dataIndex={["firstName"]} key="firstName" />
                <Table.Column title="Nom" dataIndex={["lastName"]} key="lastName" />
                <Table.Column title="Téléphone" dataIndex={["phoneNumber"]} key="phoneNumber"/>
                <Table.Column title="Role" key="role" render={(user) => selectAdmin(user.roles, user.id)} />
                <Table.Column title="Actions" key="lastName" render={(user) => renderActions(user)} />
            </Table>
            <Modal 
            title="Enregistrer un utilisateur" 
            onCancel={() =>setIsModalOpen(false)}
            visible={isModalOpen} 
            footer={[]}>
                <UserForm loadData={loadUsers} setIsModalOpen={setIsModalOpen} />    
            </Modal>
        </PageContent>

    )
}
