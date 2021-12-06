import React from 'react';
import { Tooltip, TooltipProps } from 'antd';
import _ from 'lodash';
import './style/index.less';
interface IProps {
    haveMore?: number,
}
function TooltipHOC(_props: IProps & TooltipProps) {
    let temp, rest, creatTemp, creatRest;
    if (_props.haveMore && _props.haveMore > 0) {
        if ((typeof _props.title) !== 'string') {
            const { title: { props: { children } } } = _props as any;
            temp = children.slice(0, _props.haveMore);
            rest = children.slice(_props.haveMore);
        }
        creatTemp = temp.map((item: React.ReactElement, index: number) => React.cloneElement(item, { key: index, className: `${item.props.className} lr8` }));
        creatRest = rest.map((item: React.ReactElement, index: number) => React.cloneElement(item, { key: index, className: `${item.props.className} dtooltip_items` }));
    }
    return _props.haveMore ?
        <div className="dtootip-hasmore">
            {creatTemp}
            <Tooltip {...{
                ..._props,
                title: creatRest,
            }} >
                {_props.children}
            </Tooltip>
        </div>
        : <Tooltip {..._props}>
            {_props.children}
        </Tooltip>
}
export default TooltipHOC;