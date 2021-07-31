import { Select } from 'antd';
import React from 'react'
import { CloseOutlined, DownOutlined } from '@ant-design/icons';
import { UserApiService } from '../services/UserApiService';

export const SelectChangeUserRole = ({roles, id}) => {

    const userApiService = new UserApiService();
    const actualRoles = roles.includes("ROLE_ADMIN") ? "Administrateur" : "Utilisateur";

    const handleChangeRoles = (e, roles, id) => {
        if (e === "ROLE_ADMIN" && !roles.includes(e)) {
            roles.push(e);
        } else if (e === "ROLE_USER" && roles.includes("ROLE_ADMIN")) {
            roles.splice(roles.indexOf('ROLE_ADMIN'), 1);
        } else {
            return;
        }
        userApiService.update(id, { roles: roles });
    }

  
        return (
            <Select className="select-user-role" suffixIcon={<DownOutlined />} defaultValue={actualRoles} onChange={(e) => handleChangeRoles(e, roles, id)}>
                <Select.Option className="sport-options" value="ROLE_ADMIN">Administrateur</Select.Option>
                <Select.Option className="sport-options" value="ROLE_USER">Utilisateur</Select.Option>
            </Select>
        );
}