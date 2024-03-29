/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { createContext, useContext, useEffect } from 'react';
// import { NotificationsSetup } from 'kibana/public';
import { History, Settings, Storage } from '../../services';
import { CurrentCluster, ObjectStorageClient } from '../../../common/types';
import { MetricsTracker } from '../../types';
import { EsHostService } from '../lib';

interface ContextServices {
  history: History;
  storage: Storage;
  settings: Settings;
  notifications: any;
  objectStorageClient: ObjectStorageClient;
  trackUiMetric: MetricsTracker;
  esHostService: EsHostService;
  onInputEditorChange?: any;
  isSuperApp?: boolean;
}

export interface ContextValue {
  services: ContextServices;
  docLinkVersion: string;
  consoleEditorValue?: string;
  currentCluster?: CurrentCluster;
  isSuperApp?: boolean;
}

interface ContextProps {
  value: ContextValue;
  children: any;
}

const ServicesContext = createContext<ContextValue>(null as any);

export function ServicesContextProvider({ children, value }: ContextProps) {
  useEffect(() => {
    // Fire and forget, we attempt to init the host service once.
    value.services.esHostService.init();
  }, [value.services.esHostService]);

  return <ServicesContext.Provider value={value}>{children}</ServicesContext.Provider>;
}

export const useServicesContext = () => {
  const context = useContext(ServicesContext);
  if (context === undefined) {
    throw new Error('useServicesContext must be used inside the ServicesContextProvider.');
  }
  return context;
};
