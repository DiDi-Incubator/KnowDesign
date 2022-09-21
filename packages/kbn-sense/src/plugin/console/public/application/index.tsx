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

import React from 'react';
// import { HttpSetup, NotificationsSetup } from 'src/core/public';
import { ServicesContextProvider, EditorContextProvider, RequestContextProvider } from './contexts';
import { Main } from './containers';
import { createStorage, createHistory, createSettings } from '../services';
import * as localStorageObjectClient from '../lib/local_storage_object_client';
// import { UsageCollectionSetup } from '../../../usage_collection/public';
import { createApi, createEsHostService } from './lib';
import { I18nProvider } from '../../../../packages/kbn-i18n/src/react';
import { i18n } from '../../../../packages/kbn-i18n/src';
import '../styles/index.less';
import '@elastic/eui/dist/eui_theme_light.css';
import { CurrentCluster } from '../../common/types';

// TODO: 类型引入

export interface BootDependencies {
  http?: any;
  docLinkVersion?: string;
  prefix?: string;
  consoleEditorValue?: string;
  onInputEditorChange?: any;
  I18nContext?: any;
  notifications?: any;
  usageCollection?: any;
  currentCluster?: CurrentCluster;
  element?: HTMLElement;
}

export const SenseConsolePage = (props: BootDependencies) => {
  const {
    I18nContext,
    element,
    prefix,
    currentCluster,
    notifications,
    consoleEditorValue,
    onInputEditorChange,
  } = props;
  const storage = createStorage({
    engine: window.localStorage,
    prefix: `sense:${prefix || ''}`,
  });
  const history = createHistory({ storage });
  const settings = createSettings({ storage });
  const objectStorageClient = localStorageObjectClient.create(storage);
  const api = createApi({ http: props.http });
  const esHostService = createEsHostService({ api });

  return (
    <>
      <I18nProvider>
        <ServicesContextProvider
          value={{
            currentCluster,
            consoleEditorValue,
            docLinkVersion: '7.10',
            services: {
              esHostService,
              onInputEditorChange,
              storage,
              history,
              settings,
              notifications,
              trackUiMetric: null,
              objectStorageClient,
            },
          }}
        >
          <RequestContextProvider>
            <EditorContextProvider settings={settings.toJSON()}>
              <Main />
            </EditorContextProvider>
          </RequestContextProvider>
        </ServicesContextProvider>
      </I18nProvider>
      {element}
    </>
  );
};
