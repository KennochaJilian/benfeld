import React, { useEffect, useState } from 'react'
import { Modal, Button, Table, Popconfirm, message, Select }  from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { UserApiService } from '../services/UserApiService';
import { UserForm } from '../components/forms/UserForm';


export const UserManager = () => {
    const userApiService = new UserApiService();
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { Option } = Select;

    const showModal = () => {
        setIsModalOpen(true)
    }

    const confirm = (user) => {
        userApiService.delete(user.id).then( r => console.log(r))
        message.success('Utilisateur supprimé');
    }
    
    useEffect(() => {
        userApiService.list().then(r => setData(r))
    }, []);

    const renderActions = (user) =>(
        <Popconfirm
        title="Êtes-vous sûr de vouloir supprimer un utilisateur?"
        onConfirm={() => confirm(user)}
        okText="Oui"
        cancelText="Non"
        >
            <Button><CloseOutlined /></Button>
        </Popconfirm>
    );

    const handleChangeRoles = (e, roles,id) => {
        if(e === "ROLE_ADMIN" && !roles.includes(e)){
            roles.push(e);
            console.log("push", roles);
            userApiService.update(id, {roles: roles});
        } else if (e === "ROLE_USER" && roles.includes("ROLE_ADMIN")){
            roles.splice(roles.indexOf('ROLE_ADMIN'), 1);
            console.log("remove", roles);
            userApiService.update(id, {roles: roles});
        } else {
            return;
        }
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

    return(
        <React.Fragment>
            <p> Gestion des utilisateurs</p>
            <Button type="primary" onClick={showModal}>Ajouter</Button>
            <Modal 
            title="Enregistrer un utilisateur" 
            visible={isModalOpen} 
            footer={[]}>
                <UserForm setIsModalOpen={setIsModalOpen} />    
            </Modal>
            <Table dataSource={data} >
                <Table.Column title="email" dataIndex={["email"]} key="email" />
                <Table.Column title="Prénom" dataIndex={["firstName"]} key="firstName" />
                <Table.Column title="Nom" dataIndex={["lastName"]} key="lastName" />
                <Table.Column title="Role" key="role" render={(user) => selectAdmin(user.roles, user.id)} />
                <Table.Column title="Actions" key="lastName" render={(user) => renderActions(user)} />
            </Table>
        </React.Fragment>

    )
}
