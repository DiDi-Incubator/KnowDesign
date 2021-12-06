import * as React from 'react';
import { Input, InputProps } from 'antd';
import hoistNonReactStatic from 'hoist-non-react-statics';
import classNames from 'classnames';
import "./style/index.less";

interface IWrappedComponentInstance {
	prefixCls?: string | undefined
	className?: string
	width?: string | number
}

type IInputProps = InputProps;

const enhance = <P extends IInputProps>(Component: React.ComponentType<P & IWrappedComponentInstance>) =>
	hoistNonReactStatic(class extends React.Component<P & IWrappedComponentInstance> {
		render () {
			const { props } = this;
			const prefixCls = `${props.prefixCls || 'dantd'}-input`;
			const inputCls = classNames({
				[prefixCls]: true,
				[`${props.className}`]: true,
			});
			return (
				<Component
          {...props as P} 
					className={inputCls}
				/>
			);
		}
	}, Component);

export default enhance(Input);