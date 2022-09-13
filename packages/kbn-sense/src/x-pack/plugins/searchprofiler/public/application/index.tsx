/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import React from 'react';
import { Main } from './containers';
import { AppContextProvider } from './contexts/app_context';
import { ProfileContextProvider } from './contexts/profiler_context';

import { AppDependencies } from './boot';
import { I18nProvider } from '../../../../../packages/kbn-i18n/src/react';

export function App({ initialLicenseStatus, notifications, http, IndexSelect }: AppDependencies) {
  return (
    <I18nProvider>
      <AppContextProvider args={{ initialLicenseStatus, notifications, http, IndexSelect }}>
        <ProfileContextProvider>
          <Main />
        </ProfileContextProvider>
      </AppContextProvider>
    </I18nProvider>
  );
}
