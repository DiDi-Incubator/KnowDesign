/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React, { useContext, createContext, useCallback } from 'react';

// import { HttpSetup, ToastsSetup } from 'kibana/public';
import { LicenseStatus } from '../../../common';

export interface ContextArgs {
  http: any;
  notifications: any;
  initialLicenseStatus: LicenseStatus;
  IndexSelect?: any;
  currentCluster?: any;
}

export interface ContextValue {
  http: any;
  notifications: any;
  getLicenseStatus: () => LicenseStatus;
  IndexSelect?: any;
  currentCluster?: any;
}

const AppContext = createContext<ContextValue>(null as any);

export const AppContextProvider = ({
  children,
  args: { http, notifications, initialLicenseStatus, IndexSelect, currentCluster },
}: {
  children: React.ReactNode;
  args: ContextArgs;
}) => {
  const getLicenseStatus = useCallback(() => initialLicenseStatus, [initialLicenseStatus]);

  return (
    <AppContext.Provider
      value={{
        http,
        notifications,
        getLicenseStatus,
        IndexSelect,
        currentCluster,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (ctx == null) {
    throw new Error(`useAppContext must be called inside AppContextProvider`);
  }
  return ctx;
};
