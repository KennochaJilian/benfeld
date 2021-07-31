import { Table } from "antd";
import React from "react";
import { RenderActionUser } from "./RenderActionUser";
import { SelectChangeUserRole } from "./SelectChangeUserRole";


export const DisplayUsersTable = ({ users, loadUsers }) => {



    return (
        <Table className="user-table" pagination={{ pageSize: 5 }} dataSource={users} >
            <Table.Column title="Email" dataIndex={["email"]} key="email" />
            <Table.Column title="Prénom" dataIndex={["firstName"]} key="firstName" />
            <Table.Column title="Nom" dataIndex={["lastName"]} key="lastName" />
            <Table.Column title="Téléphone" dataIndex={["phoneNumber"]} key="phoneNumber" />
            <Table.Column title="Role" key="role" render={(user) => <SelectChangeUserRole roles={user.roles} id={user.id} />} />
            <Table.Column title="Actions" key="lastName" render={(user) => <RenderActionUser user={user} loadUsers={loadUsers} />} />
        </Table>
    )
}