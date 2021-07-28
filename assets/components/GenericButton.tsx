import React from "react"
import { Button, Popconfirm } from "antd"
import { CloseOutlined } from '@ant-design/icons'

export const DeleteButton = ({ title, onConfirm, onCancel = null, label = null }) => {
    return (
        <Popconfirm
            title={title}
            onConfirm={onConfirm}
            onCancel={onCancel}
            okText="Oui"
            cancelText="Non" >
            <Button icon={<CloseOutlined />} type="link" danger={true} >{label}</Button>
        </Popconfirm>
    )
  }