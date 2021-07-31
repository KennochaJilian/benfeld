import { Button, Popconfirm } from "antd";
import React from "react";
import { UserApiService } from "../services/UserApiService";
import { notificationType, openNotificationWithIcon } from "./generics/Notification";
import { CloseOutlined, DownOutlined } from '@ant-design/icons';



export const RenderActionUser = ({ user,loadUsers }) => {
    const userApiService = new UserApiService();

    const deleteUser = (user) => {
        userApiService.update(user.id, { isDeleted: true }).then(r => {
            openNotificationWithIcon(notificationType.success, "Utilisateur supprimé", "L'utilisateur a bien été supprimé")
            loadUsers()
        })
    }

    return (
        <Popconfirm
            title="Êtes-vous sûr de vouloir supprimer un utilisateur ?"
            onConfirm={() => deleteUser(user)}
            okText="Oui"
            cancelText="Non"
        >
            <Button className="delete-user" type="link" danger={true}><CloseOutlined /></Button>
        </Popconfirm>
    );
}