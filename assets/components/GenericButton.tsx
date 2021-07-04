import React from "react"
import { Button, Popconfirm } from "antd"
import { DeleteOutlined } from '@ant-design/icons'

export const DeleteButton = ({ title, onConfirm, onCancel = null, label = null }) => {
    return (
        <Popconfirm
            title={title}
            onConfirm={onConfirm}
            onCancel={onCancel}
            okText="Oui"
            cancelText="Non" >
            <Button icon={<DeleteOutlined />} type="primary" danger={true} >{label}</Button>
        </Popconfirm>
    )
  }