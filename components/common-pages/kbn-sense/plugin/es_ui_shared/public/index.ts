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

/**
 * Create a namespace for Forms
 * In the future, each top level folder should be exported like that to avoid naming collision
 */
import * as Forms from './forms';
import * as ace from './ace';
import * as GlobalFlyout from './global_flyout';
import * as XJson from './xjson';

export { JsonEditor } from './components/json_editor';
export type { OnJsonEditorUpdateHandler, JsonEditorState } from './components/json_editor';

export { SectionLoading } from './components/section_loading';

export {
  sendRequest,
  useRequest
} from './request';
export type {
  SendRequestConfig,
  SendRequestResponse,
  UseRequestConfig,
  UseRequestResponse
} from './request';

export {
  AuthorizationContext,
  AuthorizationProvider,
  NotAuthorizedSection,
  WithPrivileges, SectionError,
  useAuthorizationContext
} from './authorization';
export type {
  Privileges,
  MissingPrivileges
} from './authorization';

export { Forms, ace, GlobalFlyout, XJson };

export { extractQueryParams } from './url';

/** dummy plugin, we just want esUiShared to have its own bundle */
export function plugin() {
  return new (class EsUiSharedPlugin {
    setup() { }
    start() { }
  })();
}
