import { Select } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContainer';
import Sport from '../classes/Sport';
import { SportApiService } from '../services/SportApiService';
import { UserApiService } from '../services/UserApiService';
import { EditOutlined } from '@ant-design/icons'
import { AuthApiService } from '../services/AuthApiService';
import { notificationType, openNotificationWithIcon } from './generics/Notification';

export const SelectUserSport = () => {
    const { user, setUser } = useContext(AppContext);
    const [sports, setSports] = useState<Sport[]>();
    const [updateMode, setUpdateMode] = useState<boolean>(false); 
    const sportApiService = new SportApiService()
    const userApiService = new UserApiService();
    const authApiService = new AuthApiService();

    useEffect(() => {
        if(!user){return}
        sportApiService.list().then(response => setSports(response))
        setUpdateMode(!user.sport)
    }, [])

    const onChangeSelect = (value) => {
        userApiService.update(user.id, { sport: `api/sports/${value}` }).then(response => {
            setUpdateMode(false); 
            authApiService.me().then(response => setUser(response))
            openNotificationWithIcon(notificationType.success, "Sport associé", "Vous avez bien associé un sport à votre profil")
        }
        )
    }
    useEffect(() => {}, [user])

    return (
        <React.Fragment>
            Sport associé :
            {sports && <React.Fragment>
                {user.sport && !updateMode ? 
                <span className="sport"> {user.sport.name} <EditOutlined className="cursor-pointer" onClick={() => setUpdateMode(true)} /> </span>
                 :
                    <Select className="select-sport" onChange={value => onChangeSelect(value)}>
                        {sports.map(sport => <Select.Option value={sport.id}> {sport.name} </Select.Option>)}
                    </Select>
                }
            </React.Fragment>}
        </React.Fragment>

    )
}