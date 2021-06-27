import { Col, Row } from 'antd';
import React, { useContext } from 'react';
import { AppContext } from '../AppContainer';
import { EditProfileNameForm } from '../components/FormEditProfileName';
import { EditProfilePasswordForm } from '../components/FormEditProfilePassword';
import { PageContent } from '../components/generics/PageContent';
import { useHistory } from 'react-router-dom';

export const Profil = () => {
    const { user } = useContext(AppContext);
    const history = useHistory();

    return (
        <PageContent title="Mon Profil" returnBouton={true} history={history}>
            {user &&
                <Row gutter={20}>
                    <Col xl={10} lg={16} md={18}>
                        <EditProfileNameForm initialValues={user}/>
                    </Col>
                    <Col xl={8} lg={16} md={18}>
                        <EditProfilePasswordForm/>
                    </Col>
                </Row>
            }
            <Row>
            </Row>
        </PageContent >
    )
}
