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

import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { I18nProvider } from '../../../../packages/kbn-i18n/src/react';

/**
 * A function that should mount DOM content inside the provided container element
 * and return a handler to unmount it.
 *
 * @param element the container element to render into
 * @returns a {@link UnmountCallback} that unmount the element on call.
 *
 * @public
 */
export type MountPoint<T extends HTMLElement = HTMLElement> = (element: T) => UnmountCallback;

/**
 * A function that will unmount the element previously mounted by
 * the associated {@link MountPoint}
 *
 * @public
 */
export type UnmountCallback = () => void;

/**
 * MountPoint converter for react nodes.
 *
 * @param node to get a mount point for
 */
export const toMountPoint = (node: React.ReactNode & ReactElement): MountPoint => {
  const mount = (element: HTMLElement) => {
    ReactDOM.render(<I18nProvider>{node}</I18nProvider>, element);
    return () => ReactDOM.unmountComponentAtNode(element);
  };
  // only used for tests and snapshots serialization
  if (process.env.NODE_ENV !== 'production') {
    mount.__reactMount__ = node;
  }
  return mount;
};
