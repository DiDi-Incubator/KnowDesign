import React from 'react';
import { App } from "./application";
import './styles/index.less';

export const SearchProfiler = (props) => {
  return (<App initialLicenseStatus={{ valid: true }} notifications={props.notification} {...props} />);
}