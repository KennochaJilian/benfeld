import { Button, PageHeader } from 'antd';
import React, { useContext } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { UserHelper } from '../../services/helpers/UserHelper';
import LeftNavLayout from '../LeftNavLayout';
import { AppContext } from '../../AppContainer';

export const PageContent = ({ title, children, returnBouton = false, history = null }) => {
  const { user } = useContext(AppContext);
  
  return (
    <div className="main-container">
        {user && UserHelper.isAdmin(user) &&
                    <div>
                        <LeftNavLayout />
                    </div>
                }

      <div className={`page-content ${!UserHelper.isAdmin(user)&& 'page-content-no-admin'}`}>
      <PageHeader title={title}  />
        {children}
      </div>
    </div>
  );
}