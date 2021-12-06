import * as React from 'react';
import { Modal, ModalProps, ModalFuncProps } from 'antd';
import hoistNonReactStatic from 'hoist-non-react-statics';
import classNames from 'classnames';
import "./style/index.less";
import { ModalStaticFunctions, modalGlobalConfig } from 'antd/lib/modal/confirm'
import useModal from 'antd/lib/modal/useModal';

type ISize = 'small' | 'large';
interface IWrappedComponentInstance {
	size?: ISize
	prefixCls?: string | undefined
	className?: string
	width?: string | number
}

type IModalProps = ModalStaticFunctions & {
	destroyAll: () => void;
	config: typeof modalGlobalConfig;
} & ModalProps & {
	useModal: typeof useModal;
} & ModalFuncProps

const enhance = <P extends IModalProps>(Component: React.ComponentType<P & IWrappedComponentInstance>) =>
	hoistNonReactStatic(class extends React.Component<P & IWrappedComponentInstance> {
		render() {
			const { props } = this
			const prefixCls = `${props.prefixCls || 'dantd'}-modal`;
			const alertCls = classNames({
				[prefixCls]: true,
				[`${props.className}`]: true,
			});
			const setWidth = props.width ? props.width : props.size === 'large' ? 728 : 516;
			return (
				<Component
					width={setWidth}
					className={alertCls}
					{...props as P}
				/>
			);
		}
	}, Component);

export default enhance(Modal);