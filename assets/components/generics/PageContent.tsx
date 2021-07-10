import { Button, PageHeader } from 'antd';
import React, { useContext } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { IPageContentProps } from '../interfaces/IPageContentProps';
import { UserHelper } from '../../services/helpers/UserHelper';
import LeftNavLayout from '../LeftNavLayout';
import { AppContext } from '../../AppContainer';

export const PageContent = ({ title, extra, children, returnBouton = false, history = null }: IPageContentProps) => {
  const { user } = useContext(AppContext);
  
  return (
    <div className="main-container">
      {returnBouton && history &&
        <Button className="mt-1em margin-left-1em" onClick={() => history.goBack()} ><ArrowLeftOutlined /> Retour </Button>}
        {user && UserHelper.isAdmin(user) &&
                    <div>
                        <LeftNavLayout />
                    </div>
                }

      <div className='page-content'>
      <PageHeader title={title} extra={extra} />
        {children}
      </div>
    </div>
  );
}