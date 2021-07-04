import { Button, Form, Input } from "antd";
import React from "react";
import { IUser } from "../interfaces/IUser";
import { UserApiService } from "../services/UserApiService";
import { notificationType, openNotificationWithIcon } from "./generics/Notification";

export const EditProfileNameForm = (props) => {
    const [form] = Form.useForm();
    const userService = new UserApiService();

    const onFinish = (userFromForm: IUser) => {
        updateUserNames(userFromForm);
    }

    const updateUserNames = (userFromForm) => {
        userFromForm.id = props.initialValues.id;
        userService.update(userFromForm.id, userFromForm).then(response => {
            openNotificationWithIcon(notificationType.success, 'Profil mis à jour', `Vos informations ont été mise à jour.`)
            props.setVisible(false)
        }).catch(response => {
            openNotificationWithIcon(notificationType.error, 'Erreur lors de la mise à jour', `Le profil n'a pas été mis à jour.`);

        })
    }

    return (
        <React.Fragment>
            <Form form={form} initialValues={props.initialValues} onFinish={onFinish} layout='vertical'>
                <Form.Item className='form-input' name="firstName" label="Prénom">
                    <Input />
                </Form.Item>
                <Form.Item className='form-input' name="lastName" label="Nom">
                    <Input />
                </Form.Item>
                <Form.Item className='form-input' name="phoneNumber" label="Numéro de téléphone">
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit" className="mt-1em"> Modifier mes informations personnelles </Button>
            </Form>
        </React.Fragment>
    )
}
