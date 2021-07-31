import React, { useState } from "react";
import { ResponsiveUserModal } from "./ResponsiveUserModal";

export const ResponsivesLinesUser = ({ users, loadUsers }) => {
    const nameColumns = ['Email', 'Prénom', 'Nom', 'Téléphone'];
    const [selectedUser, setSelectedUser] = useState();

    return (
        <div>
            <div className="header-responsive-line">
                {nameColumns.map(name => <span> {name}</span>)}

            </div>
            <div className="content-responsive-line">

                {users.map(user =>
                    <div onClick={() => setSelectedUser(user)}>
                        <span> {user.email}</span>
                        <span>{user.firstName}</span>
                        <span>{user.lastName}</span>
                        <span>{user.phoneNumber}</span>
                        {/* <span><SelectChangeUserRole roles={user.roles} id={user.id} /></span>
                        <span><RenderActionUser user={user} loadUsers={loadUsers} /></span> */}
                    </div>
                )}
            </div>
            {selectedUser && <ResponsiveUserModal selectedUser={selectedUser} setSelectedUser={setSelectedUser} loadUsers={loadUsers} />}
        </div>
    )
}