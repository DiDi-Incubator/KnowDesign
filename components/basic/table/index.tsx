import React from 'react';
import { Table, TableProps, DropDownProps } from 'antd';
import classNames from 'classnames';
import hoistNonReactStatic from 'hoist-non-react-statics';
import './style/index.less';


export interface DTableProps {
  overlay?: DropDownProps['overlay'];
  dropdownProps?: DropDownProps;
  // children: any;
}

function DTable(props: TableProps<any> & DTableProps) {
  const prefixCls = `${props.prefixCls || 'dantd'}-table`;
  const tableCls = classNames({
    [prefixCls]: true,
    [`${props.className}`]: !!props.className,
  });

  return (
    <Table
      className={tableCls}
      {...props}
    >
      {props.children}
    </Table>
  )
};

hoistNonReactStatic(DTable, Table);
export default DTable;


// import * as React from 'react';
// import { Table, TableProps, DropDownProps } from 'antd';
// import hoistNonReactStatic from 'hoist-non-react-statics';
// import classNames from 'classnames';
// import "./style/index.less";

// interface IWrappedComponentInstance {
// 	prefixCls?: string | undefined
// 	className?: string
// }

// type ITableProps = TableProps;

// const enhance = <P extends ITableProps>(Component: React.ComponentType<P & IWrappedComponentInstance>) =>
// 	hoistNonReactStatic(class extends React.Component<P & IWrappedComponentInstance> {
// 		render () {
// 			const { props } = this;
// 			const prefixCls = `${props.prefixCls || 'dantd'}-table`;
// 			const tableCls = classNames({
// 				[prefixCls]: true,
// 				[`${props.className}`]: true,
// 			});
// 			return (
// 				<Component
//           {...props as P} 
// 					className={tableCls}
// 				/>
// 			);
// 		}
// 	}, Component);

// export default enhance(Table);
