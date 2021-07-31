import { Modal } from "antd"
import React from "react"
import { RenderActionUser } from "./RenderActionUser"
import { SelectChangeUserRole } from "./SelectChangeUserRole"

export const ResponsiveUserModal = ({ selectedUser, setSelectedUser, loadUsers }) => {
    return (
        <Modal title={`Utilisateur : ${selectedUser.firstName} ${selectedUser.lastName} `} centered={true} closable={true} visible={selectedUser ? true : false} onCancel={() => setSelectedUser(null)} footer={null} width={'700px'}>
            <div className="mb-2">
                <span> Téléphone </span>
                <span>{selectedUser.phoneNumber} </span>
            </div>
            <div className="flex-between">
                <span> Modifier le rôle </span>
                <SelectChangeUserRole roles={selectedUser.roles} id={selectedUser.id} />
            </div>
            <div className="flex-between">
                <span> Supprimer l'utilisateur </span>
                <RenderActionUser user={selectedUser} loadUsers={loadUsers} />
            </div>
        </Modal>

    )
}