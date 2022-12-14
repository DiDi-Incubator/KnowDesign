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

// export * from './core';
export * from './render_complete';
export * from './resize_checker';
export * from './storage';
// export { hashedItemStore, HashedItemStore } from './storage/hashed_item_store';

// export { Configurable, CollectConfigProps } from './ui';
// export { createStartServicesGetter, StartServicesGetter } from './core/create_start_service_getter';

/** dummy plugin, we just want kibanaUtils to have its own bundle */
export function plugin() {
  return new (class KibanaUtilsPlugin {
    setup() { }
    start() { }
  })();
}
