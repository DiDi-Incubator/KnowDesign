import * as React from 'react';
import { message as dmessage, MessageArgsProps } from 'antd';
import MessIcon from './messIcon';
import './style/index.less';

type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading' | 'mess';
type ConfigDuration = number | null;
type ConfigContent = React.ReactNode | string;
type JointContent = ConfigContent | MessageArgsProps;
declare type ConfigOnClose = () => void;
interface MessageType extends PromiseLike<any> {
    (): void;
}
interface ArgsProps {
    content: React.ReactNode;
    duration: number | null;
    type: NoticeType;
    prefixCls?: string;
    rootPrefixCls?: string;
    onClose?: () => void;
    icon?: React.ReactNode;
    key?: string | number;
    style?: React.CSSProperties;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
interface ConfigOptions {
    top?: number;
    duration?: number;
    prefixCls?: string;
    getContainer?: () => HTMLElement;
    transitionName?: string;
    maxCount?: number;
    rtl?: boolean;
}
interface MessageInstance {
    info(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    success(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    error(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    warning(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    loading(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    mess(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    open(args: ArgsProps): MessageType;
}
interface MessageApi extends MessageInstance {
    warn(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    config(options: ConfigOptions): void;
    destroy(messageKey?: React.Key): void;
    useMessage(): [MessageInstance, React.ReactElement];
}
interface TypeListInterface {
    type: NoticeType;
    className?: string;
    icon?: React.ReactNode;
}
const typeList: TypeListInterface[] = [{
    type: 'success',
    className: 'color-success',
}, {
    type: 'warning',
    className: 'color-warning',
}, {
    type: 'error',
    className: 'color-error',
}, {
    type: 'mess',
    icon: <MessIcon />,
}]
function isArgsProps(content: JointContent): content is MessageArgsProps {
    return (
        Object.prototype.toString.call(content) === '[object Object]' &&
        !!(content as MessageArgsProps).content
    );
}
typeList.forEach(item =>
    dmessage[item.type] = (
        content: JointContent,
        duration?: ConfigDuration,
        onClose?: ConfigOnClose
    ) => {
        if (item.type === 'mess') {
            if (isArgsProps(content)) {
                return dmessage.open({ ...content, type: 'info', className: item.className, icon: item.icon, });
            }
            if (typeof duration === 'function') {
                onClose = duration;
                duration = undefined;
            }
            dmessage.open({
                content,
                duration,
                type: 'info',
                onClose,
                icon: item.icon,
            })
        } else {
            if (isArgsProps(content)) {
                return dmessage.open({ ...content, type: item.type, className: item.className });
            }
            if (typeof duration === 'function') {
                onClose = duration;
                duration = undefined;
            }
            dmessage.open({
                content,
                duration,
                type: item.type,
                onClose,
                className: item.className,
            })
        }
    }
)
export default dmessage as MessageApi;
