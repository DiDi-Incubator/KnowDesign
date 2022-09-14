import React from 'react';
import { App } from './application';
import './styles/index.less';

export const SearchProfiler = (props) => {
  return (
    <div className="search-profiler-page">
      <App initialLicenseStatus={{ valid: true }} {...props} />
    </div>
  );
};
