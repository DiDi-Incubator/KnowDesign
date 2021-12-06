import * as React from 'react';
import { notification as dnotification } from 'antd';
import { CheckCircleFilled, InfoCircleFilled, CloseCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import './style/index.less';

declare type IconType = 'success' | 'info' | 'error' | 'warning';
declare type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
interface ArgsProps {
    message: React.ReactNode;
    description?: React.ReactNode;
    btn?: React.ReactNode;
    key?: string;
    onClose?: () => void;
    duration?: number | null;
    icon?: React.ReactNode;
    placement?: NotificationPlacement;
    style?: React.CSSProperties;
    prefixCls?: string;
    className?: string;
    readonly type?: IconType;
    onClick?: () => void;
    top?: number;
    bottom?: number;
    getContainer?: () => HTMLElement;
    closeIcon?: React.ReactNode;
}
interface TypeListInterface {
    type: IconType;
    icon: React.ReactNode;
}
const typeList: TypeListInterface[] = [{
    type: 'success',
    icon: <CheckCircleFilled style={{ color: '#46D677' }} />,
}, {
    type: 'info',
    icon: <InfoCircleFilled style={{ color: '#2F81F9' }} />,
}, {
    type: 'warning',
    icon: <ExclamationCircleFilled style={{ color: '#F4A838' }} />,
}, {
    type: 'error',
    icon: <CloseCircleFilled style={{ color: '#EF645C' }} />,
}]

typeList.forEach(item => {
    dnotification[item.type] = (args: ArgsProps) =>
        dnotification.open({
            ...args,
            type: item.type,
            icon: item.icon,
        });
});
export default dnotification;
