import { Button, Form, Input } from "antd";
import React, { useContext } from "react";
import { AppContext } from "../AppContainer";
import { UserApiService } from "../services/UserApiService";
import { notificationType, openNotificationWithIcon } from "./generics/Notification";

export const EditProfilePasswordForm = ({ setVisible }) => {
    const [form] = Form.useForm();
    const userService = new UserApiService();
    const { user } = useContext(AppContext);

    const onFinish = (passwordsFromForm) => {
        updatePassword(passwordsFromForm);
    }

    const updatePassword = (passwordsFromForm) => {
        const changePasswordData = {
            oldPassword: passwordsFromForm.oldPassword,
            newPassword: passwordsFromForm.newPassword
        };
        userService.updateUserPassword(user.id, changePasswordData).then(response => {
            openNotificationWithIcon(notificationType.success, 'Mot de passe mis à jour', `Votre mot de passe à été mis à jour.`);
            form.resetFields()
            setVisible(false)

        }).catch(response => {
            openNotificationWithIcon(notificationType.error, 'Erreur lors de la mise à jour', `Le mot de passe n'a pas été mis à jour.`);
        })
    }

    const validationPasswordRule = ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
            }
            return Promise.reject('Les mots de passe ne sont pas identiques !');
        },
    });

    return (
        <React.Fragment>
            <Form form={form} onFinish={onFinish} onFinishFailed={null} layout='vertical'>
                <Form.Item className='form-input' name={"oldPassword"} label="Ancien mot de passe">
                    <Input.Password />
                </Form.Item>
                <Form.Item className='form-input' name={"newPassword"} label="Nouveau mot de passe">
                    < Input.Password />
                </Form.Item>
                <Form.Item className='form-input' name={"confirm"} dependencies={['newPassword']} hasFeedback={true} label="Confirmation de mot de passe"
                    rules={[validationPasswordRule]}
                >
                    <Input.Password />
                </Form.Item>
                <div className="flex-end">
                    <Button type="primary" htmlType="submit" className="mt-1em">Modifier mon mot de passe</Button>
                </div>
            </Form>
        </React.Fragment>
    )
}
