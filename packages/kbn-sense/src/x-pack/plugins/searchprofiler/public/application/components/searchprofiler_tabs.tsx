/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';

import { EuiTabs, EuiTab } from '@elastic/eui';
import { i18n } from '../../../../../../packages/kbn-i18n/src';

import { Targets } from '../types';

export interface Props {
  activeTab: Targets | null;
  activateTab: (target: Targets) => void;
  has: {
    searches: boolean;
    aggregations: boolean;
  };
}

export const SearchProfilerTabs = ({ activeTab, activateTab, has }: Props) => {
  return (
    <EuiTabs>
      <EuiTab
        data-test-subj="queryProfileTab"
        isSelected={activeTab === 'searches'}
        disabled={!has.searches}
        onClick={() => activateTab('searches')}
      >
        {i18n.translate('xpack.searchProfiler.queryProfileTabTitle', {
          defaultMessage: 'Query Profile',
        })}
      </EuiTab>
      <EuiTab
        data-test-subj="aggregationProfileTab"
        isSelected={activeTab === 'aggregations'}
        disabled={!has.aggregations}
        onClick={() => activateTab('aggregations')}
      >
        {i18n.translate('xpack.searchProfiler.aggregationProfileTabTitle', {
          defaultMessage: 'Aggregation Profile',
        })}
      </EuiTab>
    </EuiTabs>
  );
};
