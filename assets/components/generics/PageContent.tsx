import { Button, PageHeader } from 'antd';
import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { IPageContentProps } from '../interfaces/IPageContentProps';

export const PageContent = ({ title, extra, children, returnBouton = false, history = null }: IPageContentProps) => {
  return (
    <div className="main-container">
      {returnBouton && history &&
        <Button className="mt-1em margin-left-1em" onClick={() => history.goBack()} ><ArrowLeftOutlined /> Retour </Button>}
      <PageHeader title={title} extra={extra} />
      <div className='page-content'>
        {children}
      </div>
    </div>
  );
}