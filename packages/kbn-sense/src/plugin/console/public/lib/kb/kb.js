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
import {
  TypeAutocompleteComponent,
  IdAutocompleteComponent,
  IndexAutocompleteComponent,
  FieldAutocompleteComponent,
  ListComponent,
  TemplateAutocompleteComponent,
  UsernameAutocompleteComponent,
} from '../autocomplete/components';

import $ from 'jquery';
import _ from 'lodash';

import Api from './api';

let ACTIVE_API = new Api();
const isNotAnIndexName = (name) => name[0] === '_' && name !== '_all';

const idAutocompleteComponentFactory = (name, parent) => {
  return new IdAutocompleteComponent(name, parent);
};
const parametrizedComponentFactories = {
  getComponent: function (name, parent, provideDefault) {
    if (this[name]) {
      return this[name];
    } else if (provideDefault) {
      return idAutocompleteComponentFactory;
    }
  },
  index: function (name, parent) {
    if (isNotAnIndexName(name)) return;
    return new IndexAutocompleteComponent(name, parent, false);
  },
  indices: function (name, parent) {
    if (isNotAnIndexName(name)) return;
    return new IndexAutocompleteComponent(name, parent, true);
  },
  type: function (name, parent) {
    return new TypeAutocompleteComponent(name, parent, false);
  },
  types: function (name, parent) {
    return new TypeAutocompleteComponent(name, parent, true);
  },
  id: function (name, parent) {
    return idAutocompleteComponentFactory(name, parent);
  },
  transform_id: function (name, parent) {
    return idAutocompleteComponentFactory(name, parent);
  },
  username: function (name, parent) {
    return new UsernameAutocompleteComponent(name, parent);
  },
  user: function (name, parent) {
    return new UsernameAutocompleteComponent(name, parent);
  },
  template: function (name, parent) {
    return new TemplateAutocompleteComponent(name, parent);
  },
  task_id: function (name, parent) {
    return idAutocompleteComponentFactory(name, parent);
  },
  ids: function (name, parent) {
    return idAutocompleteComponentFactory(name, parent, true);
  },
  fields: function (name, parent) {
    return new FieldAutocompleteComponent(name, parent, true);
  },
  field: function (name, parent) {
    return new FieldAutocompleteComponent(name, parent, false);
  },
  nodes: function (name, parent) {
    return new ListComponent(
      name,
      ['_local', '_master', 'data:true', 'data:false', 'master:true', 'master:false'],
      parent,
    );
  },
  node: function (name, parent) {
    return new ListComponent(name, [], parent, false);
  },
};

export function getUnmatchedEndpointComponents() {
  return ACTIVE_API.getUnmatchedEndpointComponents();
}

export function getEndpointDescriptionByEndpoint(endpoint) {
  return ACTIVE_API.getEndpointDescriptionByEndpoint(endpoint);
}

export function getEndpointBodyCompleteComponents(endpoint) {
  const desc = getEndpointDescriptionByEndpoint(endpoint);
  if (!desc) {
    throw new Error("failed to resolve endpoint ['" + endpoint + "']");
  }
  return desc.bodyAutocompleteRootComponents;
}

export function getTopLevelUrlCompleteComponents(method) {
  return ACTIVE_API.getTopLevelUrlCompleteComponents(method);
}

export function getGlobalAutocompleteComponents(term, throwOnMissing) {
  return ACTIVE_API.getGlobalAutocompleteComponents(term, throwOnMissing);
}

function loadApisFromJson(
  json,
  urlParametrizedComponentFactories,
  bodyParametrizedComponentFactories,
) {
  urlParametrizedComponentFactories =
    urlParametrizedComponentFactories || parametrizedComponentFactories;
  bodyParametrizedComponentFactories =
    bodyParametrizedComponentFactories || urlParametrizedComponentFactories;
  const api = new Api(urlParametrizedComponentFactories, bodyParametrizedComponentFactories);
  const names = [];
  _.each(json, function (apiJson, name) {
    names.unshift(name);
    _.each(apiJson.globals || {}, function (globalJson, globalName) {
      api.addGlobalAutocompleteRules(globalName, globalJson);
    });
    _.each(apiJson.endpoints || {}, function (endpointJson, endpointName) {
      api.addEndpointDescription(endpointName, endpointJson);
    });
  });
  api.name = names.join(',');
  return api;
}

// TODO: clean up setting up of active API and use of jQuery.
// This function should be attached to a class that holds the current state, not setup
// when the file is required. Also, jQuery should not be used to make network requests
// like this, it looks like a minor security issue.
export function setActiveApi(api) {
  if (!api) {
    var data = {
      es_6_0: {
        name: 'es_6_0',
        globals: {
          aliases: { '*': { filter: {}, routing: '1', search_routing: '1,2', index_routing: '1' } },
          aggregations: {
            '*': {
              aggs: { __template: { NAME: { AGG_TYPE: {} } } },
              adjacency_matrix: { filters: {} },
              diversified_sampler: { shard_size: '', field: '' },
              min: { __template: { field: '' }, field: '{field}', missing: 0, script: {} },
              max: { __template: { field: '' }, field: '{field}', missing: 0, script: {} },
              avg: { __template: { field: '' }, field: '{field}', missing: 0, script: {} },
              sum: { __template: { field: '' }, field: '{field}', missing: 0, script: {} },
              stats: { __template: { field: '' }, field: '{field}', missing: 0, script: {} },
              extended_stats: {
                __template: { field: '' },
                field: '{field}',
                missing: 0,
                script: {},
              },
              value_count: { __template: { field: '' }, field: '{field}', script: {} },
              global: {},
              filter: {},
              filters: {
                __template: { filters: { NAME: {} } },
                filters: { '*': { __scope_link: 'GLOBAL.filter' } },
                other_bucket: { __one_of: [true, false] },
                other_bucket_key: '',
              },
              missing: { __template: { field: '' }, field: '{field}' },
              nested: { __template: { path: '' }, path: '' },
              reverse_nested: { __template: { path: '' }, path: '' },
              terms: {
                __template: { field: '', size: 10 },
                field: '{field}',
                size: 10,
                shard_size: 10,
                order: {
                  __template: { _term: 'asc' },
                  _term: { __one_of: ['asc', 'desc'] },
                  _count: { __one_of: ['asc', 'desc'] },
                  '*': { __one_of: ['asc', 'desc'] },
                },
                min_doc_count: 10,
                script: {},
                include: '.*',
                exclude: '.*',
                execution_hint: {
                  __one_of: [
                    'map',
                    'global_ordinals',
                    'global_ordinals_hash',
                    'global_ordinals_low_cardinality',
                  ],
                },
                show_term_doc_count_error: { __one_of: [true, false] },
                collect_mode: { __one_of: ['depth_first', 'breadth_first'] },
                missing: '',
              },
              significant_text: {
                __template: { field: '' },
                field: '{field}',
                size: 10,
                shard_size: 10,
                shard_min_doc_count: 10,
                min_doc_count: 10,
                include: { __one_of: ['*', { pattern: '', flags: '' }] },
                exclude: { __one_of: ['*', { pattern: '', flags: '' }] },
                execution_hint: { __one_of: ['map', 'global_ordinals', 'global_ordinals_hash'] },
                background_filter: { __scope_link: 'GLOBAL.filter' },
                mutual_information: { include_negatives: { __one_of: [true, false] } },
                chi_square: {
                  include_negatives: { __one_of: [true, false] },
                  background_is_superset: { __one_of: [true, false] },
                },
                percentage: {},
                gnd: { background_is_superset: { __one_of: [true, false] } },
                script_heuristic: {
                  __template: { script: '_subset_freq/(_superset_freq - _subset_freq + 1)' },
                  script: {},
                },
                filter_duplicate_text: '__flag__',
              },
              significant_terms: {
                __template: { field: '' },
                field: '{field}',
                size: 10,
                shard_size: 10,
                shard_min_doc_count: 10,
                min_doc_count: 10,
                include: { __one_of: ['*', { pattern: '', flags: '' }] },
                exclude: { __one_of: ['*', { pattern: '', flags: '' }] },
                execution_hint: { __one_of: ['map', 'global_ordinals', 'global_ordinals_hash'] },
                background_filter: { __scope_link: 'GLOBAL.filter' },
                mutual_information: { include_negatives: { __one_of: [true, false] } },
                chi_square: {
                  include_negatives: { __one_of: [true, false] },
                  background_is_superset: { __one_of: [true, false] },
                },
                percentage: {},
                gnd: { background_is_superset: { __one_of: [true, false] } },
                script_heuristic: {
                  __template: { script: '_subset_freq/(_superset_freq - _subset_freq + 1)' },
                  script: {},
                },
              },
              range: {
                __template: { field: '', ranges: [{ from: 50, to: 100 }] },
                field: '{field}',
                ranges: [{ to: 50, from: 100, key: '' }],
                keyed: { __one_of: [true, false] },
                script: {},
              },
              date_range: {
                __template: { field: '', ranges: [{ from: 'now-10d/d', to: 'now' }] },
                field: '{field}',
                format: 'MM-yyy',
                ranges: [{ to: '', from: '', key: '' }],
                keyed: { __one_of: [true, false] },
                script: {},
              },
              ip_range: {
                __template: { field: '', ranges: [{ from: '10.0.0.5', to: '10.0.0.10' }] },
                field: '{field}',
                format: 'MM-yyy',
                ranges: [{ to: '', from: '', key: '', mask: '10.0.0.127/25' }],
                keyed: { __one_of: [true, false] },
                script: {},
              },
              histogram: {
                __template: { field: 'price', interval: 50 },
                field: '{field}',
                interval: 50,
                extended_bounds: { __template: { min: 0, max: 50 }, min: 0, max: 50 },
                min_doc_count: 0,
                order: {
                  __template: { _key: 'asc' },
                  _key: { __one_of: ['asc', 'desc'] },
                  _count: { __one_of: ['asc', 'desc'] },
                  '*': { __one_of: ['asc', 'desc'] },
                },
                keyed: { __one_of: [true, false] },
                missing: 0,
              },
              date_histogram: {
                __template: { field: 'date', interval: 'month' },
                field: '{field}',
                interval: {
                  __one_of: ['year', 'quarter', 'week', 'day', 'hour', 'minute', 'second'],
                },
                min_doc_count: 0,
                extended_bounds: {
                  __template: { min: 'now/d', max: 'now/d' },
                  min: 'now/d',
                  max: 'now/d',
                },
                order: {
                  __template: { _key: 'asc' },
                  _key: { __one_of: ['asc', 'desc'] },
                  _count: { __one_of: ['asc', 'desc'] },
                  '*': { __one_of: ['asc', 'desc'] },
                },
                keyed: { __one_of: [true, false] },
                pre_zone: '-01:00',
                post_zone: '-01:00',
                pre_zone_adjust_large_interval: { __one_of: [true, false] },
                factor: 1000,
                pre_offset: '1d',
                post_offset: '1d',
                format: 'yyyy-MM-dd',
                time_zone: '00:00',
                missing: '',
              },
              geo_distance: {
                __template: {
                  field: 'location',
                  origin: { lat: 52.376, lon: 4.894 },
                  ranges: [{ from: 100, to: 300 }],
                },
                field: '{field}',
                origin: { lat: 0, lon: 0 },
                unit: { __one_of: ['mi', 'km', 'in', 'yd', 'm', 'cm', 'mm'] },
                ranges: [{ from: 50, to: 100 }],
                distance_type: { __one_of: ['arc', 'sloppy_arc', 'plane'] },
              },
              geohash_grid: {
                __template: { field: '', precision: 3 },
                field: '{field}',
                precision: { __one_of: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
                size: 10,
                shard_size: 10,
              },
              composite: {
                __template: { sources: [{ NAME: { AGG_TYPE: {} } }] },
                sources: [{ __scope_link: '.', __template: { NAME: { AGG_TYPE: {} } } }],
                size: 10,
                after: {},
              },
              percentiles: {
                __template: { field: '', percents: [1, 5, 25, 50, 75, 95, 99] },
                field: '{field}',
                percents: { __template: [1, 5, 25, 50, 75, 95, 99], __any_of: [] },
                script: {},
                compression: 100,
                method: { __one_of: ['hdr', 'tdigest'] },
                missing: 0,
              },
              cardinality: {
                __template: { field: '' },
                precision_threshold: 100,
                rehash: true,
                script: {},
                missing: '',
              },
              cumulative_cardinality: {
                __template: { buckets_path: '' },
                buckets_path: '',
                format: '',
              },
              scripted_metric: {
                __template: {
                  init_script: '',
                  map_script: '',
                  combine_script: '',
                  reduce_script: '',
                },
                init_script: { __scope_link: 'GLOBAL.script' },
                map_script: { __scope_link: 'GLOBAL.script' },
                combine_script: { __scope_link: 'GLOBAL.script' },
                reduce_script: { __scope_link: 'GLOBAL.script' },
                lang: 'groovy',
                params: {},
                reduce_params: {},
              },
              geo_bounds: {
                __template: { field: '' },
                field: '{field}',
                wrap_longitude: { __one_of: [true, false] },
              },
              top_hits: {
                __template: { size: 10 },
                from: 0,
                size: 10,
                sort: { __template: [], __scope_link: 'search.sort' },
                highlight: {},
                explain: { __one_of: [true, false] },
                _source: { __template: '', __scope_link: 'search._source' },
                script_fields: { __scope_link: 'search.script_fields' },
                docvalue_fields: ['{field}'],
                version: { __one_of: [true, false] },
              },
              percentile_ranks: {
                __template: { field: '', values: [10, 15] },
                field: '{field}',
                values: [],
                script: {},
                compression: 100,
                method: { __one_of: ['hdr', 'tdigest'] },
                missing: 0,
              },
              sampler: {
                __template: {},
                field: '{field}',
                script: {},
                shard_size: 100,
                max_docs_per_value: 3,
                execution_hint: { __one_of: ['map', 'global_ordinals', 'bytes_hash'] },
              },
              children: { __template: { type: '' }, type: '' },
              derivative: {
                __template: { buckets_path: '' },
                buckets_path: '',
                format: '',
                gap_policy: { __one_of: ['skip', 'insert_zeros'] },
              },
              avg_bucket: {
                __template: { buckets_path: '' },
                buckets_path: '',
                format: '',
                gap_policy: { __one_of: ['skip', 'insert_zeros'] },
              },
              max_bucket: {
                __template: { buckets_path: '' },
                buckets_path: '',
                format: '',
                gap_policy: { __one_of: ['skip', 'insert_zeros'] },
              },
              min_bucket: {
                __template: { buckets_path: '' },
                buckets_path: '',
                format: '',
                gap_policy: { __one_of: ['skip', 'insert_zeros'] },
              },
              stats_bucket: {
                __template: { buckets_path: '' },
                buckets_path: '',
                format: '',
                gap_policy: { __one_of: ['skip', 'insert_zeros'] },
              },
              extended_stats_bucket: {
                __template: { buckets_path: '' },
                buckets_path: '',
                format: '',
                gap_policy: { __one_of: ['skip', 'insert_zeros'] },
                sigma: '',
              },
              percentiles_bucket: {
                __template: { buckets_path: '' },
                buckets_path: '',
                format: '',
                gap_policy: { __one_of: ['skip', 'insert_zeros'] },
                percents: [],
              },
              sum_bucket: {
                __template: { buckets_path: '' },
                buckets_path: '',
                format: '',
                gap_policy: { __one_of: ['skip', 'insert_zeros'] },
              },
              moving_avg: {
                __template: { buckets_path: '' },
                buckets_path: '',
                format: '',
                gap_policy: { __one_of: ['skip', 'insert_zeros'] },
                window: 5,
                model: { __one_of: ['simple', 'linear', 'ewma', 'holt', 'holt_winters'] },
                settings: {
                  type: { __one_of: ['add', 'mult'] },
                  alpha: 0.5,
                  beta: 0.5,
                  gamma: 0.5,
                  period: 7,
                },
              },
              cumulative_sum: { __template: { buckets_path: '' }, buckets_path: '', format: '' },
              serial_diff: {
                __template: { buckets_path: '', lag: 7 },
                lag: 7,
                gap_policy: { __one_of: ['skip', 'insert_zeros'] },
                buckets_path: '',
                format: '',
              },
              bucket_script: {
                __template: { buckets_path: {}, script: '' },
                buckets_path: {},
                format: '',
                gap_policy: { __one_of: ['skip', 'insert_zeros'] },
                script: '',
              },
              bucket_selector: {
                __template: { buckets_path: {}, script: '' },
                buckets_path: {},
                gap_policy: { __one_of: ['skip', 'insert_zeros'] },
                script: '',
              },
              bucket_sort: {
                __template: { sort: [] },
                sort: ['{field}'],
                from: 0,
                size: 0,
                gap_policy: { __one_of: ['skip', 'insert_zeros'] },
              },
              matrix_stats: { __template: { fields: [] }, fields: ['{field}'] },
            },
          },
          aggs: {
            '*': {
              aggs: { __template: { NAME: { AGG_TYPE: {} } } },
              adjacency_matrix: { filters: {} },
              diversified_sampler: { shard_size: '', field: '' },
              min: { __template: { field: '' }, field: '{field}', missing: 0, script: {} },
              max: { __template: { field: '' }, field: '{field}', missing: 0, script: {} },
              avg: { __template: { field: '' }, field: '{field}', missing: 0, script: {} },
              sum: { __template: { field: '' }, field: '{field}', missing: 0, script: {} },
              stats: { __template: { field: '' }, field: '{field}', missing: 0, script: {} },
              extended_stats: {
                __template: { field: '' },
                field: '{field}',
                missing: 0,
                script: {},
              },
              value_count: { __template: { field: '' }, field: '{field}', script: {} },
              global: {},
              filter: {},
              filters: {
                __template: { filters: { NAME: {} } },
                filters: { '*': { __scope_link: 'GLOBAL.filter' } },
                other_bucket: { __one_of: [true, false] },
                other_bucket_key: '',
              },
              missing: { __template: { field: '' }, field: '{field}' },
              nested: { __template: { path: '' }, path: '' },
              reverse_nested: { __template: { path: '' }, path: '' },
              terms: {
                __template: { field: '', size: 10 },
                field: '{field}',
                size: 10,
                shard_size: 10,
                order: {
                  __template: { _term: 'asc' },
                  _term: { __one_of: ['asc', 'desc'] },
                  _count: { __one_of: ['asc', 'desc'] },
                  '*': { __one_of: ['asc', 'desc'] },
                },
                min_doc_count: 10,
                script: {},
                include: '.*',
                exclude: '.*',
                execution_hint: {
                  __one_of: [
                    'map',
                    'global_ordinals',
                    'global_ordinals_hash',
                    'global_ordinals_low_cardinality',
                  ],
                },
                show_term_doc_count_error: { __one_of: [true, false] },
                collect_mode: { __one_of: ['depth_first', 'breadth_first'] },
                missing: '',
              },
              significant_text: {
                __template: { field: '' },
                field: '{field}',
                size: 10,
                shard_size: 10,
                shard_min_doc_count: 10,
                min_doc_count: 10,
                include: { __one_of: ['*', { pattern: '', flags: '' }] },
                exclude: { __one_of: ['*', { pattern: '', flags: '' }] },
                execution_hint: { __one_of: ['map', 'global_ordinals', 'global_ordinals_hash'] },
                background_filter: { __scope_link: 'GLOBAL.filter' },
                mutual_information: { include_negatives: { __one_of: [true, false] } },
                chi_square: {
                  include_negatives: { __one_of: [true, false] },
                  background_is_superset: { __one_of: [true, false] },
                },
                percentage: {},
                gnd: { background_is_superset: { __one_of: [true, false] } },
                script_heuristic: {
                  __template: { script: '_subset_freq/(_superset_freq - _subset_freq + 1)' },
                  script: {},
                },
                filter_duplicate_text: '__flag__',
              },
              significant_terms: {
                __template: { field: '' },
                field: '{field}',
                size: 10,
                shard_size: 10,
                shard_min_doc_count: 10,
                min_doc_count: 10,
                include: { __one_of: ['*', { pattern: '', flags: '' }] },
                exclude: { __one_of: ['*', { pattern: '', flags: '' }] },
                execution_hint: { __one_of: ['map', 'global_ordinals', 'global_ordinals_hash'] },
                background_filter: { __scope_link: 'GLOBAL.filter' },
                mutual_information: { include_negatives: { __one_of: [true, false] } },
                chi_square: {
                  include_negatives: { __one_of: [true, false] },
                  background_is_superset: { __one_of: [true, false] },
                },
                percentage: {},
                gnd: { background_is_superset: { __one_of: [true, false] } },
                script_heuristic: {
                  __template: { script: '_subset_freq/(_superset_freq - _subset_freq + 1)' },
                  script: {},
                },
              },
              range: {
                __template: { field: '', ranges: [{ from: 50, to: 100 }] },
                field: '{field}',
                ranges: [{ to: 50, from: 100, key: '' }],
                keyed: { __one_of: [true, false] },
                script: {},
              },
              date_range: {
                __template: { field: '', ranges: [{ from: 'now-10d/d', to: 'now' }] },
                field: '{field}',
                format: 'MM-yyy',
                ranges: [{ to: '', from: '', key: '' }],
                keyed: { __one_of: [true, false] },
                script: {},
              },
              ip_range: {
                __template: { field: '', ranges: [{ from: '10.0.0.5', to: '10.0.0.10' }] },
                field: '{field}',
                format: 'MM-yyy',
                ranges: [{ to: '', from: '', key: '', mask: '10.0.0.127/25' }],
                keyed: { __one_of: [true, false] },
                script: {},
              },
              histogram: {
                __template: { field: 'price', interval: 50 },
                field: '{field}',
                interval: 50,
                extended_bounds: { __template: { min: 0, max: 50 }, min: 0, max: 50 },
                min_doc_count: 0,
                order: {
                  __template: { _key: 'asc' },
                  _key: { __one_of: ['asc', 'desc'] },
                  _count: { __one_of: ['asc', 'desc'] },
                  '*': { __one_of: ['asc', 'desc'] },
                },
                keyed: { __one_of: [true, false] },
                missing: 0,
              },
              date_histogram: {
                __template: { field: 'date', interval: 'month' },
                field: '{field}',
                interval: {
                  __one_of: ['year', 'quarter', 'week', 'day', 'hour', 'minute', 'second'],
                },
                min_doc_count: 0,
                extended_bounds: {
                  __template: { min: 'now/d', max: 'now/d' },
                  min: 'now/d',
                  max: 'now/d',
                },
                order: {
                  __template: { _key: 'asc' },
                  _key: { __one_of: ['asc', 'desc'] },
                  _count: { __one_of: ['asc', 'desc'] },
                  '*': { __one_of: ['asc', 'desc'] },
                },
                keyed: { __one_of: [true, false] },
                pre_zone: '-01:00',
                post_zone: '-01:00',
                pre_zone_adjust_large_interval: { __one_of: [true, false] },
                factor: 1000,
                pre_offset: '1d',
                post_offset: '1d',
                format: 'yyyy-MM-dd',
                time_zone: '00:00',
                missing: '',
              },
              geo_distance: {
                __template: {
                  field: 'location',
                  origin: { lat: 52.376, lon: 4.894 },
                  ranges: [{ from: 100, to: 300 }],
                },
                field: '{field}',
                origin: { lat: 0, lon: 0 },
                unit: { __one_of: ['mi', 'km', 'in', 'yd', 'm', 'cm', 'mm'] },
                ranges: [{ from: 50, to: 100 }],
                distance_type: { __one_of: ['arc', 'sloppy_arc', 'plane'] },
              },
              geohash_grid: {
                __template: { field: '', precision: 3 },
                field: '{field}',
                precision: { __one_of: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
                size: 10,
                shard_size: 10,
              },
              composite: {
                __template: { sources: [{ NAME: { AGG_TYPE: {} } }] },
                sources: [{ __scope_link: '.', __template: { NAME: { AGG_TYPE: {} } } }],
                size: 10,
                after: {},
              },
              percentiles: {
                __template: { field: '', percents: [1, 5, 25, 50, 75, 95, 99] },
                field: '{field}',
                percents: { __template: [1, 5, 25, 50, 75, 95, 99], __any_of: [] },
                script: {},
                compression: 100,
                method: { __one_of: ['hdr', 'tdigest'] },
                missing: 0,
              },
              cardinality: {
                __template: { field: '' },
                precision_threshold: 100,
                rehash: true,
                script: {},
                missing: '',
              },
              cumulative_cardinality: {
                __template: { buckets_path: '' },
                buckets_path: '',
                format: '',
              },
              scripted_metric: {
                __template: {
                  init_script: '',
                  map_script: '',
                  combine_script: '',
                  reduce_script: '',
                },
                init_script: { __scope_link: 'GLOBAL.script' },
                map_script: { __scope_link: 'GLOBAL.script' },
                combine_script: { __scope_link: 'GLOBAL.script' },
                reduce_script: { __scope_link: 'GLOBAL.script' },
                lang: 'groovy',
                params: {},
                reduce_params: {},
              },
              geo_bounds: {
                __template: { field: '' },
                field: '{field}',
                wrap_longitude: { __one_of: [true, false] },
              },
              top_hits: {
                __template: { size: 10 },
                from: 0,
                size: 10,
                sort: { __template: [], __scope_link: 'search.sort' },
                highlight: {},
                explain: { __one_of: [true, false] },
                _source: { __template: '', __scope_link: 'search._source' },
                script_fields: { __scope_link: 'search.script_fields' },
                docvalue_fields: ['{field}'],
                version: { __one_of: [true, false] },
              },
              percentile_ranks: {
                __template: { field: '', values: [10, 15] },
                field: '{field}',
                values: [],
                script: {},
                compression: 100,
                method: { __one_of: ['hdr', 'tdigest'] },
                missing: 0,
              },
              sampler: {
                __template: {},
                field: '{field}',
                script: {},
                shard_size: 100,
                max_docs_per_value: 3,
                execution_hint: { __one_of: ['map', 'global_ordinals', 'bytes_hash'] },
              },
              children: { __template: { type: '' }, type: '' },
              derivative: {
                __template: { buckets_path: '' },
                buckets_path: '',
                format: '',
                gap_policy: { __one_of: ['skip', 'insert_zeros'] },
              },
              avg_bucket: {
                __template: { buckets_path: '' },
                buckets_path: '',
                format: '',
                gap_policy: { __one_of: ['skip', 'insert_zeros'] },
              },
              max_bucket: {
                __template: { buckets_path: '' },
                buckets_path: '',
                format: '',
                gap_policy: { __one_of: ['skip', 'insert_zeros'] },
              },
              min_bucket: {
                __template: { buckets_path: '' },
                buckets_path: '',
                format: '',
                gap_policy: { __one_of: ['skip', 'insert_zeros'] },
              },
              stats_bucket: {
                __template: { buckets_path: '' },
                buckets_path: '',
                format: '',
                gap_policy: { __one_of: ['skip', 'insert_zeros'] },
              },
              extended_stats_bucket: {
                __template: { buckets_path: '' },
                buckets_path: '',
                format: '',
                gap_policy: { __one_of: ['skip', 'insert_zeros'] },
                sigma: '',
              },
              percentiles_bucket: {
                __template: { buckets_path: '' },
                buckets_path: '',
                format: '',
                gap_policy: { __one_of: ['skip', 'insert_zeros'] },
                percents: [],
              },
              sum_bucket: {
                __template: { buckets_path: '' },
                buckets_path: '',
                format: '',
                gap_policy: { __one_of: ['skip', 'insert_zeros'] },
              },
              moving_avg: {
                __template: { buckets_path: '' },
                buckets_path: '',
                format: '',
                gap_policy: { __one_of: ['skip', 'insert_zeros'] },
                window: 5,
                model: { __one_of: ['simple', 'linear', 'ewma', 'holt', 'holt_winters'] },
                settings: {
                  type: { __one_of: ['add', 'mult'] },
                  alpha: 0.5,
                  beta: 0.5,
                  gamma: 0.5,
                  period: 7,
                },
              },
              cumulative_sum: { __template: { buckets_path: '' }, buckets_path: '', format: '' },
              serial_diff: {
                __template: { buckets_path: '', lag: 7 },
                lag: 7,
                gap_policy: { __one_of: ['skip', 'insert_zeros'] },
                buckets_path: '',
                format: '',
              },
              bucket_script: {
                __template: { buckets_path: {}, script: '' },
                buckets_path: {},
                format: '',
                gap_policy: { __one_of: ['skip', 'insert_zeros'] },
                script: '',
              },
              bucket_selector: {
                __template: { buckets_path: {}, script: '' },
                buckets_path: {},
                gap_policy: { __one_of: ['skip', 'insert_zeros'] },
                script: '',
              },
              bucket_sort: {
                __template: { sort: [] },
                sort: ['{field}'],
                from: 0,
                size: 0,
                gap_policy: { __one_of: ['skip', 'insert_zeros'] },
              },
              matrix_stats: { __template: { fields: [] }, fields: ['{field}'] },
            },
          },
          groupByAggs: {
            '*': {
              terms: {
                __template: { field: '', size: 10 },
                field: '{field}',
                size: 10,
                shard_size: 10,
                order: {
                  __template: { _term: 'asc' },
                  _term: { __one_of: ['asc', 'desc'] },
                  _count: { __one_of: ['asc', 'desc'] },
                  '*': { __one_of: ['asc', 'desc'] },
                },
                min_doc_count: 10,
                script: {},
                include: '.*',
                exclude: '.*',
                execution_hint: {
                  __one_of: [
                    'map',
                    'global_ordinals',
                    'global_ordinals_hash',
                    'global_ordinals_low_cardinality',
                  ],
                },
                show_term_doc_count_error: { __one_of: [true, false] },
                collect_mode: { __one_of: ['depth_first', 'breadth_first'] },
                missing: '',
              },
              histogram: {
                __template: { field: 'price', interval: 50 },
                field: '{field}',
                interval: 50,
                extended_bounds: { __template: { min: 0, max: 50 }, min: 0, max: 50 },
                min_doc_count: 0,
                order: {
                  __template: { _key: 'asc' },
                  _key: { __one_of: ['asc', 'desc'] },
                  _count: { __one_of: ['asc', 'desc'] },
                  '*': { __one_of: ['asc', 'desc'] },
                },
                keyed: { __one_of: [true, false] },
                missing: 0,
              },
              date_histogram: {
                __template: { field: 'date', interval: 'month' },
                field: '{field}',
                interval: {
                  __one_of: ['year', 'quarter', 'week', 'day', 'hour', 'minute', 'second'],
                },
                min_doc_count: 0,
                extended_bounds: {
                  __template: { min: 'now/d', max: 'now/d' },
                  min: 'now/d',
                  max: 'now/d',
                },
                order: {
                  __template: { _key: 'asc' },
                  _key: { __one_of: ['asc', 'desc'] },
                  _count: { __one_of: ['asc', 'desc'] },
                  '*': { __one_of: ['asc', 'desc'] },
                },
                keyed: { __one_of: [true, false] },
                pre_zone: '-01:00',
                post_zone: '-01:00',
                pre_zone_adjust_large_interval: { __one_of: [true, false] },
                factor: 1000,
                pre_offset: '1d',
                post_offset: '1d',
                format: 'yyyy-MM-dd',
                time_zone: '00:00',
                missing: '',
              },
            },
          },
          filter: {
            and: { __template: { filters: [{}] }, filters: [{ __scope_link: '.' }] },
            bool: { __scope_link: 'GLOBAL.query' },
            exists: { __template: { field: 'FIELD_NAME' }, field: '{field}' },
            ids: { __template: { values: ['ID'] }, type: '{type}', values: [''] },
            limit: { __template: { value: 100 }, value: 100 },
            type: { __template: { value: 'TYPE' }, value: '{type}' },
            geo_bounding_box: {
              __template: {
                FIELD: {
                  top_left: { lat: 40.73, lon: -74.1 },
                  bottom_right: { lat: 40.717, lon: -73.99 },
                },
              },
              '{field}': {
                top_left: { lat: 40.73, lon: -74.1 },
                bottom_right: { lat: 40.73, lon: -74.1 },
              },
              type: { __one_of: ['memory', 'indexed'] },
            },
            geo_distance: {
              __template: { distance: 100, distance_unit: 'km', FIELD: { lat: 40.73, lon: -74.1 } },
              distance: 100,
              distance_unit: { __one_of: ['km', 'miles'] },
              distance_type: { __one_of: ['arc', 'plane'] },
              optimize_bbox: { __one_of: ['memory', 'indexed', 'none'] },
              '{field}': { lat: 40.73, lon: -74.1 },
            },
            geo_distance_range: {
              __template: {
                from: 100,
                to: 200,
                distance_unit: 'km',
                FIELD: { lat: 40.73, lon: -74.1 },
              },
              from: 100,
              to: 200,
              distance_unit: { __one_of: ['km', 'miles'] },
              distance_type: { __one_of: ['arc', 'plane'] },
              include_lower: { __one_of: [true, false] },
              include_upper: { __one_of: [true, false] },
              '{field}': { lat: 40.73, lon: -74.1 },
            },
            geo_polygon: {
              __template: {
                FIELD: {
                  points: [
                    { lat: 40.73, lon: -74.1 },
                    { lat: 40.83, lon: -75.1 },
                  ],
                },
              },
              '{field}': { points: [{ lat: 40.73, lon: -74.1 }] },
            },
            geo_shape: {
              __template: {
                FIELD: {
                  shape: {
                    type: 'envelope',
                    coordinates: [
                      [-45, 45],
                      [45, -45],
                    ],
                  },
                  relation: 'within',
                },
              },
              '{field}': {
                shape: { type: '', coordinates: [] },
                indexed_shape: {
                  id: '',
                  index: '{index}',
                  type: '{type}',
                  shape_field_name: 'shape',
                },
                relation: { __one_of: ['within', 'intersects', 'disjoint'] },
              },
            },
            has_child: {
              __template: { type: 'TYPE', filter: {} },
              type: '{type}',
              query: {},
              filter: {},
              _scope: '',
              min_children: 1,
              max_children: 10,
            },
            has_parent: {
              __template: { parent_type: 'TYPE', filter: {} },
              parent_type: '{type}',
              query: {},
              filter: {},
              _scope: '',
            },
            missing: {
              __template: { field: 'FIELD' },
              existence: { __one_of: [true, false] },
              null_value: { __one_of: [true, false] },
              field: '{field}',
            },
            m: {
              __template: { field: 'FIELD' },
              existence: { __one_of: [true, false] },
              null_value: { __one_of: [true, false] },
              field: '{field}',
            },
            not: { __template: { filter: {} }, filter: {} },
            range: {
              __template: { FIELD: { gte: 10, lte: 20 } },
              '{field}': {
                gte: 1,
                gt: 1,
                lte: 20,
                lt: 20,
                time_zone: '+01:00',
                format: 'dd/MM/yyyy||yyyy',
                execution: { __one_of: ['index', 'fielddata'] },
              },
            },
            or: { __template: { filters: [{}] }, filters: [{ __scope_link: '.' }] },
            prefix: { __template: { FIELD: 'VALUE' }, '{field}': '' },
            query: {},
            script: { __template: { script: {} }, script: {} },
            term: { __template: { FIELD: 'VALUE' }, '{field}': '' },
            terms: {
              __template: { FIELD: ['VALUE1', 'VALUE2'] },
              field: ['{field}'],
              execution: {
                __one_of: [
                  'plain',
                  'bool',
                  'and',
                  'or',
                  'bool_nocache',
                  'and_nocache',
                  'or_nocache',
                ],
              },
            },
            nested: {
              __template: { path: 'path_to_nested_doc', query: {} },
              query: {},
              path: '',
              _name: '',
            },
          },
          highlight: {
            boundary_chars: {},
            boundary_max_scan: 20,
            boundary_scanner: { __one_of: ['chars', 'sentence', 'word'] },
            boundary_scanner_locale: {},
            encoder: { __one_of: ['default', 'html'] },
            force_source: { __one_of: ['false', 'true'] },
            fragmenter: { __one_of: ['simple', 'span'] },
            highlight_query: { __scope_link: 'GLOBAL.query' },
            matched_fields: ['FIELD'],
            order: {},
            no_match_size: 0,
            number_of_fragments: 5,
            phrase_limit: 256,
            pre_tags: {},
            post_tags: {},
            require_field_match: { __one_of: ['true', 'false'] },
            tags_schema: {},
            fields: {
              '{field}': {
                fragment_size: 20,
                number_of_fragments: 5,
                boundary_chars: {},
                boundary_max_scan: 20,
                boundary_scanner: { __one_of: ['chars', 'sentence', 'word'] },
                boundary_scanner_locale: {},
                encoder: { __one_of: ['default', 'html'] },
                force_source: { __one_of: ['false', 'true'] },
                fragmenter: { __one_of: ['simple', 'span'] },
                highlight_query: { __scope_link: 'GLOBAL.query' },
                matched_fields: ['FIELD'],
                order: {},
                no_match_size: 0,
                phrase_limit: 256,
                pre_tags: {},
                post_tags: {},
                require_field_match: { __one_of: ['true', 'false'] },
                tags_schema: {},
              },
            },
          },
          script: {
            __template: { source: 'SCRIPT' },
            source: 'SCRIPT',
            file: 'FILE_SCRIPT_NAME',
            id: 'SCRIPT_ID',
            lang: '',
            params: {},
          },
          query: {
            match: {
              __template: { FIELD: 'TEXT' },
              '{field}': {
                type: { __one_of: ['phrase', 'phrase_prefix', 'boolean'] },
                cutoff_frequency: 0.001,
                query: '',
                operator: { __one_of: ['and', 'or'] },
                zero_terms_query: { __one_of: ['none', 'all'] },
                max_expansions: 10,
                analyzer: '',
                boost: 1,
                lenient: { __one_of: ['true', 'false'] },
                fuzzy_transpositions: { __one_of: ['true', 'false'] },
                auto_generate_synonyms_phrase_query: { __one_of: ['true', 'false'] },
                fuzziness: 1,
                prefix_length: 1,
                minimum_should_match: 1,
              },
            },
            match_phrase: {
              __template: { FIELD: 'PHRASE' },
              '{field}': { query: '', analyzer: '', slop: 1 },
            },
            match_phrase_prefix: {
              __template: { FIELD: 'PREFIX' },
              '{field}': {
                query: '',
                analyzer: '',
                max_expansions: 10,
                prefix_length: 1,
                fuzziness: 0.1,
              },
            },
            regexp: {
              __template: { FIELD: 'REGEXP' },
              '{field}': {
                value: '',
                flags: {
                  __one_of: [
                    'ALL',
                    'ANYSTRING',
                    'COMPLEMENT',
                    'EMPTY',
                    'INTERSECTION',
                    'INTERVAL',
                    'NONE',
                  ],
                },
                max_determinized_states: 10000,
              },
            },
            multi_match: {
              __template: { query: '', fields: [] },
              cutoff_frequency: 0.001,
              query: '',
              operator: { __one_of: ['and', 'or'] },
              zero_terms_query: { __one_of: ['none', 'all'] },
              max_expansions: 10,
              analyzer: '',
              boost: 1,
              lenient: { __one_of: ['true', 'false'] },
              fuzzy_transpositions: { __one_of: ['true', 'false'] },
              auto_generate_synonyms_phrase_query: { __one_of: ['true', 'false'] },
              fuzziness: 1,
              prefix_length: 1,
              minimum_should_match: 1,
              fields: ['{field}'],
              use_dis_max: { __template: true, __one_of: [true, false] },
              tie_breaker: 0,
              type: {
                __one_of: ['best_fields', 'most_fields', 'cross_fields', 'phrase', 'phrase_prefix'],
              },
            },
            bool: {
              must: [{ __scope_link: '.' }],
              must_not: [{ __scope_link: '.' }],
              should: [{ __scope_link: '.' }],
              filter: { __scope_link: 'GLOBAL.filter' },
              minimum_should_match: 1,
              boost: 1,
            },
            boosting: {
              positive: { __scope_link: '.' },
              negative: { __scope_link: '.' },
              negative_boost: 0.2,
            },
            ids: { type: '', values: [] },
            constant_score: {
              __template: { filter: {}, boost: 1.2 },
              query: {},
              filter: {},
              boost: 1.2,
            },
            dis_max: {
              __template: { tie_breaker: 0.7, boost: 1.2, queries: [] },
              tie_breaker: 0.7,
              boost: 1.2,
              queries: [{ __scope_link: '.' }],
            },
            distance_feature: {
              __template: { field: '', origin: '', pivot: '' },
              field: '{field}',
              origin: '',
              pivot: '',
            },
            exists: { field: '' },
            field: {
              '{field}': {
                query: '',
                boost: 2,
                enable_position_increments: { __template: false, __one_of: [true, false] },
              },
            },
            fuzzy: {
              __template: { FIELD: {} },
              '{field}': { value: '', boost: 1, fuzziness: 0.5, prefix_length: 0 },
            },
            has_child: {
              __template: { type: 'TYPE', query: {} },
              inner_hits: {
                docvalue_fields: ['FIELD'],
                from: {},
                size: {},
                sort: {},
                name: {},
                highlight: {},
                _source: { __one_of: ['true', 'false'] },
                explain: { __one_of: ['true', 'false'] },
                script_fields: { __template: { FIELD: { script: {} } }, '{field}': { script: {} } },
                version: { __one_of: ['true', 'false'] },
              },
              type: '{type}',
              score_mode: { __one_of: ['none', 'max', 'sum', 'avg'] },
              _scope: '',
              query: {},
              min_children: 1,
              max_children: 10,
            },
            has_parent: {
              __template: { parent_type: 'TYPE', query: {} },
              parent_type: '{type}',
              score_mode: { __one_of: ['none', 'score'] },
              _scope: '',
              query: {},
            },
            match_all: { boost: 1 },
            more_like_this: {
              __template: {
                fields: ['FIELD'],
                like: 'text like this one',
                min_term_freq: 1,
                max_query_terms: 12,
              },
              fields: ['{field}'],
              like: '',
              percent_terms_to_match: 0.3,
              min_term_freq: 2,
              max_query_terms: 25,
              stop_words: [''],
              min_doc_freq: 5,
              max_doc_freq: 100,
              min_word_len: 0,
              max_word_len: 0,
              boost_terms: 1,
              boost: 1,
              analyzer: '',
              docs: [{ _index: '{index}', _type: '{type}', _id: '' }],
              ids: [''],
            },
            mlt: {
              __template: {
                fields: ['FIELD'],
                like: 'text like this one',
                min_term_freq: 1,
                max_query_terms: 12,
              },
              __scope_link: '.more_like_this',
            },
            prefix: { __template: { FIELD: { value: '' } }, '{field}': { value: '', boost: 1 } },
            query_string: {
              __template: { default_field: 'FIELD', query: 'this AND that OR thus' },
              query: '',
              default_field: '{field}',
              fields: ['{field}'],
              default_operator: { __one_of: ['OR', 'AND'] },
              analyzer: '',
              allow_leading_wildcard: { __one_of: [true, false] },
              enable_position_increments: { __one_of: [true, false] },
              fuzzy_max_expansions: 50,
              fuzziness: 0.5,
              fuzzy_prefix_length: 0,
              phrase_slop: 0,
              boost: 1,
              analyze_wildcard: { __one_of: [false, true] },
              auto_generate_phrase_queries: { __one_of: [false, true] },
              minimum_should_match: '20%',
              lenient: { __one_of: [false, true] },
              use_dis_max: { __one_of: [true, false] },
              tie_breaker: 0,
              time_zone: '+01:00',
            },
            simple_query_string: {
              __template: { query: '', fields: [] },
              query: '',
              fields: ['{field}'],
              default_operator: { __one_of: ['OR', 'AND'] },
              analyzer: '',
              flags: 'OR|AND|PREFIX',
              locale: 'ROOT',
              lenient: { __one_of: [true, false] },
            },
            range: {
              __template: { FIELD: { gte: 10, lte: 20 } },
              '{field}': {
                __template: { gte: 10, lte: 20 },
                gte: 10,
                gt: 10,
                lte: 20,
                lt: 20,
                time_zone: '+01:00',
                boost: 1,
                format: 'dd/MM/yyyy||yyyy',
              },
            },
            span_first: {
              __template: { match: { span_term: { FIELD: 'VALUE' } }, end: 3 },
              match: {
                span_first: {
                  __template: { match: { span_term: { FIELD: 'VALUE' } }, end: 3 },
                  __scope_link: '.span_first',
                },
                span_near: {
                  __template: {
                    clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }],
                    slop: 12,
                    in_order: false,
                  },
                  __scope_link: '.span_near',
                },
                span_or: {
                  __template: { clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }] },
                  __scope_link: '.span_or',
                },
                span_not: {
                  __template: {
                    include: { span_term: { FIELD: { value: 'VALUE' } } },
                    exclude: { span_term: { FIELD: { value: 'VALUE' } } },
                  },
                  __scope_link: '.span_not',
                },
                span_term: {
                  __template: { FIELD: { value: 'VALUE' } },
                  __scope_link: '.span_term',
                },
                span_containing: {
                  __template: {
                    little: { span_term: { FIELD: { value: 'VALUE' } } },
                    big: {
                      span_near: {
                        clauses: [
                          { span_term: { FIELD: { value: 'VALUE' } } },
                          { span_term: { FIELD: { value: 'VALUE' } } },
                        ],
                        slop: 5,
                        in_order: false,
                      },
                    },
                  },
                  __scope_link: '.span_containing',
                },
                span_within: {
                  __template: {
                    little: { span_term: { FIELD: { value: 'VALUE' } } },
                    big: {
                      span_near: {
                        clauses: [
                          { span_term: { FIELD: { value: 'VALUE' } } },
                          { span_term: { FIELD: { value: 'VALUE' } } },
                        ],
                        slop: 5,
                        in_order: false,
                      },
                    },
                  },
                  __scope_link: '.span_within',
                },
                field_masking_span: {
                  __template: { query: { SPAN_QUERY: {} } },
                  query: {
                    span_first: {
                      __template: { match: { span_term: { FIELD: 'VALUE' } }, end: 3 },
                      __scope_link: '.span_first',
                    },
                    span_near: {
                      __template: {
                        clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }],
                        slop: 12,
                        in_order: false,
                      },
                      __scope_link: '.span_near',
                    },
                    span_or: {
                      __template: { clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }] },
                      __scope_link: '.span_or',
                    },
                    span_not: {
                      __template: {
                        include: { span_term: { FIELD: { value: 'VALUE' } } },
                        exclude: { span_term: { FIELD: { value: 'VALUE' } } },
                      },
                      __scope_link: '.span_not',
                    },
                    span_term: {
                      __template: { FIELD: { value: 'VALUE' } },
                      __scope_link: '.span_term',
                    },
                    span_containing: {
                      __template: {
                        little: { span_term: { FIELD: { value: 'VALUE' } } },
                        big: {
                          span_near: {
                            clauses: [
                              { span_term: { FIELD: { value: 'VALUE' } } },
                              { span_term: { FIELD: { value: 'VALUE' } } },
                            ],
                            slop: 5,
                            in_order: false,
                          },
                        },
                      },
                      __scope_link: '.span_containing',
                    },
                    span_within: {
                      __template: {
                        little: { span_term: { FIELD: { value: 'VALUE' } } },
                        big: {
                          span_near: {
                            clauses: [
                              { span_term: { FIELD: { value: 'VALUE' } } },
                              { span_term: { FIELD: { value: 'VALUE' } } },
                            ],
                            slop: 5,
                            in_order: false,
                          },
                        },
                      },
                      __scope_link: '.span_within',
                    },
                  },
                  field: '',
                },
              },
            },
            span_multi: {
              __template: { match: { MULTI_TERM_QUERY: {} } },
              match: {
                wildcard: { __template: { FIELD: { value: 'VALUE' } }, __scope_link: '.wildcard' },
                fuzzy: { __template: { FIELD: {} }, __scope_link: '.fuzzy' },
                prefix: { __template: { FIELD: { value: '' } }, __scope_link: '.prefix' },
                range: { __template: { FIELD: { gte: 10, lte: 20 } }, __scope_link: '.range' },
                regexp: { __template: { FIELD: 'REGEXP' }, __scope_link: '.regexp' },
              },
            },
            span_near: {
              __template: {
                clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }],
                slop: 12,
                in_order: false,
              },
              clauses: [
                {
                  span_first: {
                    __template: { match: { span_term: { FIELD: 'VALUE' } }, end: 3 },
                    __scope_link: '.span_first',
                  },
                  span_near: {
                    __template: {
                      clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }],
                      slop: 12,
                      in_order: false,
                    },
                    __scope_link: '.span_near',
                  },
                  span_or: {
                    __template: { clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }] },
                    __scope_link: '.span_or',
                  },
                  span_not: {
                    __template: {
                      include: { span_term: { FIELD: { value: 'VALUE' } } },
                      exclude: { span_term: { FIELD: { value: 'VALUE' } } },
                    },
                    __scope_link: '.span_not',
                  },
                  span_term: {
                    __template: { FIELD: { value: 'VALUE' } },
                    __scope_link: '.span_term',
                  },
                  span_containing: {
                    __template: {
                      little: { span_term: { FIELD: { value: 'VALUE' } } },
                      big: {
                        span_near: {
                          clauses: [
                            { span_term: { FIELD: { value: 'VALUE' } } },
                            { span_term: { FIELD: { value: 'VALUE' } } },
                          ],
                          slop: 5,
                          in_order: false,
                        },
                      },
                    },
                    __scope_link: '.span_containing',
                  },
                  span_within: {
                    __template: {
                      little: { span_term: { FIELD: { value: 'VALUE' } } },
                      big: {
                        span_near: {
                          clauses: [
                            { span_term: { FIELD: { value: 'VALUE' } } },
                            { span_term: { FIELD: { value: 'VALUE' } } },
                          ],
                          slop: 5,
                          in_order: false,
                        },
                      },
                    },
                    __scope_link: '.span_within',
                  },
                  field_masking_span: {
                    __template: { query: { SPAN_QUERY: {} } },
                    query: {
                      span_first: {
                        __template: { match: { span_term: { FIELD: 'VALUE' } }, end: 3 },
                        __scope_link: '.span_first',
                      },
                      span_near: {
                        __template: {
                          clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }],
                          slop: 12,
                          in_order: false,
                        },
                        __scope_link: '.span_near',
                      },
                      span_or: {
                        __template: { clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }] },
                        __scope_link: '.span_or',
                      },
                      span_not: {
                        __template: {
                          include: { span_term: { FIELD: { value: 'VALUE' } } },
                          exclude: { span_term: { FIELD: { value: 'VALUE' } } },
                        },
                        __scope_link: '.span_not',
                      },
                      span_term: {
                        __template: { FIELD: { value: 'VALUE' } },
                        __scope_link: '.span_term',
                      },
                      span_containing: {
                        __template: {
                          little: { span_term: { FIELD: { value: 'VALUE' } } },
                          big: {
                            span_near: {
                              clauses: [
                                { span_term: { FIELD: { value: 'VALUE' } } },
                                { span_term: { FIELD: { value: 'VALUE' } } },
                              ],
                              slop: 5,
                              in_order: false,
                            },
                          },
                        },
                        __scope_link: '.span_containing',
                      },
                      span_within: {
                        __template: {
                          little: { span_term: { FIELD: { value: 'VALUE' } } },
                          big: {
                            span_near: {
                              clauses: [
                                { span_term: { FIELD: { value: 'VALUE' } } },
                                { span_term: { FIELD: { value: 'VALUE' } } },
                              ],
                              slop: 5,
                              in_order: false,
                            },
                          },
                        },
                        __scope_link: '.span_within',
                      },
                    },
                    field: '',
                  },
                },
              ],
              slop: 12,
              in_order: { __one_of: [false, true] },
              collect_payloads: { __one_of: [false, true] },
            },
            span_term: {
              __template: { FIELD: { value: 'VALUE' } },
              '{field}': { value: '', boost: 2 },
            },
            span_not: {
              __template: {
                include: { span_term: { FIELD: { value: 'VALUE' } } },
                exclude: { span_term: { FIELD: { value: 'VALUE' } } },
              },
              include: {
                span_first: {
                  __template: { match: { span_term: { FIELD: 'VALUE' } }, end: 3 },
                  __scope_link: '.span_first',
                },
                span_near: {
                  __template: {
                    clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }],
                    slop: 12,
                    in_order: false,
                  },
                  __scope_link: '.span_near',
                },
                span_or: {
                  __template: { clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }] },
                  __scope_link: '.span_or',
                },
                span_not: {
                  __template: {
                    include: { span_term: { FIELD: { value: 'VALUE' } } },
                    exclude: { span_term: { FIELD: { value: 'VALUE' } } },
                  },
                  __scope_link: '.span_not',
                },
                span_term: {
                  __template: { FIELD: { value: 'VALUE' } },
                  __scope_link: '.span_term',
                },
                span_containing: {
                  __template: {
                    little: { span_term: { FIELD: { value: 'VALUE' } } },
                    big: {
                      span_near: {
                        clauses: [
                          { span_term: { FIELD: { value: 'VALUE' } } },
                          { span_term: { FIELD: { value: 'VALUE' } } },
                        ],
                        slop: 5,
                        in_order: false,
                      },
                    },
                  },
                  __scope_link: '.span_containing',
                },
                span_within: {
                  __template: {
                    little: { span_term: { FIELD: { value: 'VALUE' } } },
                    big: {
                      span_near: {
                        clauses: [
                          { span_term: { FIELD: { value: 'VALUE' } } },
                          { span_term: { FIELD: { value: 'VALUE' } } },
                        ],
                        slop: 5,
                        in_order: false,
                      },
                    },
                  },
                  __scope_link: '.span_within',
                },
                field_masking_span: {
                  __template: { query: { SPAN_QUERY: {} } },
                  query: {
                    span_first: {
                      __template: { match: { span_term: { FIELD: 'VALUE' } }, end: 3 },
                      __scope_link: '.span_first',
                    },
                    span_near: {
                      __template: {
                        clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }],
                        slop: 12,
                        in_order: false,
                      },
                      __scope_link: '.span_near',
                    },
                    span_or: {
                      __template: { clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }] },
                      __scope_link: '.span_or',
                    },
                    span_not: {
                      __template: {
                        include: { span_term: { FIELD: { value: 'VALUE' } } },
                        exclude: { span_term: { FIELD: { value: 'VALUE' } } },
                      },
                      __scope_link: '.span_not',
                    },
                    span_term: {
                      __template: { FIELD: { value: 'VALUE' } },
                      __scope_link: '.span_term',
                    },
                    span_containing: {
                      __template: {
                        little: { span_term: { FIELD: { value: 'VALUE' } } },
                        big: {
                          span_near: {
                            clauses: [
                              { span_term: { FIELD: { value: 'VALUE' } } },
                              { span_term: { FIELD: { value: 'VALUE' } } },
                            ],
                            slop: 5,
                            in_order: false,
                          },
                        },
                      },
                      __scope_link: '.span_containing',
                    },
                    span_within: {
                      __template: {
                        little: { span_term: { FIELD: { value: 'VALUE' } } },
                        big: {
                          span_near: {
                            clauses: [
                              { span_term: { FIELD: { value: 'VALUE' } } },
                              { span_term: { FIELD: { value: 'VALUE' } } },
                            ],
                            slop: 5,
                            in_order: false,
                          },
                        },
                      },
                      __scope_link: '.span_within',
                    },
                  },
                  field: '',
                },
              },
              exclude: {
                span_first: {
                  __template: { match: { span_term: { FIELD: 'VALUE' } }, end: 3 },
                  __scope_link: '.span_first',
                },
                span_near: {
                  __template: {
                    clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }],
                    slop: 12,
                    in_order: false,
                  },
                  __scope_link: '.span_near',
                },
                span_or: {
                  __template: { clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }] },
                  __scope_link: '.span_or',
                },
                span_not: {
                  __template: {
                    include: { span_term: { FIELD: { value: 'VALUE' } } },
                    exclude: { span_term: { FIELD: { value: 'VALUE' } } },
                  },
                  __scope_link: '.span_not',
                },
                span_term: {
                  __template: { FIELD: { value: 'VALUE' } },
                  __scope_link: '.span_term',
                },
                span_containing: {
                  __template: {
                    little: { span_term: { FIELD: { value: 'VALUE' } } },
                    big: {
                      span_near: {
                        clauses: [
                          { span_term: { FIELD: { value: 'VALUE' } } },
                          { span_term: { FIELD: { value: 'VALUE' } } },
                        ],
                        slop: 5,
                        in_order: false,
                      },
                    },
                  },
                  __scope_link: '.span_containing',
                },
                span_within: {
                  __template: {
                    little: { span_term: { FIELD: { value: 'VALUE' } } },
                    big: {
                      span_near: {
                        clauses: [
                          { span_term: { FIELD: { value: 'VALUE' } } },
                          { span_term: { FIELD: { value: 'VALUE' } } },
                        ],
                        slop: 5,
                        in_order: false,
                      },
                    },
                  },
                  __scope_link: '.span_within',
                },
                field_masking_span: {
                  __template: { query: { SPAN_QUERY: {} } },
                  query: {
                    span_first: {
                      __template: { match: { span_term: { FIELD: 'VALUE' } }, end: 3 },
                      __scope_link: '.span_first',
                    },
                    span_near: {
                      __template: {
                        clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }],
                        slop: 12,
                        in_order: false,
                      },
                      __scope_link: '.span_near',
                    },
                    span_or: {
                      __template: { clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }] },
                      __scope_link: '.span_or',
                    },
                    span_not: {
                      __template: {
                        include: { span_term: { FIELD: { value: 'VALUE' } } },
                        exclude: { span_term: { FIELD: { value: 'VALUE' } } },
                      },
                      __scope_link: '.span_not',
                    },
                    span_term: {
                      __template: { FIELD: { value: 'VALUE' } },
                      __scope_link: '.span_term',
                    },
                    span_containing: {
                      __template: {
                        little: { span_term: { FIELD: { value: 'VALUE' } } },
                        big: {
                          span_near: {
                            clauses: [
                              { span_term: { FIELD: { value: 'VALUE' } } },
                              { span_term: { FIELD: { value: 'VALUE' } } },
                            ],
                            slop: 5,
                            in_order: false,
                          },
                        },
                      },
                      __scope_link: '.span_containing',
                    },
                    span_within: {
                      __template: {
                        little: { span_term: { FIELD: { value: 'VALUE' } } },
                        big: {
                          span_near: {
                            clauses: [
                              { span_term: { FIELD: { value: 'VALUE' } } },
                              { span_term: { FIELD: { value: 'VALUE' } } },
                            ],
                            slop: 5,
                            in_order: false,
                          },
                        },
                      },
                      __scope_link: '.span_within',
                    },
                  },
                  field: '',
                },
              },
            },
            span_or: {
              __template: { clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }] },
              clauses: [
                {
                  span_first: {
                    __template: { match: { span_term: { FIELD: 'VALUE' } }, end: 3 },
                    __scope_link: '.span_first',
                  },
                  span_near: {
                    __template: {
                      clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }],
                      slop: 12,
                      in_order: false,
                    },
                    __scope_link: '.span_near',
                  },
                  span_or: {
                    __template: { clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }] },
                    __scope_link: '.span_or',
                  },
                  span_not: {
                    __template: {
                      include: { span_term: { FIELD: { value: 'VALUE' } } },
                      exclude: { span_term: { FIELD: { value: 'VALUE' } } },
                    },
                    __scope_link: '.span_not',
                  },
                  span_term: {
                    __template: { FIELD: { value: 'VALUE' } },
                    __scope_link: '.span_term',
                  },
                  span_containing: {
                    __template: {
                      little: { span_term: { FIELD: { value: 'VALUE' } } },
                      big: {
                        span_near: {
                          clauses: [
                            { span_term: { FIELD: { value: 'VALUE' } } },
                            { span_term: { FIELD: { value: 'VALUE' } } },
                          ],
                          slop: 5,
                          in_order: false,
                        },
                      },
                    },
                    __scope_link: '.span_containing',
                  },
                  span_within: {
                    __template: {
                      little: { span_term: { FIELD: { value: 'VALUE' } } },
                      big: {
                        span_near: {
                          clauses: [
                            { span_term: { FIELD: { value: 'VALUE' } } },
                            { span_term: { FIELD: { value: 'VALUE' } } },
                          ],
                          slop: 5,
                          in_order: false,
                        },
                      },
                    },
                    __scope_link: '.span_within',
                  },
                  field_masking_span: {
                    __template: { query: { SPAN_QUERY: {} } },
                    query: {
                      span_first: {
                        __template: { match: { span_term: { FIELD: 'VALUE' } }, end: 3 },
                        __scope_link: '.span_first',
                      },
                      span_near: {
                        __template: {
                          clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }],
                          slop: 12,
                          in_order: false,
                        },
                        __scope_link: '.span_near',
                      },
                      span_or: {
                        __template: { clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }] },
                        __scope_link: '.span_or',
                      },
                      span_not: {
                        __template: {
                          include: { span_term: { FIELD: { value: 'VALUE' } } },
                          exclude: { span_term: { FIELD: { value: 'VALUE' } } },
                        },
                        __scope_link: '.span_not',
                      },
                      span_term: {
                        __template: { FIELD: { value: 'VALUE' } },
                        __scope_link: '.span_term',
                      },
                      span_containing: {
                        __template: {
                          little: { span_term: { FIELD: { value: 'VALUE' } } },
                          big: {
                            span_near: {
                              clauses: [
                                { span_term: { FIELD: { value: 'VALUE' } } },
                                { span_term: { FIELD: { value: 'VALUE' } } },
                              ],
                              slop: 5,
                              in_order: false,
                            },
                          },
                        },
                        __scope_link: '.span_containing',
                      },
                      span_within: {
                        __template: {
                          little: { span_term: { FIELD: { value: 'VALUE' } } },
                          big: {
                            span_near: {
                              clauses: [
                                { span_term: { FIELD: { value: 'VALUE' } } },
                                { span_term: { FIELD: { value: 'VALUE' } } },
                              ],
                              slop: 5,
                              in_order: false,
                            },
                          },
                        },
                        __scope_link: '.span_within',
                      },
                    },
                    field: '',
                  },
                },
              ],
            },
            span_containing: {
              __template: {
                little: { span_term: { FIELD: { value: 'VALUE' } } },
                big: {
                  span_near: {
                    clauses: [
                      { span_term: { FIELD: { value: 'VALUE' } } },
                      { span_term: { FIELD: { value: 'VALUE' } } },
                    ],
                    slop: 5,
                    in_order: false,
                  },
                },
              },
              little: {
                span_first: {
                  __template: { match: { span_term: { FIELD: 'VALUE' } }, end: 3 },
                  __scope_link: '.span_first',
                },
                span_near: {
                  __template: {
                    clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }],
                    slop: 12,
                    in_order: false,
                  },
                  __scope_link: '.span_near',
                },
                span_or: {
                  __template: { clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }] },
                  __scope_link: '.span_or',
                },
                span_not: {
                  __template: {
                    include: { span_term: { FIELD: { value: 'VALUE' } } },
                    exclude: { span_term: { FIELD: { value: 'VALUE' } } },
                  },
                  __scope_link: '.span_not',
                },
                span_term: {
                  __template: { FIELD: { value: 'VALUE' } },
                  __scope_link: '.span_term',
                },
                span_containing: {
                  __template: {
                    little: { span_term: { FIELD: { value: 'VALUE' } } },
                    big: {
                      span_near: {
                        clauses: [
                          { span_term: { FIELD: { value: 'VALUE' } } },
                          { span_term: { FIELD: { value: 'VALUE' } } },
                        ],
                        slop: 5,
                        in_order: false,
                      },
                    },
                  },
                  __scope_link: '.span_containing',
                },
                span_within: {
                  __template: {
                    little: { span_term: { FIELD: { value: 'VALUE' } } },
                    big: {
                      span_near: {
                        clauses: [
                          { span_term: { FIELD: { value: 'VALUE' } } },
                          { span_term: { FIELD: { value: 'VALUE' } } },
                        ],
                        slop: 5,
                        in_order: false,
                      },
                    },
                  },
                  __scope_link: '.span_within',
                },
                field_masking_span: {
                  __template: { query: { SPAN_QUERY: {} } },
                  query: {
                    span_first: {
                      __template: { match: { span_term: { FIELD: 'VALUE' } }, end: 3 },
                      __scope_link: '.span_first',
                    },
                    span_near: {
                      __template: {
                        clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }],
                        slop: 12,
                        in_order: false,
                      },
                      __scope_link: '.span_near',
                    },
                    span_or: {
                      __template: { clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }] },
                      __scope_link: '.span_or',
                    },
                    span_not: {
                      __template: {
                        include: { span_term: { FIELD: { value: 'VALUE' } } },
                        exclude: { span_term: { FIELD: { value: 'VALUE' } } },
                      },
                      __scope_link: '.span_not',
                    },
                    span_term: {
                      __template: { FIELD: { value: 'VALUE' } },
                      __scope_link: '.span_term',
                    },
                    span_containing: {
                      __template: {
                        little: { span_term: { FIELD: { value: 'VALUE' } } },
                        big: {
                          span_near: {
                            clauses: [
                              { span_term: { FIELD: { value: 'VALUE' } } },
                              { span_term: { FIELD: { value: 'VALUE' } } },
                            ],
                            slop: 5,
                            in_order: false,
                          },
                        },
                      },
                      __scope_link: '.span_containing',
                    },
                    span_within: {
                      __template: {
                        little: { span_term: { FIELD: { value: 'VALUE' } } },
                        big: {
                          span_near: {
                            clauses: [
                              { span_term: { FIELD: { value: 'VALUE' } } },
                              { span_term: { FIELD: { value: 'VALUE' } } },
                            ],
                            slop: 5,
                            in_order: false,
                          },
                        },
                      },
                      __scope_link: '.span_within',
                    },
                  },
                  field: '',
                },
              },
              big: {
                span_first: {
                  __template: { match: { span_term: { FIELD: 'VALUE' } }, end: 3 },
                  __scope_link: '.span_first',
                },
                span_near: {
                  __template: {
                    clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }],
                    slop: 12,
                    in_order: false,
                  },
                  __scope_link: '.span_near',
                },
                span_or: {
                  __template: { clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }] },
                  __scope_link: '.span_or',
                },
                span_not: {
                  __template: {
                    include: { span_term: { FIELD: { value: 'VALUE' } } },
                    exclude: { span_term: { FIELD: { value: 'VALUE' } } },
                  },
                  __scope_link: '.span_not',
                },
                span_term: {
                  __template: { FIELD: { value: 'VALUE' } },
                  __scope_link: '.span_term',
                },
                span_containing: {
                  __template: {
                    little: { span_term: { FIELD: { value: 'VALUE' } } },
                    big: {
                      span_near: {
                        clauses: [
                          { span_term: { FIELD: { value: 'VALUE' } } },
                          { span_term: { FIELD: { value: 'VALUE' } } },
                        ],
                        slop: 5,
                        in_order: false,
                      },
                    },
                  },
                  __scope_link: '.span_containing',
                },
                span_within: {
                  __template: {
                    little: { span_term: { FIELD: { value: 'VALUE' } } },
                    big: {
                      span_near: {
                        clauses: [
                          { span_term: { FIELD: { value: 'VALUE' } } },
                          { span_term: { FIELD: { value: 'VALUE' } } },
                        ],
                        slop: 5,
                        in_order: false,
                      },
                    },
                  },
                  __scope_link: '.span_within',
                },
                field_masking_span: {
                  __template: { query: { SPAN_QUERY: {} } },
                  query: {
                    span_first: {
                      __template: { match: { span_term: { FIELD: 'VALUE' } }, end: 3 },
                      __scope_link: '.span_first',
                    },
                    span_near: {
                      __template: {
                        clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }],
                        slop: 12,
                        in_order: false,
                      },
                      __scope_link: '.span_near',
                    },
                    span_or: {
                      __template: { clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }] },
                      __scope_link: '.span_or',
                    },
                    span_not: {
                      __template: {
                        include: { span_term: { FIELD: { value: 'VALUE' } } },
                        exclude: { span_term: { FIELD: { value: 'VALUE' } } },
                      },
                      __scope_link: '.span_not',
                    },
                    span_term: {
                      __template: { FIELD: { value: 'VALUE' } },
                      __scope_link: '.span_term',
                    },
                    span_containing: {
                      __template: {
                        little: { span_term: { FIELD: { value: 'VALUE' } } },
                        big: {
                          span_near: {
                            clauses: [
                              { span_term: { FIELD: { value: 'VALUE' } } },
                              { span_term: { FIELD: { value: 'VALUE' } } },
                            ],
                            slop: 5,
                            in_order: false,
                          },
                        },
                      },
                      __scope_link: '.span_containing',
                    },
                    span_within: {
                      __template: {
                        little: { span_term: { FIELD: { value: 'VALUE' } } },
                        big: {
                          span_near: {
                            clauses: [
                              { span_term: { FIELD: { value: 'VALUE' } } },
                              { span_term: { FIELD: { value: 'VALUE' } } },
                            ],
                            slop: 5,
                            in_order: false,
                          },
                        },
                      },
                      __scope_link: '.span_within',
                    },
                  },
                  field: '',
                },
              },
            },
            span_within: {
              __template: {
                little: { span_term: { FIELD: { value: 'VALUE' } } },
                big: {
                  span_near: {
                    clauses: [
                      { span_term: { FIELD: { value: 'VALUE' } } },
                      { span_term: { FIELD: { value: 'VALUE' } } },
                    ],
                    slop: 5,
                    in_order: false,
                  },
                },
              },
              little: {
                span_first: {
                  __template: { match: { span_term: { FIELD: 'VALUE' } }, end: 3 },
                  __scope_link: '.span_first',
                },
                span_near: {
                  __template: {
                    clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }],
                    slop: 12,
                    in_order: false,
                  },
                  __scope_link: '.span_near',
                },
                span_or: {
                  __template: { clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }] },
                  __scope_link: '.span_or',
                },
                span_not: {
                  __template: {
                    include: { span_term: { FIELD: { value: 'VALUE' } } },
                    exclude: { span_term: { FIELD: { value: 'VALUE' } } },
                  },
                  __scope_link: '.span_not',
                },
                span_term: {
                  __template: { FIELD: { value: 'VALUE' } },
                  __scope_link: '.span_term',
                },
                span_containing: {
                  __template: {
                    little: { span_term: { FIELD: { value: 'VALUE' } } },
                    big: {
                      span_near: {
                        clauses: [
                          { span_term: { FIELD: { value: 'VALUE' } } },
                          { span_term: { FIELD: { value: 'VALUE' } } },
                        ],
                        slop: 5,
                        in_order: false,
                      },
                    },
                  },
                  __scope_link: '.span_containing',
                },
                span_within: {
                  __template: {
                    little: { span_term: { FIELD: { value: 'VALUE' } } },
                    big: {
                      span_near: {
                        clauses: [
                          { span_term: { FIELD: { value: 'VALUE' } } },
                          { span_term: { FIELD: { value: 'VALUE' } } },
                        ],
                        slop: 5,
                        in_order: false,
                      },
                    },
                  },
                  __scope_link: '.span_within',
                },
                field_masking_span: {
                  __template: { query: { SPAN_QUERY: {} } },
                  query: {
                    span_first: {
                      __template: { match: { span_term: { FIELD: 'VALUE' } }, end: 3 },
                      __scope_link: '.span_first',
                    },
                    span_near: {
                      __template: {
                        clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }],
                        slop: 12,
                        in_order: false,
                      },
                      __scope_link: '.span_near',
                    },
                    span_or: {
                      __template: { clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }] },
                      __scope_link: '.span_or',
                    },
                    span_not: {
                      __template: {
                        include: { span_term: { FIELD: { value: 'VALUE' } } },
                        exclude: { span_term: { FIELD: { value: 'VALUE' } } },
                      },
                      __scope_link: '.span_not',
                    },
                    span_term: {
                      __template: { FIELD: { value: 'VALUE' } },
                      __scope_link: '.span_term',
                    },
                    span_containing: {
                      __template: {
                        little: { span_term: { FIELD: { value: 'VALUE' } } },
                        big: {
                          span_near: {
                            clauses: [
                              { span_term: { FIELD: { value: 'VALUE' } } },
                              { span_term: { FIELD: { value: 'VALUE' } } },
                            ],
                            slop: 5,
                            in_order: false,
                          },
                        },
                      },
                      __scope_link: '.span_containing',
                    },
                    span_within: {
                      __template: {
                        little: { span_term: { FIELD: { value: 'VALUE' } } },
                        big: {
                          span_near: {
                            clauses: [
                              { span_term: { FIELD: { value: 'VALUE' } } },
                              { span_term: { FIELD: { value: 'VALUE' } } },
                            ],
                            slop: 5,
                            in_order: false,
                          },
                        },
                      },
                      __scope_link: '.span_within',
                    },
                  },
                  field: '',
                },
              },
              big: {
                span_first: {
                  __template: { match: { span_term: { FIELD: 'VALUE' } }, end: 3 },
                  __scope_link: '.span_first',
                },
                span_near: {
                  __template: {
                    clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }],
                    slop: 12,
                    in_order: false,
                  },
                  __scope_link: '.span_near',
                },
                span_or: {
                  __template: { clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }] },
                  __scope_link: '.span_or',
                },
                span_not: {
                  __template: {
                    include: { span_term: { FIELD: { value: 'VALUE' } } },
                    exclude: { span_term: { FIELD: { value: 'VALUE' } } },
                  },
                  __scope_link: '.span_not',
                },
                span_term: {
                  __template: { FIELD: { value: 'VALUE' } },
                  __scope_link: '.span_term',
                },
                span_containing: {
                  __template: {
                    little: { span_term: { FIELD: { value: 'VALUE' } } },
                    big: {
                      span_near: {
                        clauses: [
                          { span_term: { FIELD: { value: 'VALUE' } } },
                          { span_term: { FIELD: { value: 'VALUE' } } },
                        ],
                        slop: 5,
                        in_order: false,
                      },
                    },
                  },
                  __scope_link: '.span_containing',
                },
                span_within: {
                  __template: {
                    little: { span_term: { FIELD: { value: 'VALUE' } } },
                    big: {
                      span_near: {
                        clauses: [
                          { span_term: { FIELD: { value: 'VALUE' } } },
                          { span_term: { FIELD: { value: 'VALUE' } } },
                        ],
                        slop: 5,
                        in_order: false,
                      },
                    },
                  },
                  __scope_link: '.span_within',
                },
                field_masking_span: {
                  __template: { query: { SPAN_QUERY: {} } },
                  query: {
                    span_first: {
                      __template: { match: { span_term: { FIELD: 'VALUE' } }, end: 3 },
                      __scope_link: '.span_first',
                    },
                    span_near: {
                      __template: {
                        clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }],
                        slop: 12,
                        in_order: false,
                      },
                      __scope_link: '.span_near',
                    },
                    span_or: {
                      __template: { clauses: [{ span_term: { FIELD: { value: 'VALUE' } } }] },
                      __scope_link: '.span_or',
                    },
                    span_not: {
                      __template: {
                        include: { span_term: { FIELD: { value: 'VALUE' } } },
                        exclude: { span_term: { FIELD: { value: 'VALUE' } } },
                      },
                      __scope_link: '.span_not',
                    },
                    span_term: {
                      __template: { FIELD: { value: 'VALUE' } },
                      __scope_link: '.span_term',
                    },
                    span_containing: {
                      __template: {
                        little: { span_term: { FIELD: { value: 'VALUE' } } },
                        big: {
                          span_near: {
                            clauses: [
                              { span_term: { FIELD: { value: 'VALUE' } } },
                              { span_term: { FIELD: { value: 'VALUE' } } },
                            ],
                            slop: 5,
                            in_order: false,
                          },
                        },
                      },
                      __scope_link: '.span_containing',
                    },
                    span_within: {
                      __template: {
                        little: { span_term: { FIELD: { value: 'VALUE' } } },
                        big: {
                          span_near: {
                            clauses: [
                              { span_term: { FIELD: { value: 'VALUE' } } },
                              { span_term: { FIELD: { value: 'VALUE' } } },
                            ],
                            slop: 5,
                            in_order: false,
                          },
                        },
                      },
                      __scope_link: '.span_within',
                    },
                  },
                  field: '',
                },
              },
            },
            term: { __template: { FIELD: { value: 'VALUE' } }, '{field}': { value: '', boost: 2 } },
            terms: { __template: { FIELD: ['VALUE1', 'VALUE2'] }, '{field}': [''] },
            wildcard: {
              __template: { FIELD: { value: 'VALUE' } },
              '{field}': { value: '', boost: 2 },
            },
            nested: {
              __template: { path: 'path_to_nested_doc', query: {} },
              inner_hits: {
                docvalue_fields: ['FIELD'],
                from: {},
                size: {},
                sort: {},
                name: {},
                highlight: {},
                _source: { __one_of: ['true', 'false'] },
                explain: { __one_of: ['true', 'false'] },
                script_fields: { __template: { FIELD: { script: {} } }, '{field}': { script: {} } },
                version: { __one_of: ['true', 'false'] },
              },
              path: '',
              query: {},
              score_mode: { __one_of: ['avg', 'total', 'max', 'none'] },
            },
            percolate: {
              __template: { field: '', document: {} },
              field: '',
              document: {},
              name: '',
              documents: [{}],
              document_type: '',
              index: '',
              type: '',
              id: '',
              routing: '',
              preference: '',
            },
            common: {
              __template: { FIELD: { query: {} } },
              '{field}': {
                query: {},
                cutoff_frequency: 0.001,
                minimum_should_match: { low_freq: {}, high_freq: {} },
              },
            },
            custom_filters_score: {
              __template: { query: {}, filters: [{ filter: {} }] },
              query: {},
              filters: [{ filter: {}, boost: 2, script: {} }],
              score_mode: { __one_of: ['first', 'min', 'max', 'total', 'avg', 'multiply'] },
              max_boost: 2,
              params: {},
              lang: '',
            },
            indices: {
              __template: { indices: ['INDEX1', 'INDEX2'], query: {} },
              indices: ['{index}'],
              query: {},
              no_match_query: { __scope_link: '.' },
            },
            geo_shape: {
              __template: { location: {}, relation: 'within' },
              __scope_link: '.filter.geo_shape',
            },
            function_score: {
              __template: { query: {}, functions: [{}] },
              query: {},
              functions: [
                {
                  filter: {},
                  weight: 1,
                  script_score: { __template: { script: "_score * doc['f'].value" }, script: {} },
                  boost_factor: 2,
                  random_score: { seed: 314159265359 },
                  linear: {
                    __template: { FIELD: { origin: '', scale: '' } },
                    '{field}': { origin: '', scale: '', offset: '', decay: 0.5 },
                  },
                  exp: {
                    __template: { FIELD: { origin: '', scale: '' } },
                    '{field}': { origin: '', scale: '', offset: '', decay: 0.5 },
                  },
                  gauss: {
                    __template: { FIELD: { origin: '', scale: '' } },
                    '{field}': { origin: '', scale: '', offset: '', decay: 0.5 },
                  },
                  field_value_factor: {
                    __template: { field: '' },
                    field: '{field}',
                    factor: 1.2,
                    modifier: {
                      __one_of: [
                        'none',
                        'log',
                        'log1p',
                        'log2p',
                        'ln',
                        'ln1p',
                        'ln2p',
                        'square',
                        'sqrt',
                        'reciprocal',
                      ],
                    },
                  },
                },
              ],
              boost: 1,
              boost_mode: { __one_of: ['multiply', 'replace', 'sum', 'avg', 'max', 'min'] },
              score_mode: { __one_of: ['multiply', 'sum', 'first', 'avg', 'max', 'min'] },
              max_boost: 10,
              min_score: 1,
              script_score: { __template: { script: "_score * doc['f'].value" }, script: {} },
              boost_factor: 2,
              random_score: { seed: 314159265359 },
              linear: {
                __template: { FIELD: { origin: '', scale: '' } },
                '{field}': { origin: '', scale: '', offset: '', decay: 0.5 },
              },
              exp: {
                __template: { FIELD: { origin: '', scale: '' } },
                '{field}': { origin: '', scale: '', offset: '', decay: 0.5 },
              },
              gauss: {
                __template: { FIELD: { origin: '', scale: '' } },
                '{field}': { origin: '', scale: '', offset: '', decay: 0.5 },
              },
              field_value_factor: {
                __template: { field: '' },
                field: '{field}',
                factor: 1.2,
                modifier: {
                  __one_of: [
                    'none',
                    'log',
                    'log1p',
                    'log2p',
                    'ln',
                    'ln1p',
                    'ln2p',
                    'square',
                    'sqrt',
                    'reciprocal',
                  ],
                },
              },
            },
            script: { __template: { script: "_score * doc['f'].value" }, script: {} },
            wrapper: { __template: { query: 'QUERY_BASE64_ENCODED' }, query: '' },
          },
        },
        endpoints: {
          documentation: { methods: [], id: 'documentation', patterns: ['documentation'] },
          bulk: {
            url_params: {
              wait_for_active_shards: '',
              refresh: ['true', 'false', 'wait_for'],
              routing: '',
              timeout: '',
              type: '',
              _source: [],
              _source_excludes: [],
              _source_includes: [],
              pipeline: '',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['POST', 'PUT'],
            patterns: ['_bulk', '{indices}/_bulk', '{indices}/{type}/_bulk'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/docs-bulk.html',
            id: 'bulk',
          },
          'cat.aliases': {
            url_params: {
              format: '',
              local: '__flag__',
              h: [],
              help: '__flag__',
              s: [],
              v: '__flag__',
            },
            methods: ['GET'],
            patterns: ['_cat/aliases', '_cat/aliases/{name}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cat-alias.html',
            id: 'cat.aliases',
          },
          'cat.allocation': {
            url_params: {
              format: '',
              bytes: ['b', 'k', 'kb', 'm', 'mb', 'g', 'gb', 't', 'tb', 'p', 'pb'],
              local: '__flag__',
              master_timeout: '',
              h: [],
              help: '__flag__',
              s: [],
              v: '__flag__',
            },
            methods: ['GET'],
            patterns: ['_cat/allocation', '_cat/allocation/{nodes}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cat-allocation.html',
            id: 'cat.allocation',
          },
          'cat.count': {
            url_params: {
              format: '',
              h: [],
              help: '__flag__',
              s: [],
              v: '__flag__',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['GET'],
            patterns: ['_cat/count', '_cat/count/{indices}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cat-count.html',
            id: 'cat.count',
          },
          'cat.fielddata': {
            url_params: {
              format: '',
              bytes: ['b', 'k', 'kb', 'm', 'mb', 'g', 'gb', 't', 'tb', 'p', 'pb'],
              h: [],
              help: '__flag__',
              s: [],
              v: '__flag__',
              fields: [],
            },
            methods: ['GET'],
            patterns: ['_cat/fielddata', '_cat/fielddata/{fields}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cat-fielddata.html',
            id: 'cat.fielddata',
          },
          'cat.health': {
            url_params: {
              format: '',
              h: [],
              help: '__flag__',
              s: [],
              time: ['d', 'h', 'm', 's', 'ms', 'micros', 'nanos'],
              ts: '__flag__',
              v: '__flag__',
            },
            methods: ['GET'],
            patterns: ['_cat/health'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cat-health.html',
            id: 'cat.health',
          },
          'cat.help': {
            url_params: { help: '__flag__', s: [] },
            methods: ['GET'],
            patterns: ['_cat'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cat.html',
            id: 'cat.help',
          },
          'cat.indices': {
            url_params: {
              format: '',
              bytes: ['b', 'k', 'kb', 'm', 'mb', 'g', 'gb', 't', 'tb', 'p', 'pb'],
              local: '__flag__',
              master_timeout: '',
              h: [],
              health: ['green', 'yellow', 'red'],
              help: '__flag__',
              pri: '__flag__',
              s: [],
              time: ['d', 'h', 'm', 's', 'ms', 'micros', 'nanos'],
              v: '__flag__',
              include_unloaded_segments: '__flag__',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['GET'],
            patterns: ['_cat/indices', '_cat/indices/{indices}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cat-indices.html',
            id: 'cat.indices',
          },
          'cat.master': {
            url_params: {
              format: '',
              local: '__flag__',
              master_timeout: '',
              h: [],
              help: '__flag__',
              s: [],
              v: '__flag__',
            },
            methods: ['GET'],
            patterns: ['_cat/master'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cat-master.html',
            id: 'cat.master',
          },
          'cat.nodeattrs': {
            url_params: {
              format: '',
              local: '__flag__',
              master_timeout: '',
              h: [],
              help: '__flag__',
              s: [],
              v: '__flag__',
            },
            methods: ['GET'],
            patterns: ['_cat/nodeattrs'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cat-nodeattrs.html',
            id: 'cat.nodeattrs',
          },
          'cat.nodes': {
            url_params: {
              bytes: ['b', 'k', 'kb', 'm', 'mb', 'g', 'gb', 't', 'tb', 'p', 'pb'],
              format: '',
              full_id: '__flag__',
              local: '__flag__',
              master_timeout: '',
              h: [],
              help: '__flag__',
              s: [],
              time: ['d', 'h', 'm', 's', 'ms', 'micros', 'nanos'],
              v: '__flag__',
            },
            methods: ['GET'],
            patterns: ['_cat/nodes'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cat-nodes.html',
            id: 'cat.nodes',
          },
          'cat.pending_tasks': {
            url_params: {
              format: '',
              local: '__flag__',
              master_timeout: '',
              h: [],
              help: '__flag__',
              s: [],
              time: ['d', 'h', 'm', 's', 'ms', 'micros', 'nanos'],
              v: '__flag__',
            },
            methods: ['GET'],
            patterns: ['_cat/pending_tasks'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cat-pending-tasks.html',
            id: 'cat.pending_tasks',
          },
          'cat.plugins': {
            url_params: {
              format: '',
              local: '__flag__',
              master_timeout: '',
              h: [],
              help: '__flag__',
              s: [],
              v: '__flag__',
            },
            methods: ['GET'],
            patterns: ['_cat/plugins'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cat-plugins.html',
            id: 'cat.plugins',
          },
          'cat.recovery': {
            url_params: {
              format: '',
              active_only: '__flag__',
              bytes: ['b', 'k', 'kb', 'm', 'mb', 'g', 'gb', 't', 'tb', 'p', 'pb'],
              detailed: '__flag__',
              h: [],
              help: '__flag__',
              index: [],
              s: [],
              time: ['d', 'h', 'm', 's', 'ms', 'micros', 'nanos'],
              v: '__flag__',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['GET'],
            patterns: ['_cat/recovery', '_cat/recovery/{indices}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cat-recovery.html',
            id: 'cat.recovery',
          },
          'cat.repositories': {
            url_params: {
              format: '',
              local: '__flag__',
              master_timeout: '',
              h: [],
              help: '__flag__',
              s: [],
              v: '__flag__',
            },
            methods: ['GET'],
            patterns: ['_cat/repositories'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cat-repositories.html',
            id: 'cat.repositories',
          },
          'cat.segments': {
            url_params: {
              format: '',
              bytes: ['b', 'k', 'kb', 'm', 'mb', 'g', 'gb', 't', 'tb', 'p', 'pb'],
              h: [],
              help: '__flag__',
              s: [],
              v: '__flag__',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['GET'],
            patterns: ['_cat/segments', '_cat/segments/{indices}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cat-segments.html',
            id: 'cat.segments',
          },
          'cat.shards': {
            url_params: {
              format: '',
              bytes: ['b', 'k', 'kb', 'm', 'mb', 'g', 'gb', 't', 'tb', 'p', 'pb'],
              local: '__flag__',
              master_timeout: '',
              h: [],
              help: '__flag__',
              s: [],
              time: ['d', 'h', 'm', 's', 'ms', 'micros', 'nanos'],
              v: '__flag__',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['GET'],
            patterns: ['_cat/shards', '_cat/shards/{indices}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cat-shards.html',
            id: 'cat.shards',
          },
          'cat.snapshots': {
            url_params: {
              format: '',
              ignore_unavailable: '__flag__',
              master_timeout: '',
              h: [],
              help: '__flag__',
              s: [],
              time: ['d', 'h', 'm', 's', 'ms', 'micros', 'nanos'],
              v: '__flag__',
            },
            methods: ['GET'],
            patterns: ['_cat/snapshots', '_cat/snapshots/{repository}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cat-snapshots.html',
            id: 'cat.snapshots',
          },
          'cat.tasks': {
            url_params: {
              format: '',
              node_id: [],
              actions: [],
              detailed: '__flag__',
              parent_task: '',
              h: [],
              help: '__flag__',
              s: [],
              time: ['d', 'h', 'm', 's', 'ms', 'micros', 'nanos'],
              v: '__flag__',
            },
            methods: ['GET'],
            patterns: ['_cat/tasks'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/tasks.html',
            id: 'cat.tasks',
          },
          'cat.templates': {
            url_params: {
              format: '',
              local: '__flag__',
              master_timeout: '',
              h: [],
              help: '__flag__',
              s: [],
              v: '__flag__',
            },
            methods: ['GET'],
            patterns: ['_cat/templates', '_cat/templates/{name}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cat-templates.html',
            id: 'cat.templates',
          },
          'cat.thread_pool': {
            url_params: {
              format: '',
              size: ['', 'k', 'm', 'g', 't', 'p'],
              local: '__flag__',
              master_timeout: '',
              h: [],
              help: '__flag__',
              s: [],
              v: '__flag__',
            },
            methods: ['GET'],
            patterns: ['_cat/thread_pool', '_cat/thread_pool/{thread_pool_patterns}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cat-thread-pool.html',
            id: 'cat.thread_pool',
          },
          clear_scroll: {
            methods: ['DELETE'],
            patterns: ['_search/scroll'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/search-request-body.html#_clear_scroll_api',
            data_autocomplete_rules: { scroll_id: '' },
            id: 'clear_scroll',
          },
          'cluster.allocation_explain': {
            url_params: { include_yes_decisions: '__flag__', include_disk_info: '__flag__' },
            methods: ['GET', 'POST'],
            patterns: ['_cluster/allocation/explain'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cluster-allocation-explain.html',
            id: 'cluster.allocation_explain',
          },
          'cluster.get_settings': {
            url_params: {
              flat_settings: '__flag__',
              master_timeout: '',
              timeout: '',
              include_defaults: '__flag__',
            },
            methods: ['GET'],
            patterns: ['_cluster/settings'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cluster-update-settings.html',
            id: 'cluster.get_settings',
          },
          'cluster.health': {
            url_params: {
              expand_wildcards: ['open', 'closed', 'none', 'all'],
              level: ['cluster', 'indices', 'shards'],
              local: '__flag__',
              master_timeout: '30s',
              timeout: '30s',
              wait_for_active_shards: 0,
              wait_for_nodes: 0,
              wait_for_events: ['immediate', 'urgent', 'high', 'normal', 'low', 'languid'],
              wait_for_no_relocating_shards: '__flag__',
              wait_for_no_initializing_shards: '__flag__',
              wait_for_status: ['green', 'yellow', 'red'],
              wait_for_relocating_shards: 0,
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
            },
            methods: ['GET'],
            patterns: ['_cluster/health', '_cluster/health/{indices}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cluster-health.html',
            id: 'cluster.health',
          },
          'cluster.pending_tasks': {
            url_params: { local: '__flag__', master_timeout: '' },
            methods: ['GET'],
            patterns: ['_cluster/pending_tasks'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cluster-pending.html',
            id: 'cluster.pending_tasks',
          },
          'cluster.put_settings': {
            url_params: { flat_settings: '__flag__', master_timeout: '', timeout: '' },
            methods: ['PUT'],
            patterns: ['_cluster/settings'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cluster-update-settings.html',
            data_autocomplete_rules: {
              persistent: {
                cluster: {
                  routing: {
                    'allocation.enable': {
                      __one_of: ['all', 'primaries', 'new_primaries', 'none'],
                    },
                    'allocation.disk.threshold_enabled': { __one_of: [false, true] },
                    'allocation.disk.watermark.low': '85%',
                    'allocation.disk.watermark.high': '90%',
                    'allocation.disk.reroute_interval': '60s',
                    'allocation.exclude': { _ip: '', _name: '', _host: '', _id: '' },
                    'allocation.include': { _ip: '', _name: '', _host: '', _id: '' },
                    'allocation.require': { _ip: '', _name: '', _host: '', _id: '' },
                    'allocation.awareness.attributes': [],
                    'allocation.awareness.force': { '*': { values: [] } },
                    'allocation.allow_rebalance': {
                      __one_of: ['always', 'indices_primaries_active', 'indices_all_active'],
                    },
                    'allocation.cluster_concurrent_rebalance': 2,
                    'allocation.node_initial_primaries_recoveries': 4,
                    'allocation.node_concurrent_recoveries': 2,
                    'allocation.same_shard.host': { __one_of: [false, true] },
                  },
                },
                indices: {
                  breaker: {
                    'total.limit': '70%',
                    'fielddata.limit': '60%',
                    'fielddata.overhead': 1.03,
                    'request.limit': '40%',
                    'request.overhead': 1,
                  },
                },
              },
              transient: { __scope_link: '.persistent' },
            },
            id: 'cluster.put_settings',
          },
          'cluster.remote_info': {
            methods: ['GET'],
            patterns: ['_remote/info'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cluster-remote-info.html',
            id: 'cluster.remote_info',
          },
          'cluster.reroute': {
            url_params: {
              dry_run: '__flag__',
              explain: '__flag__',
              retry_failed: '__flag__',
              metric: [],
              master_timeout: '',
              timeout: '',
            },
            methods: ['POST'],
            patterns: ['_cluster/reroute'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cluster-reroute.html',
            data_autocomplete_rules: {
              commands: [
                {
                  move: {
                    __template: { index: '', shard: 0, from_node: '', to_node: '' },
                    index: '{index}',
                    shard: 0,
                    from_node: '{node}',
                    to_node: '{node}',
                  },
                  cancel: {
                    __template: { index: '', shard: 0, node: '' },
                    index: '{index}',
                    shard: 0,
                    node: '{node}',
                    allow_primary: { __one_of: [true, false] },
                  },
                  allocate: {
                    __template: { index: '', shard: 0, node: '' },
                    index: '{index}',
                    shard: 0,
                    node: '{node}',
                    allow_primary: { __one_of: [true, false] },
                  },
                },
              ],
              dry_run: { __one_of: [true, false] },
            },
            id: 'cluster.reroute',
          },
          'cluster.state': {
            url_params: {
              local: '__flag__',
              master_timeout: '',
              flat_settings: '__flag__',
              wait_for_metadata_version: '',
              wait_for_timeout: '',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
            },
            methods: ['GET'],
            patterns: [
              '_cluster/state',
              '_cluster/state/{metrics}',
              '_cluster/state/{metrics}/{indices}',
            ],
            url_components: {
              metrics: [
                '_all',
                'blocks',
                'master_node',
                'metadata',
                'nodes',
                'routing_nodes',
                'routing_table',
                'version',
              ],
              indices: null,
            },
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cluster-state.html',
            id: 'cluster.state',
          },
          'cluster.stats': {
            url_params: { flat_settings: '__flag__', timeout: '' },
            methods: ['GET'],
            patterns: ['_cluster/stats', '_cluster/stats/nodes/{nodes}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cluster-stats.html',
            id: 'cluster.stats',
          },
          count: {
            url_params: {
              ignore_unavailable: '__flag__',
              ignore_throttled: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
              min_score: '',
              preference: 'random',
              routing: [],
              q: '',
              analyzer: '',
              analyze_wildcard: '__flag__',
              default_operator: ['AND', 'OR'],
              df: '',
              lenient: '__flag__',
              terminate_after: '',
            },
            methods: ['POST', 'GET'],
            patterns: ['_count', '{indices}/_count', '{indices}/{type}/_count'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/search-count.html',
            priority: 10,
            data_autocomplete_rules: { query: {} },
            id: 'count',
          },
          create: {
            url_params: {
              wait_for_active_shards: '',
              refresh: ['true', 'false', 'wait_for'],
              routing: '',
              timeout: '',
              version: '',
              version_type: ['internal', 'external', 'external_gte'],
              pipeline: '',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['PUT', 'POST'],
            patterns: ['{indices}/_create/{id}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/docs-index_.html',
            id: 'create',
          },
          delete_by_query_rethrottle: {
            url_params: { requests_per_second: '' },
            methods: ['POST'],
            patterns: ['_delete_by_query/{task_id}/_rethrottle'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-delete-by-query.html',
            id: 'delete_by_query_rethrottle',
          },
          delete_by_query: {
            url_params: {
              analyze_wildcard: '__flag__',
              default_operator: ['AND', 'OR'],
              df: '',
              from: '0',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              conflicts: ['abort', 'proceed'],
              expand_wildcards: ['open', 'closed', 'none', 'all'],
              lenient: '__flag__',
              preference: 'random',
              q: '',
              routing: [],
              scroll: '',
              search_type: ['query_then_fetch', 'dfs_query_then_fetch'],
              search_timeout: '',
              size: '',
              max_docs: 'all documents',
              sort: [],
              _source: [],
              _source_excludes: [],
              _source_includes: [],
              terminate_after: '',
              stats: [],
              version: '__flag__',
              request_cache: '__flag__',
              refresh: '__flag__',
              timeout: '',
              wait_for_active_shards: '',
              scroll_size: '',
              wait_for_completion: '__flag__',
              requests_per_second: '',
              slices: '',
            },
            methods: ['POST'],
            patterns: ['{indices}/_delete_by_query', '{indices}/{type}/_delete_by_query'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/docs-delete-by-query.html',
            id: 'delete_by_query',
          },
          delete_script: {
            url_params: { timeout: '', master_timeout: '' },
            methods: ['DELETE'],
            patterns: ['_scripts/{id}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/modules-scripting.html',
            id: 'delete_script',
          },
          delete: {
            url_params: {
              wait_for_active_shards: '',
              refresh: ['true', 'false', 'wait_for'],
              routing: '',
              timeout: '',
              if_seq_no: '',
              if_primary_term: '',
              version: '',
              version_type: ['internal', 'external', 'external_gte', 'force'],
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['DELETE'],
            patterns: ['{indices}/_doc/{id}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/docs-delete.html',
            id: 'delete',
          },
          exists_source: {
            url_params: {
              preference: 'random',
              realtime: '__flag__',
              refresh: '__flag__',
              routing: '',
              _source: [],
              _source_excludes: [],
              _source_includes: [],
              version: '',
              version_type: ['internal', 'external', 'external_gte', 'force'],
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['HEAD'],
            patterns: ['{indices}/_source/{id}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/docs-get.html',
            id: 'exists_source',
          },
          exists: {
            url_params: {
              stored_fields: [],
              preference: 'random',
              realtime: '__flag__',
              refresh: '__flag__',
              routing: '',
              _source: [],
              _source_excludes: [],
              _source_includes: [],
              version: '',
              version_type: ['internal', 'external', 'external_gte', 'force'],
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['HEAD'],
            patterns: ['{indices}/_doc/{id}', '{indices}/{type}/{id}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/docs-get.html',
            id: 'exists',
          },
          explain: {
            url_params: {
              analyze_wildcard: '__flag__',
              analyzer: '',
              default_operator: ['AND', 'OR'],
              df: '_all',
              stored_fields: [],
              lenient: '__flag__',
              preference: 'random',
              q: '',
              routing: '',
              _source: [],
              _source_excludes: [],
              _source_includes: [],
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['GET', 'POST'],
            patterns: ['{indices}/_explain/{id}', '{indices}/{type}/{id}/_explain'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/search-explain.html',
            id: 'explain',
          },
          field_caps: {
            url_params: {
              fields: [],
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
              include_unmapped: '__flag__',
            },
            methods: ['GET', 'POST'],
            patterns: ['_field_caps', '{indices}/_field_caps'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/search-field-caps.html',
            id: 'field_caps',
          },
          get_script_languages: {
            methods: ['GET'],
            patterns: ['_script_language'],
            id: 'get_script_languages',
          },
          get_script: {
            url_params: { master_timeout: '' },
            methods: ['GET'],
            patterns: ['_scripts/{id}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/modules-scripting.html',
            id: 'get_script',
          },
          get_source: {
            url_params: {
              preference: 'random',
              realtime: '__flag__',
              refresh: '__flag__',
              routing: '',
              _source: [],
              _source_excludes: [],
              _source_includes: [],
              version: '',
              version_type: ['internal', 'external', 'external_gte', 'force'],
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['GET'],
            patterns: ['{indices}/_source/{id}', '{indices}/{type}/{id}/_source'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/docs-get.html',
            id: 'get_source',
          },
          get: {
            url_params: {
              stored_fields: [],
              preference: 'random',
              realtime: '__flag__',
              refresh: '__flag__',
              routing: '',
              _source: [],
              _source_excludes: [],
              _source_includes: [],
              version: '',
              version_type: ['internal', 'external', 'external_gte', 'force'],
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['GET'],
            patterns: ['{indices}/_doc/{id}', '{indices}/{type}/{id}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/docs-get.html',
            id: 'get',
          },
          index: {
            url_params: {
              wait_for_active_shards: '',
              op_type: ['index', 'create'],
              refresh: ['true', 'false', 'wait_for'],
              routing: '',
              timeout: '',
              version: '',
              version_type: ['internal', 'external', 'external_gte'],
              if_seq_no: '',
              if_primary_term: '',
              pipeline: '',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['PUT', 'POST'],
            patterns: [
              '{indices}/_doc/{id}',
              '{indices}/_doc',
              '{indices}/{type}',
              '{indices}/{type}/{id}',
            ],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/docs-index_.html',
            id: 'index',
          },
          'indices.analyze': {
            url_params: {
              index: '',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['GET', 'POST'],
            patterns: ['_analyze', '{indices}/_analyze'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-analyze.html',
            data_autocomplete_rules: {
              text: [],
              field: '{field}',
              analyzer: '',
              tokenizer: '',
              char_filter: [],
              filter: [],
              explain: { __one_of: [false, true] },
              attributes: [],
            },
            id: 'indices.analyze',
          },
          'indices.clear_cache': {
            url_params: {
              fielddata: '__flag__',
              fields: [],
              query: '__flag__',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
              index: [],
              request: '__flag__',
            },
            methods: ['POST'],
            patterns: ['_cache/clear', '{indices}/_cache/clear'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-clearcache.html',
            id: 'indices.clear_cache',
          },
          'indices.clone': {
            url_params: {
              timeout: '',
              master_timeout: '',
              wait_for_active_shards: '',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['PUT', 'POST'],
            patterns: ['{indices}/_clone/{target}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-clone-index.html',
            data_autocomplete_rules: {
              settings: { __scope_link: 'put_settings' },
              aliases: { __template: { NAME: {} } },
            },
            id: 'indices.clone',
          },
          'indices.close': {
            url_params: {
              timeout: '',
              master_timeout: '',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
              wait_for_active_shards: '',
            },
            methods: ['POST'],
            patterns: ['{indices}/_close'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-open-close.html',
            id: 'indices.close',
          },
          'indices.create': {
            url_params: {
              include_type_name: '__flag__',
              wait_for_active_shards: '',
              timeout: '',
              master_timeout: '',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['PUT'],
            patterns: ['{indices}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-create-index.html',
            data_autocomplete_rules: {
              mappings: { __scope_link: 'put_mapping' },
              settings: { __scope_link: 'put_settings' },
              aliases: { __template: { NAME: {} } },
            },
            id: 'indices.create',
          },
          'indices.delete_alias': {
            url_params: {
              timeout: '',
              master_timeout: '',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['DELETE'],
            patterns: ['{indices}/_alias/{name}', '{indices}/_aliases/{name}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-aliases.html',
            id: 'indices.delete_alias',
          },
          'indices.delete_template': {
            url_params: { timeout: '', master_timeout: '' },
            methods: ['DELETE'],
            patterns: ['_template/{template}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-templates.html',
            id: 'indices.delete_template',
          },
          'indices.delete': {
            url_params: {
              timeout: '',
              master_timeout: '',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
            },
            methods: ['DELETE'],
            patterns: ['{indices}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-delete-index.html',
            id: 'indices.delete',
          },
          'indices.exists_alias': {
            url_params: {
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
              local: '__flag__',
            },
            methods: ['HEAD'],
            patterns: ['_alias/{name}', '{indices}/_alias/{name}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-aliases.html',
            id: 'indices.exists_alias',
          },
          'indices.exists_template': {
            url_params: { flat_settings: '__flag__', master_timeout: '', local: '__flag__' },
            methods: ['HEAD'],
            patterns: ['_template/{template}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-templates.html',
            id: 'indices.exists_template',
          },
          'indices.exists_type': {
            url_params: {
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
              local: '__flag__',
            },
            methods: ['HEAD'],
            patterns: ['{indices}/_mapping/{type}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-types-exists.html',
            id: 'indices.exists_type',
          },
          'indices.exists': {
            url_params: {
              local: '__flag__',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
              flat_settings: '__flag__',
              include_defaults: '__flag__',
            },
            methods: ['HEAD'],
            patterns: ['{indices}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-exists.html',
            id: 'indices.exists',
          },
          'indices.flush_synced': {
            url_params: {
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
            },
            methods: ['POST', 'GET'],
            patterns: ['_flush/synced', '{indices}/_flush/synced'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-synced-flush-api.html',
            id: 'indices.flush_synced',
          },
          'indices.flush': {
            url_params: {
              force: '__flag__',
              wait_if_ongoing: '__flag__',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
            },
            methods: ['POST', 'GET'],
            patterns: ['_flush', '{indices}/_flush'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-flush.html',
            id: 'indices.flush',
          },
          'indices.forcemerge': {
            url_params: {
              flush: '__flag__',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
              max_num_segments: 'dynamic',
              only_expunge_deletes: '__flag__',
            },
            methods: ['POST'],
            patterns: ['_forcemerge', '{indices}/_forcemerge'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-forcemerge.html',
            id: 'indices.forcemerge',
          },
          'indices.get_alias': {
            url_params: {
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
              local: '__flag__',
            },
            methods: ['GET'],
            patterns: ['_alias', '_alias/{name}', '{indices}/_alias/{name}', '{indices}/_alias'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-aliases.html',
            id: 'indices.get_alias',
          },
          'indices.get_field_mapping': {
            url_params: {
              include_type_name: '__flag__',
              include_defaults: '__flag__',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
              local: '__flag__',
            },
            methods: ['GET'],
            patterns: [
              '_mapping/field/{fields}',
              '{indices}/_mapping/field/{fields}',
              '_mapping/{type}/field/{fields}',
              '{indices}/_mapping/{type}/field/{fields}',
            ],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-get-field-mapping.html',
            priority: 10,
            id: 'indices.get_field_mapping',
          },
          'indices.get_mapping': {
            url_params: {
              include_type_name: '__flag__',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
              master_timeout: '',
              local: '__flag__',
            },
            methods: ['GET'],
            patterns: [
              '_mapping',
              '{indices}/_mapping',
              '_mapping/{type}',
              '{indices}/_mapping/{type}',
            ],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-get-mapping.html',
            priority: 10,
            id: 'indices.get_mapping',
          },
          'indices.get_settings': {
            url_params: {
              master_timeout: '',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
              flat_settings: '__flag__',
              local: '__flag__',
              include_defaults: '__flag__',
            },
            methods: ['GET'],
            patterns: [
              '_settings',
              '{indices}/_settings',
              '{indices}/_settings/{name}',
              '_settings/{name}',
            ],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-get-settings.html',
            id: 'indices.get_settings',
          },
          'indices.get_template': {
            url_params: {
              include_type_name: '__flag__',
              flat_settings: '__flag__',
              master_timeout: '',
              local: '__flag__',
            },
            methods: ['GET'],
            patterns: ['_template', '_template/{template}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-templates.html',
            id: 'indices.get_template',
          },
          'indices.get_upgrade': {
            url_params: {
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
            },
            methods: ['GET'],
            patterns: ['_upgrade', '{indices}/_upgrade'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-upgrade.html',
            id: 'indices.get_upgrade',
          },
          'indices.get': {
            url_params: {
              include_type_name: '__flag__',
              local: '__flag__',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
              flat_settings: '__flag__',
              include_defaults: '__flag__',
              master_timeout: '',
            },
            methods: ['GET'],
            patterns: ['{indices}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-get-index.html',
            id: 'indices.get',
          },
          'indices.open': {
            url_params: {
              timeout: '',
              master_timeout: '',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
              wait_for_active_shards: '',
            },
            methods: ['POST'],
            patterns: ['{indices}/_open'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-open-close.html',
            id: 'indices.open',
          },
          'indices.put_alias': {
            url_params: {
              timeout: '',
              master_timeout: '',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['PUT', 'POST'],
            patterns: ['{indices}/_alias/{name}', '{indices}/_aliases/{name}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-aliases.html',
            data_autocomplete_rules: {
              filter: {},
              routing: '1',
              search_routing: '1,2',
              index_routing: '1',
            },
            id: 'indices.put_alias',
          },
          'indices.put_mapping': {
            url_params: {
              include_type_name: '__flag__',
              timeout: '',
              master_timeout: '',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
            },
            methods: ['PUT', 'POST'],
            patterns: [
              '{indices}/_mapping',
              '{indices}/{type}/_mapping',
              '{indices}/_mapping/{type}',
              '{indices}/{type}/_mappings',
              '{indices}/_mappings/{type}',
              '_mappings/{type}',
              '{indices}/_mappings',
              '_mapping/{type}',
            ],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-put-mapping.html',
            id: 'indices.put_mapping',
          },
          'indices.put_settings': {
            url_params: {
              master_timeout: '',
              timeout: '',
              preserve_existing: '__flag__',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
              flat_settings: '__flag__',
            },
            methods: ['PUT'],
            patterns: ['_settings', '{indices}/_settings'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-update-settings.html',
            id: 'indices.put_settings',
          },
          put_settings: {
            data_autocomplete_rules: {
              refresh_interval: '1s',
              number_of_shards: 1,
              number_of_replicas: 1,
              'blocks.read_only': { __one_of: [false, true] },
              'blocks.read': { __one_of: [true, false] },
              'blocks.write': { __one_of: [true, false] },
              'blocks.metadata': { __one_of: [true, false] },
              term_index_interval: 32,
              term_index_divisor: 1,
              'translog.flush_threshold_ops': 5000,
              'translog.flush_threshold_size': '200mb',
              'translog.flush_threshold_period': '30m',
              'translog.disable_flush': { __one_of: [true, false] },
              'cache.filter.max_size': '2gb',
              'cache.filter.expire': '2h',
              'gateway.snapshot_interval': '10s',
              routing: {
                allocation: {
                  include: { tag: '' },
                  exclude: { tag: '' },
                  require: { tag: '' },
                  total_shards_per_node: -1,
                },
              },
              'recovery.initial_shards': {
                __one_of: ['quorum', 'quorum-1', 'half', 'full', 'full-1'],
              },
              'ttl.disable_purge': { __one_of: [true, false] },
              analysis: { analyzer: {}, tokenizer: {}, filter: {}, char_filter: {} },
              'cache.query.enable': { __one_of: [true, false] },
              shadow_replicas: { __one_of: [true, false] },
              shared_filesystem: { __one_of: [true, false] },
              data_path: 'path',
              codec: { __one_of: ['default', 'best_compression', 'lucene_default'] },
            },
            id: 'put_settings',
            patterns: ['put_settings'],
            methods: ['GET'],
          },
          'indices.put_template': {
            url_params: {
              include_type_name: '__flag__',
              order: '',
              create: '__flag__',
              timeout: '',
              master_timeout: '',
              flat_settings: '__flag__',
            },
            methods: ['PUT', 'POST'],
            patterns: ['_template/{template}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-templates.html',
            data_autocomplete_rules: {
              index_patterns: [],
              mappings: { __scope_link: 'put_mapping' },
              settings: { __scope_link: 'put_settings' },
              version: 0,
              order: 0,
              aliases: { __template: { NAME: {} } },
            },
            id: 'indices.put_template',
          },
          'indices.recovery': {
            url_params: {
              detailed: '__flag__',
              active_only: '__flag__',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['GET'],
            patterns: ['_recovery', '{indices}/_recovery'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-recovery.html',
            id: 'indices.recovery',
          },
          'indices.refresh': {
            url_params: {
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
            },
            methods: ['POST', 'GET'],
            patterns: ['_refresh', '{indices}/_refresh'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-refresh.html',
            id: 'indices.refresh',
          },
          'indices.rollover': {
            url_params: {
              include_type_name: '__flag__',
              timeout: '',
              dry_run: '__flag__',
              master_timeout: '',
              wait_for_active_shards: '',
            },
            methods: ['POST'],
            patterns: ['{alias}/_rollover', '{alias}/_rollover/{new_index}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-rollover-index.html',
            data_autocomplete_rules: {
              conditions: { max_age: '7d', max_docs: 1000, max_size: '5gb' },
              settings: { __scope_link: 'put_settings' },
              mappings: { __scope_link: 'put_mapping' },
              aliases: { __template: { NAME: {} } },
            },
            id: 'indices.rollover',
          },
          'indices.segments': {
            url_params: {
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
              verbose: '__flag__',
            },
            methods: ['GET'],
            patterns: ['_segments', '{indices}/_segments'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-segments.html',
            id: 'indices.segments',
          },
          'indices.shard_stores': {
            url_params: {
              status: [],
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
            },
            methods: ['GET'],
            patterns: ['_shard_stores', '{indices}/_shard_stores'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-shards-stores.html',
            id: 'indices.shard_stores',
          },
          'indices.shrink': {
            url_params: {
              copy_settings: '__flag__',
              timeout: '',
              master_timeout: '',
              wait_for_active_shards: '',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['PUT', 'POST'],
            patterns: ['{indices}/_shrink/{target}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-shrink-index.html',
            id: 'indices.shrink',
          },
          'indices.split': {
            url_params: {
              copy_settings: '__flag__',
              timeout: '',
              master_timeout: '',
              wait_for_active_shards: '',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['PUT', 'POST'],
            patterns: ['{indices}/_split/{target}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-split-index.html',
            id: 'indices.split',
          },
          'indices.stats': {
            url_params: {
              completion_fields: [],
              fielddata_fields: [],
              fields: [],
              groups: [],
              level: ['cluster', 'indices', 'shards'],
              types: [],
              include_segment_file_sizes: '__flag__',
              include_unloaded_segments: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
              forbid_closed_indices: '__flag__',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
            },
            methods: ['GET'],
            patterns: [
              '_stats',
              '_stats/{metrics}',
              '{indices}/_stats',
              '{indices}/_stats/{metrics}',
            ],
            url_components: {
              metrics: [
                '_all',
                'completion',
                'docs',
                'fielddata',
                'flush',
                'get',
                'indexing',
                'merge',
                'query_cache',
                'refresh',
                'request_cache',
                'search',
                'segments',
                'store',
                'suggest',
                'warmer',
              ],
              indices: null,
            },
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-stats.html',
            id: 'indices.stats',
          },
          'indices.update_aliases': {
            url_params: { timeout: '', master_timeout: '' },
            methods: ['POST'],
            patterns: ['_aliases'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-aliases.html',
            data_autocomplete_rules: {
              actions: {
                __template: [{ add: { index: 'test1', alias: 'alias1' } }],
                __any_of: [
                  {
                    add: {
                      index: '{index}',
                      alias: '',
                      filter: {},
                      routing: '1',
                      search_routing: '1,2',
                      index_routing: '1',
                    },
                    remove: { index: '', alias: '' },
                  },
                ],
              },
            },
            id: 'indices.update_aliases',
          },
          'indices.upgrade': {
            url_params: {
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
              ignore_unavailable: '__flag__',
              wait_for_completion: '__flag__',
              only_ancient_segments: '__flag__',
            },
            methods: ['POST'],
            patterns: ['_upgrade', '{indices}/_upgrade'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-upgrade.html',
            id: 'indices.upgrade',
          },
          'indices.validate_query': {
            url_params: {
              explain: '__flag__',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
              q: '',
              analyzer: '',
              analyze_wildcard: '__flag__',
              default_operator: ['AND', 'OR'],
              df: '',
              lenient: '__flag__',
              rewrite: '__flag__',
              all_shards: '__flag__',
            },
            methods: ['GET', 'POST'],
            patterns: ['_validate/query', '{indices}/_validate/query'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/search-validate.html',
            data_autocomplete_rules: { query: {} },
            id: 'indices.validate_query',
          },
          info: {
            methods: ['GET'],
            patterns: [''],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html',
            id: 'info',
          },
          'ingest.delete_pipeline': {
            url_params: { master_timeout: '', timeout: '' },
            methods: ['DELETE'],
            patterns: ['_ingest/pipeline/{id}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/delete-pipeline-api.html',
            id: 'ingest.delete_pipeline',
          },
          'ingest.get_pipeline': {
            url_params: { master_timeout: '' },
            methods: ['GET'],
            patterns: ['_ingest/pipeline', '_ingest/pipeline/{id}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/get-pipeline-api.html',
            id: 'ingest.get_pipeline',
          },
          'ingest.processor_grok': {
            methods: ['GET'],
            patterns: ['_ingest/processor/grok'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/grok-processor.html#grok-processor-rest-get',
            id: 'ingest.processor_grok',
          },
          'ingest.put_pipeline': {
            url_params: { master_timeout: '', timeout: '' },
            methods: ['PUT'],
            patterns: ['_ingest/pipeline/{id}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/put-pipeline-api.html',
            id: 'ingest.put_pipeline',
            data_autocomplete_rules: {
              description: '',
              processors: [
                {
                  __one_of: [
                    {
                      append: {
                        __template: { field: '', value: [] },
                        field: '',
                        value: [],
                        on_failure: [],
                        ignore_failure: { __one_of: [false, true] },
                        if: '',
                        tag: '',
                      },
                    },
                    {
                      bytes: {
                        __template: { field: '' },
                        field: '',
                        target_field: '',
                        ignore_missing: { __one_of: [false, true] },
                        on_failure: [],
                        ignore_failure: { __one_of: [false, true] },
                        if: '',
                        tag: '',
                      },
                    },
                    {
                      convert: {
                        __template: { field: '', type: '' },
                        field: '',
                        type: { __one_of: ['integer', 'float', 'string', 'boolean', 'auto'] },
                        target_field: '',
                        ignore_missing: { __one_of: [false, true] },
                        on_failure: [],
                        ignore_failure: { __one_of: [false, true] },
                        if: '',
                        tag: '',
                      },
                    },
                    {
                      date: {
                        __template: { field: '', formats: [] },
                        field: '',
                        target_field: '@timestamp',
                        formats: [],
                        timezone: 'UTC',
                        locale: 'ENGLISH',
                        on_failure: [],
                        ignore_failure: { __one_of: [false, true] },
                        if: '',
                        tag: '',
                      },
                    },
                    {
                      date_index_name: {
                        __template: { field: '', date_rounding: '' },
                        field: '',
                        date_rounding: { __one_of: ['y', 'M', 'w', 'd', 'h', 'm', 's'] },
                        date_formats: [],
                        timezone: 'UTC',
                        locale: 'ENGLISH',
                        index_name_format: 'yyyy-MM-dd',
                        on_failure: [],
                        ignore_failure: { __one_of: [false, true] },
                        if: '',
                        tag: '',
                      },
                    },
                    {
                      dissect: {
                        __template: { field: '', pattern: '' },
                        field: '',
                        pattern: '',
                        append_separator: '',
                        ignore_missing: { __one_of: [false, true] },
                        on_failure: [],
                        ignore_failure: { __one_of: [false, true] },
                        if: '',
                        tag: '',
                      },
                    },
                    {
                      dot_expander: {
                        __template: { field: '' },
                        field: '',
                        path: '',
                        on_failure: [],
                        ignore_failure: { __one_of: [false, true] },
                        if: '',
                        tag: '',
                      },
                    },
                    {
                      drop: {
                        __template: {},
                        on_failure: [],
                        ignore_failure: { __one_of: [false, true] },
                        if: '',
                        tag: '',
                      },
                    },
                    {
                      fail: {
                        __template: { message: '' },
                        message: '',
                        on_failure: [],
                        ignore_failure: { __one_of: [false, true] },
                        if: '',
                        tag: '',
                      },
                    },
                    {
                      foreach: {
                        __template: { field: '', processor: {} },
                        field: '',
                        processor: { __scope_link: '_processor' },
                        on_failure: [],
                        ignore_failure: { __one_of: [false, true] },
                        if: '',
                        tag: '',
                      },
                    },
                    {
                      grok: {
                        __template: { field: '', patterns: [] },
                        field: '',
                        patterns: [],
                        pattern_definitions: {},
                        trace_match: { __one_of: [false, true] },
                        ignore_missing: { __one_of: [false, true] },
                        on_failure: [],
                        ignore_failure: { __one_of: [false, true] },
                        if: '',
                        tag: '',
                      },
                    },
                    {
                      gsub: {
                        __template: { field: '', pattern: '', replacement: '' },
                        field: '',
                        pattern: '',
                        replacement: '',
                        on_failure: [],
                        ignore_failure: { __one_of: [false, true] },
                        if: '',
                        tag: '',
                      },
                    },
                    {
                      join: {
                        __template: { field: '', separator: '' },
                        field: '',
                        separator: '',
                        on_failure: [],
                        ignore_failure: { __one_of: [false, true] },
                        if: '',
                        tag: '',
                      },
                    },
                    {
                      json: {
                        __template: { field: '' },
                        field: '',
                        target_field: '',
                        add_to_root: { __one_of: [false, true] },
                        on_failure: [],
                        ignore_failure: { __one_of: [false, true] },
                        if: '',
                        tag: '',
                      },
                    },
                    {
                      kv: {
                        __template: { field: '', field_split: '', value_split: '' },
                        field: '',
                        field_split: '',
                        value_split: '',
                        target_field: '',
                        include_keys: [],
                        ignore_missing: { __one_of: [false, true] },
                        on_failure: [],
                        ignore_failure: { __one_of: [false, true] },
                        if: '',
                        tag: '',
                      },
                    },
                    {
                      lowercase: {
                        __template: { field: '' },
                        field: '',
                        ignore_missing: { __one_of: [false, true] },
                        on_failure: [],
                        ignore_failure: { __one_of: [false, true] },
                        if: '',
                        tag: '',
                      },
                    },
                    {
                      pipeline: {
                        __template: { name: '' },
                        name: '',
                        on_failure: [],
                        ignore_failure: { __one_of: [false, true] },
                        if: '',
                        tag: '',
                      },
                    },
                    {
                      remove: {
                        __template: { field: '' },
                        field: '',
                        on_failure: [],
                        ignore_failure: { __one_of: [false, true] },
                        if: '',
                        tag: '',
                      },
                    },
                    {
                      rename: {
                        __template: { field: '', target_field: '' },
                        field: '',
                        target_field: '',
                        ignore_missing: { __one_of: [false, true] },
                        on_failure: [],
                        ignore_failure: { __one_of: [false, true] },
                        if: '',
                        tag: '',
                      },
                    },
                    {
                      script: {
                        __template: {},
                        lang: 'painless',
                        file: '',
                        id: '',
                        source: '',
                        params: {},
                        on_failure: [],
                        ignore_failure: { __one_of: [false, true] },
                        if: '',
                        tag: '',
                      },
                    },
                    {
                      set: {
                        __template: { field: '', value: '' },
                        field: '',
                        value: '',
                        override: { __one_of: [true, false] },
                        on_failure: [],
                        ignore_failure: { __one_of: [false, true] },
                        if: '',
                        tag: '',
                      },
                    },
                    {
                      split: {
                        __template: { field: '', separator: '' },
                        field: '',
                        separator: '',
                        ignore_missing: { __one_of: [false, true] },
                        on_failure: [],
                        ignore_failure: { __one_of: [false, true] },
                        if: '',
                        tag: '',
                      },
                    },
                    {
                      sort: {
                        __template: { field: '' },
                        field: '',
                        order: 'asc',
                        on_failure: [],
                        ignore_failure: { __one_of: [false, true] },
                        if: '',
                        tag: '',
                      },
                    },
                    {
                      trim: {
                        __template: { field: '' },
                        field: '',
                        ignore_missing: { __one_of: [false, true] },
                        on_failure: [],
                        ignore_failure: { __one_of: [false, true] },
                        if: '',
                        tag: '',
                      },
                    },
                    {
                      uppercase: {
                        __template: { field: '' },
                        field: '',
                        ignore_missing: { __one_of: [false, true] },
                        on_failure: [],
                        ignore_failure: { __one_of: [false, true] },
                        if: '',
                        tag: '',
                      },
                    },
                    {
                      enrich: {
                        __template: { policy_name: '', field: '', target_field: '' },
                        policy_name: '',
                        field: '',
                        target_field: '',
                        ignore_missing: { __one_of: [false, true] },
                        override: { __one_of: [true, false] },
                        max_matches: 1,
                        shape_relation: 'INTERSECTS',
                        on_failure: [],
                        ignore_failure: { __one_of: [false, true] },
                        if: '',
                        tag: '',
                      },
                    },
                    {
                      inference: {
                        __template: { model_id: '', inference_config: {}, field_mappings: {} },
                        target_field: '',
                        model_id: '',
                        field_mappings: { __template: {} },
                        inference_config: {
                          regression: { __template: {}, results_field: '' },
                          classification: {
                            __template: {},
                            results_field: '',
                            num_top_classes: 2,
                            top_classes_results_field: '',
                          },
                        },
                        on_failure: [],
                        ignore_failure: { __one_of: [false, true] },
                        if: '',
                        tag: '',
                      },
                    },
                  ],
                },
              ],
              version: 123,
            },
          },
          'ingest.simulate': {
            url_params: { verbose: '__flag__' },
            methods: ['GET', 'POST'],
            patterns: ['_ingest/pipeline/_simulate', '_ingest/pipeline/{id}/_simulate'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/simulate-pipeline-api.html',
            id: 'ingest.simulate',
            data_autocomplete_rules: {
              pipeline: {
                description: '',
                processors: [
                  {
                    __one_of: [
                      {
                        append: {
                          __template: { field: '', value: [] },
                          field: '',
                          value: [],
                          on_failure: [],
                          ignore_failure: { __one_of: [false, true] },
                          if: '',
                          tag: '',
                        },
                      },
                      {
                        bytes: {
                          __template: { field: '' },
                          field: '',
                          target_field: '',
                          ignore_missing: { __one_of: [false, true] },
                          on_failure: [],
                          ignore_failure: { __one_of: [false, true] },
                          if: '',
                          tag: '',
                        },
                      },
                      {
                        convert: {
                          __template: { field: '', type: '' },
                          field: '',
                          type: { __one_of: ['integer', 'float', 'string', 'boolean', 'auto'] },
                          target_field: '',
                          ignore_missing: { __one_of: [false, true] },
                          on_failure: [],
                          ignore_failure: { __one_of: [false, true] },
                          if: '',
                          tag: '',
                        },
                      },
                      {
                        date: {
                          __template: { field: '', formats: [] },
                          field: '',
                          target_field: '@timestamp',
                          formats: [],
                          timezone: 'UTC',
                          locale: 'ENGLISH',
                          on_failure: [],
                          ignore_failure: { __one_of: [false, true] },
                          if: '',
                          tag: '',
                        },
                      },
                      {
                        date_index_name: {
                          __template: { field: '', date_rounding: '' },
                          field: '',
                          date_rounding: { __one_of: ['y', 'M', 'w', 'd', 'h', 'm', 's'] },
                          date_formats: [],
                          timezone: 'UTC',
                          locale: 'ENGLISH',
                          index_name_format: 'yyyy-MM-dd',
                          on_failure: [],
                          ignore_failure: { __one_of: [false, true] },
                          if: '',
                          tag: '',
                        },
                      },
                      {
                        dissect: {
                          __template: { field: '', pattern: '' },
                          field: '',
                          pattern: '',
                          append_separator: '',
                          ignore_missing: { __one_of: [false, true] },
                          on_failure: [],
                          ignore_failure: { __one_of: [false, true] },
                          if: '',
                          tag: '',
                        },
                      },
                      {
                        dot_expander: {
                          __template: { field: '' },
                          field: '',
                          path: '',
                          on_failure: [],
                          ignore_failure: { __one_of: [false, true] },
                          if: '',
                          tag: '',
                        },
                      },
                      {
                        drop: {
                          __template: {},
                          on_failure: [],
                          ignore_failure: { __one_of: [false, true] },
                          if: '',
                          tag: '',
                        },
                      },
                      {
                        fail: {
                          __template: { message: '' },
                          message: '',
                          on_failure: [],
                          ignore_failure: { __one_of: [false, true] },
                          if: '',
                          tag: '',
                        },
                      },
                      {
                        foreach: {
                          __template: { field: '', processor: {} },
                          field: '',
                          processor: { __scope_link: '_processor' },
                          on_failure: [],
                          ignore_failure: { __one_of: [false, true] },
                          if: '',
                          tag: '',
                        },
                      },
                      {
                        grok: {
                          __template: { field: '', patterns: [] },
                          field: '',
                          patterns: [],
                          pattern_definitions: {},
                          trace_match: { __one_of: [false, true] },
                          ignore_missing: { __one_of: [false, true] },
                          on_failure: [],
                          ignore_failure: { __one_of: [false, true] },
                          if: '',
                          tag: '',
                        },
                      },
                      {
                        gsub: {
                          __template: { field: '', pattern: '', replacement: '' },
                          field: '',
                          pattern: '',
                          replacement: '',
                          on_failure: [],
                          ignore_failure: { __one_of: [false, true] },
                          if: '',
                          tag: '',
                        },
                      },
                      {
                        join: {
                          __template: { field: '', separator: '' },
                          field: '',
                          separator: '',
                          on_failure: [],
                          ignore_failure: { __one_of: [false, true] },
                          if: '',
                          tag: '',
                        },
                      },
                      {
                        json: {
                          __template: { field: '' },
                          field: '',
                          target_field: '',
                          add_to_root: { __one_of: [false, true] },
                          on_failure: [],
                          ignore_failure: { __one_of: [false, true] },
                          if: '',
                          tag: '',
                        },
                      },
                      {
                        kv: {
                          __template: { field: '', field_split: '', value_split: '' },
                          field: '',
                          field_split: '',
                          value_split: '',
                          target_field: '',
                          include_keys: [],
                          ignore_missing: { __one_of: [false, true] },
                          on_failure: [],
                          ignore_failure: { __one_of: [false, true] },
                          if: '',
                          tag: '',
                        },
                      },
                      {
                        lowercase: {
                          __template: { field: '' },
                          field: '',
                          ignore_missing: { __one_of: [false, true] },
                          on_failure: [],
                          ignore_failure: { __one_of: [false, true] },
                          if: '',
                          tag: '',
                        },
                      },
                      {
                        pipeline: {
                          __template: { name: '' },
                          name: '',
                          on_failure: [],
                          ignore_failure: { __one_of: [false, true] },
                          if: '',
                          tag: '',
                        },
                      },
                      {
                        remove: {
                          __template: { field: '' },
                          field: '',
                          on_failure: [],
                          ignore_failure: { __one_of: [false, true] },
                          if: '',
                          tag: '',
                        },
                      },
                      {
                        rename: {
                          __template: { field: '', target_field: '' },
                          field: '',
                          target_field: '',
                          ignore_missing: { __one_of: [false, true] },
                          on_failure: [],
                          ignore_failure: { __one_of: [false, true] },
                          if: '',
                          tag: '',
                        },
                      },
                      {
                        script: {
                          __template: {},
                          lang: 'painless',
                          file: '',
                          id: '',
                          source: '',
                          params: {},
                          on_failure: [],
                          ignore_failure: { __one_of: [false, true] },
                          if: '',
                          tag: '',
                        },
                      },
                      {
                        set: {
                          __template: { field: '', value: '' },
                          field: '',
                          value: '',
                          override: { __one_of: [true, false] },
                          on_failure: [],
                          ignore_failure: { __one_of: [false, true] },
                          if: '',
                          tag: '',
                        },
                      },
                      {
                        split: {
                          __template: { field: '', separator: '' },
                          field: '',
                          separator: '',
                          ignore_missing: { __one_of: [false, true] },
                          on_failure: [],
                          ignore_failure: { __one_of: [false, true] },
                          if: '',
                          tag: '',
                        },
                      },
                      {
                        sort: {
                          __template: { field: '' },
                          field: '',
                          order: 'asc',
                          on_failure: [],
                          ignore_failure: { __one_of: [false, true] },
                          if: '',
                          tag: '',
                        },
                      },
                      {
                        trim: {
                          __template: { field: '' },
                          field: '',
                          ignore_missing: { __one_of: [false, true] },
                          on_failure: [],
                          ignore_failure: { __one_of: [false, true] },
                          if: '',
                          tag: '',
                        },
                      },
                      {
                        uppercase: {
                          __template: { field: '' },
                          field: '',
                          ignore_missing: { __one_of: [false, true] },
                          on_failure: [],
                          ignore_failure: { __one_of: [false, true] },
                          if: '',
                          tag: '',
                        },
                      },
                      {
                        enrich: {
                          __template: { policy_name: '', field: '', target_field: '' },
                          policy_name: '',
                          field: '',
                          target_field: '',
                          ignore_missing: { __one_of: [false, true] },
                          override: { __one_of: [true, false] },
                          max_matches: 1,
                          shape_relation: 'INTERSECTS',
                          on_failure: [],
                          ignore_failure: { __one_of: [false, true] },
                          if: '',
                          tag: '',
                        },
                      },
                      {
                        inference: {
                          __template: { model_id: '', inference_config: {}, field_mappings: {} },
                          target_field: '',
                          model_id: '',
                          field_mappings: { __template: {} },
                          inference_config: {
                            regression: { __template: {}, results_field: '' },
                            classification: {
                              __template: {},
                              results_field: '',
                              num_top_classes: 2,
                              top_classes_results_field: '',
                            },
                          },
                          on_failure: [],
                          ignore_failure: { __one_of: [false, true] },
                          if: '',
                          tag: '',
                        },
                      },
                    ],
                  },
                ],
                version: 123,
              },
              docs: [],
            },
          },
          mget: {
            url_params: {
              stored_fields: [],
              preference: 'random',
              realtime: '__flag__',
              refresh: '__flag__',
              routing: '',
              _source: [],
              _source_excludes: [],
              _source_includes: [],
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['GET', 'POST'],
            patterns: ['_mget', '{indices}/_mget', '{indices}/{type}/_mget'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/docs-multi-get.html',
            id: 'mget',
          },
          msearch_template: {
            url_params: {
              search_type: [
                'query_then_fetch',
                'query_and_fetch',
                'dfs_query_then_fetch',
                'dfs_query_and_fetch',
              ],
              typed_keys: '__flag__',
              max_concurrent_searches: '',
              rest_total_hits_as_int: '__flag__',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['GET', 'POST'],
            patterns: [
              '_msearch/template',
              '{indices}/_msearch/template',
              '{indices}/{type}/_msearch/template',
            ],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-multi-search.html',
            id: 'msearch_template',
          },
          msearch: {
            url_params: {
              search_type: [
                'query_then_fetch',
                'query_and_fetch',
                'dfs_query_then_fetch',
                'dfs_query_and_fetch',
              ],
              max_concurrent_searches: '',
              typed_keys: '__flag__',
              pre_filter_shard_size: '',
              max_concurrent_shard_requests: '',
              rest_total_hits_as_int: '__flag__',
              ccs_minimize_roundtrips: '__flag__',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['GET', 'POST'],
            patterns: ['_msearch', '{indices}/_msearch', '{indices}/{type}/_msearch'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/search-multi-search.html',
            id: 'msearch',
          },
          mtermvectors: {
            url_params: {
              ids: [],
              term_statistics: '__flag__',
              field_statistics: '__flag__',
              fields: [],
              offsets: '__flag__',
              positions: '__flag__',
              payloads: '__flag__',
              preference: 'random',
              routing: '',
              realtime: '__flag__',
              version: '',
              version_type: ['internal', 'external', 'external_gte', 'force'],
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['GET', 'POST'],
            patterns: [
              '_mtermvectors',
              '{indices}/_mtermvectors',
              '{indices}/{type}/_mtermvectors',
            ],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/docs-multi-termvectors.html',
            id: 'mtermvectors',
          },
          'nodes.hot_threads': {
            url_params: {
              interval: '',
              snapshots: '10',
              threads: '3',
              ignore_idle_threads: '__flag__',
              type: ['cpu', 'wait', 'block'],
              timeout: '',
            },
            methods: ['GET'],
            patterns: ['_nodes/hot_threads', '_nodes/{nodes}/hot_threads'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cluster-nodes-hot-threads.html',
            id: 'nodes.hot_threads',
          },
          'nodes.info': {
            url_params: { flat_settings: '__flag__', timeout: '' },
            methods: ['GET'],
            patterns: ['_nodes', '_nodes/{nodes}', '_nodes/{metrics}', '_nodes/{nodes}/{metrics}'],
            url_components: {
              nodes: null,
              metrics: [
                'http',
                'ingest',
                'jvm',
                'os',
                'plugins',
                'process',
                'settings',
                'thread_pool',
                'transport',
              ],
            },
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cluster-nodes-info.html',
            id: 'nodes.info',
          },
          'nodes.reload_secure_settings': {
            url_params: { timeout: '' },
            methods: ['POST'],
            patterns: ['_nodes/reload_secure_settings', '_nodes/{nodes}/reload_secure_settings'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/secure-settings.html#reloadable-secure-settings',
            id: 'nodes.reload_secure_settings',
          },
          'nodes.stats': {
            url_params: {
              completion_fields: [],
              fielddata_fields: [],
              fields: [],
              groups: '__flag__',
              level: ['indices', 'node', 'shards'],
              types: [],
              timeout: '',
              include_segment_file_sizes: '__flag__',
            },
            methods: ['GET'],
            patterns: [
              '_nodes/stats',
              '_nodes/{nodes}/stats',
              '_nodes/stats/{metrics}',
              '_nodes/{nodes}/stats/{metrics}',
              '_nodes/stats/{metrics}/{index_metric}',
              '_nodes/{nodes}/stats/{metrics}/{index_metric}',
            ],
            url_components: {
              nodes: null,
              metrics: [
                '_all',
                'breaker',
                'discovery',
                'fs',
                'http',
                'indices',
                'jvm',
                'os',
                'process',
                'thread_pool',
                'transport',
              ],
              index_metric: [
                '_all',
                'completion',
                'docs',
                'fielddata',
                'flush',
                'get',
                'indexing',
                'merge',
                'query_cache',
                'refresh',
                'request_cache',
                'search',
                'segments',
                'store',
                'suggest',
                'warmer',
              ],
            },
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cluster-nodes-stats.html',
            id: 'nodes.stats',
          },
          'nodes.usage': {
            url_params: { timeout: '' },
            methods: ['GET'],
            patterns: [
              '_nodes/usage',
              '_nodes/{nodes}/usage',
              '_nodes/usage/{metrics}',
              '_nodes/{nodes}/usage/{metrics}',
            ],
            url_components: { nodes: null, metrics: ['_all', 'rest_actions'] },
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/cluster-nodes-usage.html',
            id: 'nodes.usage',
          },
          ping: {
            methods: ['HEAD'],
            patterns: [''],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html',
            id: 'ping',
          },
          put_script: {
            url_params: { timeout: '', master_timeout: '', context: '' },
            methods: ['POST', 'PUT'],
            patterns: ['_scripts/{lang}/{id}', '_scripts/{lang}/{id}/_create'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/modules-scripting.html',
            id: 'put_script',
            url_components: { lang: ['groovy', 'expressions'] },
            data_autocomplete_rules: { script: '' },
          },
          rank_eval: {
            url_params: {
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
              search_type: ['query_then_fetch', 'dfs_query_then_fetch'],
            },
            methods: ['GET', 'POST'],
            patterns: ['_rank_eval', '{indices}/_rank_eval'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/search-rank-eval.html',
            id: 'rank_eval',
          },
          reindex_rethrottle: {
            url_params: { requests_per_second: '' },
            methods: ['POST'],
            patterns: ['_reindex/{task_id}/_rethrottle'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/docs-reindex.html',
            id: 'reindex_rethrottle',
          },
          reindex: {
            url_params: {
              refresh: '__flag__',
              timeout: '',
              wait_for_active_shards: '',
              wait_for_completion: '__flag__',
              requests_per_second: '',
              scroll: '',
              slices: '',
              max_docs: 'all documents',
            },
            methods: ['POST'],
            patterns: ['_reindex'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/docs-reindex.html',
            id: 'reindex',
            data_autocomplete_rules: {
              __template: { source: {}, dest: {} },
              source: {
                index: '',
                type: '',
                query: { __scope_link: 'GLOBAL.query' },
                sort: { __template: { FIELD: 'desc' }, FIELD: { __one_of: ['asc', 'desc'] } },
                size: 1000,
                remote: {
                  __template: { host: '' },
                  host: '',
                  username: '',
                  password: '',
                  socket_timeout: '30s',
                  connect_timeout: '30s',
                },
              },
              dest: {
                index: '',
                version_type: { __one_of: ['internal', 'external'] },
                op_type: 'create',
                routing: { __one_of: ['keep', 'discard', '=SOME TEXT'] },
                pipeline: '',
              },
              conflicts: 'proceed',
              size: 10,
              script: { __scope_link: 'GLOBAL.script' },
            },
          },
          render_search_template: {
            methods: ['GET', 'POST'],
            patterns: ['_render/template', '_render/template/{id}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html#_validating_templates',
            id: 'render_search_template',
            data_autocomplete_rules: {
              __one_of: [{ source: { __scope_link: 'search' } }, { __scope_link: 'GLOBAL.script' }],
              params: {},
            },
          },
          scripts_painless_execute: {
            methods: ['GET', 'POST'],
            patterns: ['_scripts/painless/_execute'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/painless/master/painless-execute-api.html',
            id: 'scripts_painless_execute',
          },
          scroll: {
            url_params: { scroll: '', scroll_id: '', rest_total_hits_as_int: '__flag__' },
            methods: ['GET', 'POST'],
            patterns: ['_search/scroll'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/search-request-body.html#request-body-search-scroll',
            id: 'scroll',
          },
          search_shards: {
            url_params: {
              preference: 'random',
              routing: '',
              local: '__flag__',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
            },
            methods: ['GET', 'POST'],
            patterns: ['_search_shards', '{indices}/_search_shards'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/search-shards.html',
            id: 'search_shards',
          },
          search_template: {
            url_params: {
              ignore_unavailable: '__flag__',
              ignore_throttled: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
              preference: 'random',
              routing: [],
              scroll: '',
              search_type: [
                'query_then_fetch',
                'query_and_fetch',
                'dfs_query_then_fetch',
                'dfs_query_and_fetch',
              ],
              explain: '__flag__',
              profile: '__flag__',
              typed_keys: '__flag__',
              rest_total_hits_as_int: '__flag__',
            },
            methods: ['GET', 'POST'],
            patterns: [
              '_search/template',
              '{indices}/_search/template',
              '{indices}/{type}/_search/template',
            ],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html',
            id: 'search_template',
            data_autocomplete_rules: {
              template: {
                __one_of: [{ __scope_link: 'search' }, { __scope_link: 'GLOBAL.script' }],
              },
              params: {},
            },
          },
          search: {
            url_params: {
              analyzer: '',
              analyze_wildcard: '__flag__',
              ccs_minimize_roundtrips: '__flag__',
              default_operator: ['AND', 'OR'],
              df: '',
              explain: '__flag__',
              stored_fields: [],
              docvalue_fields: [],
              from: '0',
              ignore_unavailable: '__flag__',
              ignore_throttled: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
              lenient: '__flag__',
              preference: 'random',
              q: '',
              routing: [],
              scroll: '',
              search_type: ['query_then_fetch', 'dfs_query_then_fetch'],
              size: '10',
              sort: [],
              _source: [],
              _source_excludes: [],
              _source_includes: [],
              terminate_after: '',
              stats: [],
              suggest_field: '',
              suggest_mode: ['missing', 'popular', 'always'],
              suggest_size: '',
              suggest_text: '',
              timeout: '',
              track_scores: '__flag__',
              track_total_hits: '__flag__',
              allow_partial_search_results: '__flag__',
              typed_keys: '__flag__',
              version: '__flag__',
              seq_no_primary_term: '__flag__',
              request_cache: '__flag__',
              batched_reduce_size: '',
              max_concurrent_shard_requests: '',
              pre_filter_shard_size: '',
              rest_total_hits_as_int: '__flag__',
            },
            methods: ['GET', 'POST'],
            patterns: ['_search', '{indices}/_search', '{indices}/{type}/_search'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/search-search.html',
            id: 'search',
            priority: 10,
            data_autocomplete_rules: {
              query: {},
              profile: { __one_of: ['true', 'false'] },
              aggs: { __template: { NAME: { AGG_TYPE: {} } } },
              post_filter: { __scope_link: 'GLOBAL.filter' },
              size: { __template: 20 },
              from: 0,
              sort: {
                __template: [{ FIELD: { order: 'desc' } }],
                __any_of: [
                  {
                    '{field}': {
                      order: { __one_of: ['desc', 'asc'] },
                      missing: { __one_of: ['_last', '_first'] },
                      mode: { __one_of: ['min', 'max', 'avg', 'sum'] },
                      nested_path: '',
                      nested_filter: { __scope_link: 'GLOBAL.filter' },
                    },
                  },
                  '{field}',
                  '_score',
                  {
                    _geo_distance: {
                      __template: { FIELD: { lat: 40, lon: -70 }, order: 'asc' },
                      '{field}': {
                        __one_of: [
                          { __template: { lat: 40, lon: -70 }, lat: 40, lon: -70 },
                          [{ __template: { lat: 40, lon: -70 }, lat: 40, lon: -70 }],
                          [''],
                          '',
                        ],
                      },
                      distance_type: { __one_of: ['sloppy_arc', 'arc', 'plane'] },
                      sort_mode: { __one_of: ['min', 'max', 'avg'] },
                      order: { __one_of: ['asc', 'desc'] },
                      unit: 'km',
                    },
                  },
                ],
              },
              stored_fields: ['{field}'],
              suggest: {
                __template: { YOUR_SUGGESTION: { text: 'YOUR TEXT', term: { FIELD: 'MESSAGE' } } },
                '*': { include: [], exclude: [] },
              },
              docvalue_fields: ['{field}'],
              collapse: { __template: { field: 'FIELD' } },
              indices_boost: { __template: [{ INDEX: 1 }] },
              rescore: { __template: { query: {}, window_size: 50 } },
              script_fields: {
                __template: { FIELD: { script: {} } },
                '*': { __scope_link: 'GLOBAL.script' },
              },
              partial_fields: {
                __template: { NAME: { include: [] } },
                '*': { include: [], exclude: [] },
              },
              highlight: {},
              _source: {
                __one_of: [
                  '{field}',
                  ['{field}'],
                  {
                    includes: { __one_of: ['{field}', ['{field}']] },
                    excludes: { __one_of: ['{field}', ['{field}']] },
                  },
                ],
              },
              explain: { __one_of: [true, false] },
              stats: [''],
              timeout: '1s',
              version: { __one_of: [true, false] },
              track_total_hits: { __one_of: [true, false] },
            },
          },
          'snapshot.cleanup_repository': {
            url_params: { master_timeout: '', timeout: '' },
            methods: ['POST'],
            patterns: ['_snapshot/{repository}/_cleanup'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/modules-snapshots.html',
            id: 'snapshot.cleanup_repository',
          },
          'snapshot.create_repository': {
            url_params: { master_timeout: '', timeout: '', verify: '__flag__' },
            methods: ['PUT', 'POST'],
            patterns: ['_snapshot/{repository}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/modules-snapshots.html',
            data_autocomplete_rules: {
              __template: { type: '' },
              type: { __one_of: ['fs', 'url', 's3', 'hdfs', 'azure'] },
              settings: {
                __one_of: [
                  {
                    __condition: { lines_regex: 'type["\']\\s*:\\s*["\']fs`' },
                    __template: { location: 'path' },
                    location: 'path',
                    compress: { __one_of: [true, false] },
                    concurrent_streams: 5,
                    chunk_size: '10m',
                    max_restore_bytes_per_sec: '20mb',
                    max_snapshot_bytes_per_sec: '20mb',
                  },
                  {
                    __condition: { lines_regex: 'type["\']\\s*:\\s*["\']url' },
                    __template: { url: '' },
                    url: '',
                    concurrent_streams: 5,
                  },
                  {
                    __condition: { lines_regex: 'type["\']\\s*:\\s*["\']s3' },
                    __template: { bucket: '' },
                    bucket: '',
                    region: '',
                    base_path: '',
                    concurrent_streams: 5,
                    chunk_size: '10m',
                    compress: { __one_of: [true, false] },
                  },
                  {
                    __condition: { lines_regex: 'type["\']\\s*:\\s*["\']hdfs' },
                    __template: { path: '' },
                    uri: '',
                    path: 'some/path',
                    load_defaults: { __one_of: [true, false] },
                    conf_location: 'cfg.xml',
                    concurrent_streams: 5,
                    compress: { __one_of: [true, false] },
                    chunk_size: '10m',
                  },
                  {
                    __condition: { lines_regex: 'type["\']\\s*:\\s*["\']azure' },
                    __template: { path: '' },
                    container: '',
                    base_path: '',
                    client: 'default',
                    location_mode: { __one_of: ['primary_only', 'secondary_only'] },
                    readonly: { __one_of: [true, false] },
                    compress: { __one_of: [true, false] },
                    chunk_size: '10m',
                  },
                ],
              },
            },
            id: 'snapshot.create_repository',
          },
          'snapshot.create': {
            url_params: { master_timeout: '', wait_for_completion: '__flag__' },
            methods: ['PUT', 'POST'],
            patterns: ['_snapshot/{repository}/{snapshot}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/modules-snapshots.html',
            data_autocomplete_rules: {
              indices: '*',
              ignore_unavailable: { __one_of: [true, false] },
              include_global_state: { __one_of: [true, false] },
              partial: { __one_of: [true, false] },
            },
            id: 'snapshot.create',
          },
          'snapshot.delete_repository': {
            url_params: { master_timeout: '', timeout: '' },
            methods: ['DELETE'],
            patterns: ['_snapshot/{repository}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/modules-snapshots.html',
            id: 'snapshot.delete_repository',
          },
          'snapshot.delete': {
            url_params: { master_timeout: '' },
            methods: ['DELETE'],
            patterns: ['_snapshot/{repository}/{snapshot}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/modules-snapshots.html',
            id: 'snapshot.delete',
          },
          'snapshot.get_repository': {
            url_params: { master_timeout: '', local: '__flag__' },
            methods: ['GET'],
            patterns: ['_snapshot', '_snapshot/{repository}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/modules-snapshots.html',
            id: 'snapshot.get_repository',
          },
          'snapshot.get': {
            url_params: { master_timeout: '', ignore_unavailable: '__flag__', verbose: '__flag__' },
            methods: ['GET'],
            patterns: ['_snapshot/{repository}/{snapshot}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/modules-snapshots.html',
            id: 'snapshot.get',
          },
          'snapshot.restore': {
            url_params: { master_timeout: '', wait_for_completion: '__flag__' },
            methods: ['POST'],
            patterns: ['_snapshot/{repository}/{snapshot}/_restore'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/modules-snapshots.html',
            data_autocomplete_rules: {
              indices: '*',
              ignore_unavailable: { __one_of: [true, false] },
              include_global_state: false,
              rename_pattern: 'index_(.+)',
              rename_replacement: 'restored_index_$1',
            },
            id: 'snapshot.restore',
          },
          'snapshot.status': {
            url_params: { master_timeout: '', ignore_unavailable: '__flag__' },
            methods: ['GET'],
            patterns: [
              '_snapshot/_status',
              '_snapshot/{repository}/_status',
              '_snapshot/{repository}/{snapshot}/_status',
            ],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/modules-snapshots.html',
            id: 'snapshot.status',
          },
          'snapshot.verify_repository': {
            url_params: { master_timeout: '', timeout: '' },
            methods: ['POST'],
            patterns: ['_snapshot/{repository}/_verify'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/modules-snapshots.html',
            id: 'snapshot.verify_repository',
          },
          'tasks.cancel': {
            url_params: { nodes: [], actions: [], parent_task_id: '' },
            methods: ['POST'],
            patterns: ['_tasks/_cancel', '_tasks/{task_id}/_cancel'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/tasks.html',
            id: 'tasks.cancel',
          },
          'tasks.get': {
            url_params: { wait_for_completion: '__flag__', timeout: '' },
            methods: ['GET'],
            patterns: ['_tasks/{task_id}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/tasks.html',
            id: 'tasks.get',
          },
          'tasks.list': {
            url_params: {
              nodes: [],
              actions: [],
              detailed: '__flag__',
              parent_task_id: '',
              wait_for_completion: '__flag__',
              group_by: ['nodes', 'parents', 'none'],
              timeout: '',
            },
            methods: ['GET'],
            patterns: ['_tasks'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/tasks.html',
            id: 'tasks.list',
          },
          termvectors: {
            url_params: {
              term_statistics: '__flag__',
              field_statistics: '__flag__',
              fields: [],
              offsets: '__flag__',
              positions: '__flag__',
              payloads: '__flag__',
              preference: 'random',
              routing: '',
              realtime: '__flag__',
              version: '',
              version_type: ['internal', 'external', 'external_gte', 'force'],
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['GET', 'POST'],
            patterns: [
              '{indices}/_termvectors/{id}',
              '{indices}/_termvectors',
              '{indices}/{type}/{id}/_termvectors',
              '{indices}/{type}/_termvectors',
            ],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/docs-termvectors.html',
            id: 'termvectors',
            data_autocomplete_rules: {
              fields: ['{field}'],
              offsets: { __one_of: [false, true] },
              payloads: { __one_of: [false, true] },
              positions: { __one_of: [false, true] },
              term_statistics: { __one_of: [true, false] },
              field_statistics: { __one_of: [false, true] },
              per_field_analyzer: { __template: { FIELD: '' }, '{field}': '' },
              routing: '',
              version: 1,
              version_type: ['external', 'external_gt', 'external_gte', 'force', 'internal'],
              doc: {},
              filter: {
                max_num_terms: 1,
                min_term_freq: 1,
                max_term_freq: 1,
                min_doc_freq: 1,
                max_doc_freq: 1,
                min_word_length: 1,
                max_word_length: 1,
              },
            },
          },
          update_by_query_rethrottle: {
            url_params: { requests_per_second: '' },
            methods: ['POST'],
            patterns: ['_update_by_query/{task_id}/_rethrottle'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-update-by-query.html',
            id: 'update_by_query_rethrottle',
          },
          update_by_query: {
            url_params: {
              analyzer: '',
              analyze_wildcard: '__flag__',
              default_operator: ['AND', 'OR'],
              df: '',
              from: '0',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              conflicts: ['abort', 'proceed'],
              expand_wildcards: ['open', 'closed', 'none', 'all'],
              lenient: '__flag__',
              pipeline: 'none',
              preference: 'random',
              q: '',
              routing: [],
              scroll: '',
              search_type: ['query_then_fetch', 'dfs_query_then_fetch'],
              search_timeout: '',
              size: '',
              max_docs: 'all documents',
              sort: [],
              _source: [],
              _source_excludes: [],
              _source_includes: [],
              terminate_after: '',
              stats: [],
              version: '__flag__',
              version_type: '__flag__',
              request_cache: '__flag__',
              refresh: '__flag__',
              timeout: '',
              wait_for_active_shards: '',
              scroll_size: '',
              wait_for_completion: '__flag__',
              requests_per_second: '',
              slices: '',
            },
            methods: ['POST'],
            patterns: ['{indices}/_update_by_query', '{indices}/{type}/_update_by_query'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/docs-update-by-query.html',
            id: 'update_by_query',
          },
          update: {
            url_params: {
              wait_for_active_shards: '',
              _source: [],
              _source_excludes: [],
              _source_includes: [],
              lang: 'painless',
              refresh: ['true', 'false', 'wait_for'],
              retry_on_conflict: '0',
              routing: '',
              timeout: '',
              if_seq_no: '',
              if_primary_term: '',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['POST'],
            patterns: ['{indices}/_update/{id}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/docs-update.html',
            id: 'update',
            data_autocomplete_rules: {
              script: {},
              doc: {},
              upsert: {},
              scripted_upsert: { __one_of: [true, false] },
            },
          },
          'ccr.delete_auto_follow_pattern': {
            methods: ['DELETE'],
            patterns: ['_ccr/auto_follow/{name}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-delete-auto-follow-pattern.html',
            id: 'ccr.delete_auto_follow_pattern',
          },
          'ccr.follow_info': {
            methods: ['GET'],
            patterns: ['{indices}/_ccr/info'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-get-follow-info.html',
            url_params: {
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            id: 'ccr.follow_info',
          },
          'ccr.follow_stats': {
            methods: ['GET'],
            patterns: ['{indices}/_ccr/stats'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-get-follow-stats.html',
            url_params: {
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            id: 'ccr.follow_stats',
          },
          'ccr.follow': {
            url_params: {
              wait_for_active_shards: '',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['PUT'],
            patterns: ['{indices}/_ccr/follow'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-put-follow.html',
            data_autocomplete_rules: {
              remote_cluster: '',
              leader_index: '',
              max_read_request_operation_count: '',
              max_outstanding_read_requests: '',
              max_read_request_size: '',
              max_write_request_operation_count: '',
              max_write_request_size: '',
              max_outstanding_write_requests: '',
              max_write_buffer_count: '',
              max_write_buffer_size: '',
              max_retry_delay: '',
              read_poll_timeout: '',
            },
            id: 'ccr.follow',
          },
          'ccr.forget_follower': {
            methods: ['POST'],
            patterns: ['{indices}/_ccr/forget_follower'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-post-forget-follower.html',
            data_autocomplete_rules: {
              follower_cluster: '',
              follower_index: '',
              follower_index_uuid: '',
              leader_remote_cluster: '',
            },
            url_params: {
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            id: 'ccr.forget_follower',
          },
          'ccr.get_auto_follow_pattern': {
            methods: ['GET'],
            patterns: ['_ccr/auto_follow', '_ccr/auto_follow/{name}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-get-auto-follow-pattern.html',
            id: 'ccr.get_auto_follow_pattern',
          },
          'ccr.pause_auto_follow_pattern': {
            methods: ['POST'],
            patterns: ['_ccr/auto_follow/{name}/pause'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-pause-auto-follow-pattern.html',
            id: 'ccr.pause_auto_follow_pattern',
          },
          'ccr.pause_follow': {
            methods: ['POST'],
            patterns: ['{indices}/_ccr/pause_follow'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-post-pause-follow.html',
            url_params: {
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            id: 'ccr.pause_follow',
          },
          'ccr.put_auto_follow_pattern': {
            methods: ['PUT'],
            patterns: ['_ccr/auto_follow/{name}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-put-auto-follow-pattern.html',
            data_autocomplete_rules: {
              remote_cluster: '',
              leader_index_patterns: '',
              follow_index_pattern: '',
              max_read_request_operation_count: '',
              max_outstanding_read_requests: '',
              max_read_request_size: '',
              max_write_request_operation_count: '',
              max_write_request_size: '',
              max_outstanding_write_requests: '',
              max_write_buffer_count: '',
              max_write_buffer_size: '',
              max_retry_delay: '',
              read_poll_timeout: '',
            },
            id: 'ccr.put_auto_follow_pattern',
          },
          'ccr.resume_auto_follow_pattern': {
            methods: ['POST'],
            patterns: ['_ccr/auto_follow/{name}/resume'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-resume-auto-follow-pattern.html',
            id: 'ccr.resume_auto_follow_pattern',
          },
          'ccr.resume_follow': {
            methods: ['POST'],
            patterns: ['{indices}/_ccr/resume_follow'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-post-resume-follow.html',
            data_autocomplete_rules: {
              max_read_request_operation_count: '',
              max_outstanding_read_requests: '',
              max_read_request_size: '',
              max_write_request_operation_count: '',
              max_write_request_size: '',
              max_outstanding_write_requests: '',
              max_write_buffer_count: '',
              max_write_buffer_size: '',
              max_retry_delay: '',
              read_poll_timeout: '',
            },
            url_params: {
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            id: 'ccr.resume_follow',
          },
          'ccr.stats': {
            methods: ['GET'],
            patterns: ['_ccr/stats'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-get-stats.html',
            id: 'ccr.stats',
          },
          'ccr.unfollow': {
            methods: ['POST'],
            patterns: ['{indices}/_ccr/unfollow'],
            documentation: 'http://www.elastic.co/guide/en/elasticsearch/reference/current',
            url_params: {
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            id: 'ccr.unfollow',
          },
          'enrich.delete_policy': {
            methods: ['DELETE'],
            patterns: ['_enrich/policy/{name}'],
            id: 'enrich.delete_policy',
          },
          'enrich.execute_policy': {
            url_params: { wait_for_completion: '__flag__' },
            methods: ['PUT'],
            patterns: ['_enrich/policy/{name}/_execute'],
            id: 'enrich.execute_policy',
          },
          'enrich.get_policy': {
            methods: ['GET'],
            patterns: ['_enrich/policy/{name}', '_enrich/policy'],
            id: 'enrich.get_policy',
          },
          'enrich.put_policy': {
            methods: ['PUT'],
            patterns: ['_enrich/policy/{name}'],
            data_autocomplete_rules: {
              geo_match: {
                __template: { indices: '', match_field: '', enrich_fields: [] },
                indices: '',
                match_field: '',
                enrich_fields: [],
              },
              match: {
                __template: { indices: '', match_field: '', enrich_fields: [] },
                indices: '',
                match_field: '',
                enrich_fields: [],
              },
            },
            id: 'enrich.put_policy',
          },
          'enrich.stats': { methods: ['GET'], patterns: ['_enrich/_stats'], id: 'enrich.stats' },
          'graph.explore': {
            url_params: {
              routing: '',
              timeout: '',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['GET', 'POST'],
            patterns: ['{indices}/_graph/explore', '{indices}/{type}/_graph/explore'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/graph-explore-api.html',
            id: 'graph.explore',
          },
          'ilm.delete_lifecycle': {
            methods: ['DELETE'],
            patterns: ['_ilm/policy/{policy}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/ilm-delete-lifecycle.html',
            id: 'ilm.delete_lifecycle',
          },
          'ilm.explain_lifecycle': {
            url_params: {
              only_managed: '__flag__',
              only_errors: '__flag__',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['GET'],
            patterns: ['{indices}/_ilm/explain'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/ilm-explain-lifecycle.html',
            id: 'ilm.explain_lifecycle',
          },
          'ilm.get_lifecycle': {
            methods: ['GET'],
            patterns: ['_ilm/policy/{policy}', '_ilm/policy'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/ilm-get-lifecycle.html',
            id: 'ilm.get_lifecycle',
          },
          'ilm.get_status': {
            methods: ['GET'],
            patterns: ['_ilm/status'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/ilm-get-status.html',
            id: 'ilm.get_status',
          },
          'ilm.move_to_step': {
            methods: ['POST'],
            patterns: ['_ilm/move/{indices}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/ilm-move-to-step.html',
            data_autocomplete_rules: {
              current_step: { phase: '', action: '', name: '' },
              next_step: { phase: '', action: '', name: '' },
            },
            url_params: {
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            id: 'ilm.move_to_step',
          },
          'ilm.put_lifecycle': {
            methods: ['PUT'],
            patterns: ['_ilm/policy/{policy}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/ilm-put-lifecycle.html',
            data_autocomplete_rules: {
              policy: {
                phases: {
                  warm: {
                    __template: {
                      min_age: '1d',
                      actions: {
                        set_priority: { priority: 50 },
                        allocate: {
                          number_of_replicas: 1,
                          include: { _name: '', _ip: '' },
                          exclude: { _name: '', _ip: '' },
                          require: { _name: '', _ip: '' },
                        },
                        shrink: { number_of_shards: 1 },
                        forcemerge: { max_num_segments: 1 },
                      },
                    },
                    min_age: '1d',
                    actions: {
                      set_priority: { priority: 50 },
                      allocate: {
                        number_of_replicas: 1,
                        include: { _name: '', _ip: '' },
                        exclude: { _name: '', _ip: '' },
                        require: { _name: '', _ip: '' },
                      },
                      shrink: { number_of_shards: 1 },
                      forcemerge: { max_num_segments: 1 },
                      unfollow: {},
                    },
                  },
                  cold: {
                    __template: {
                      min_age: '1d',
                      actions: {
                        set_priority: { priority: 0 },
                        freeze: {},
                        allocate: {
                          number_of_replicas: 1,
                          include: { _name: '', _ip: '' },
                          exclude: { _name: '', _ip: '' },
                          require: { _name: '', _ip: '' },
                        },
                      },
                    },
                    min_age: '1d',
                    actions: {
                      set_priority: { priority: 0 },
                      freeze: {},
                      unfollow: {},
                      allocate: {
                        number_of_replicas: 1,
                        include: { _name: '', _ip: '' },
                        exclude: { _name: '', _ip: '' },
                        require: { _name: '', _ip: '' },
                      },
                    },
                  },
                  hot: {
                    __template: {
                      min_age: '1d',
                      actions: {
                        set_priority: { priority: 100 },
                        rollover: { max_age: '7d', max_docs: 1000, max_size: '5gb' },
                      },
                    },
                    min_age: '1d',
                    actions: {
                      set_priority: { priority: 100 },
                      rollover: { max_age: '7d', max_docs: 1000, max_size: '5gb' },
                      unfollow: {},
                    },
                  },
                  delete: {
                    __template: { min_age: '1d', actions: { delete: {} } },
                    min_age: '1d',
                    actions: { delete: {} },
                  },
                },
              },
            },
            id: 'ilm.put_lifecycle',
          },
          'ilm.remove_policy': {
            methods: ['POST'],
            patterns: ['{indices}/_ilm/remove'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/ilm-remove-policy.html',
            url_params: {
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            id: 'ilm.remove_policy',
          },
          'ilm.retry': {
            methods: ['POST'],
            patterns: ['{indices}/_ilm/retry'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/ilm-retry-policy.html',
            url_params: {
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            id: 'ilm.retry',
          },
          'ilm.set_policy': {
            methods: ['PUT'],
            patterns: ['{indices}/_ilm/{new_policy}'],
            documentation:
              'http://www.elastic.co/guide/en/index_lifecycle/current/index_lifecycle.html',
            url_params: {
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            id: 'ilm.set_policy',
          },
          'ilm.start': {
            methods: ['POST'],
            patterns: ['_ilm/start'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/ilm-start.html',
            id: 'ilm.start',
          },
          'ilm.stop': {
            methods: ['POST'],
            patterns: ['_ilm/stop'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/ilm-stop.html',
            id: 'ilm.stop',
          },
          'indices.freeze': {
            url_params: {
              timeout: '',
              master_timeout: '',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
              wait_for_active_shards: '',
            },
            methods: ['POST'],
            patterns: ['{indices}/_freeze'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/frozen.html',
            id: 'indices.freeze',
          },
          'indices.reload_search_analyzers': {
            url_params: {
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
            },
            methods: ['GET', 'POST'],
            patterns: ['{indices}/_reload_search_analyzers'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-reload-analyzers.html',
            id: 'indices.reload_search_analyzers',
          },
          'indices.unfreeze': {
            url_params: {
              timeout: '',
              master_timeout: '',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
              wait_for_active_shards: '',
            },
            methods: ['POST'],
            patterns: ['{indices}/_unfreeze'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/frozen.html',
            id: 'indices.unfreeze',
          },
          'license.delete': {
            methods: ['DELETE'],
            patterns: ['_license'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/delete-license.html',
            id: 'license.delete',
          },
          'license.get_basic_status': {
            methods: ['GET'],
            patterns: ['_license/basic_status'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/get-basic-status.html',
            id: 'license.get_basic_status',
          },
          'license.get_trial_status': {
            methods: ['GET'],
            patterns: ['_license/trial_status'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/get-trial-status.html',
            id: 'license.get_trial_status',
          },
          'license.get': {
            url_params: { local: '__flag__', accept_enterprise: '__flag__' },
            methods: ['GET'],
            patterns: ['_license'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/get-license.html',
            id: 'license.get',
          },
          'license.post_start_basic': {
            url_params: { acknowledge: '__flag__' },
            methods: ['POST'],
            patterns: ['_license/start_basic'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/start-basic.html',
            id: 'license.post_start_basic',
          },
          'license.post_start_trial': {
            url_params: { type: '"trial"', acknowledge: '__flag__' },
            methods: ['POST'],
            patterns: ['_license/start_trial'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/start-trial.html',
            id: 'license.post_start_trial',
          },
          'license.post': {
            url_params: { acknowledge: '__flag__' },
            methods: ['PUT', 'POST'],
            patterns: ['_license'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/update-license.html',
            id: 'license.post',
          },
          'migration.deprecations': {
            methods: ['GET'],
            patterns: ['_migration/deprecations', '{indices}/_migration/deprecations'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/migration-api-deprecation.html',
            url_params: {
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            id: 'migration.deprecations',
          },
          'xpack.migration.get_assistance': {
            url_params: {
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed', 'none', 'all'],
              ignore_unavailable: '__flag__',
            },
            methods: ['GET'],
            patterns: ['_migration/assistance', '_migration/assistance/{indices}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/migration-api-assistance.html',
            id: 'xpack.migration.get_assistance',
          },
          'xpack.migration.upgrade': {
            url_params: {
              wait_for_completion: '__flag__',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['POST'],
            patterns: ['_migration/upgrade/{indices}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/migration-api-upgrade.html',
            id: 'xpack.migration.upgrade',
          },
          'ml.close_job': {
            url_params: { allow_no_jobs: '__flag__', force: '__flag__', timeout: '' },
            methods: ['POST'],
            patterns: ['_ml/anomaly_detectors/{job_id}/_close'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-close-job.html',
            id: 'ml.close_job',
          },
          'ml.delete_calendar_event': {
            methods: ['DELETE'],
            patterns: ['_ml/calendars/{calendar_id}/events/{event_id}'],
            id: 'ml.delete_calendar_event',
          },
          'ml.delete_calendar_job': {
            methods: ['DELETE'],
            patterns: ['_ml/calendars/{calendar_id}/jobs/{job_id}'],
            id: 'ml.delete_calendar_job',
          },
          'ml.delete_calendar': {
            methods: ['DELETE'],
            patterns: ['_ml/calendars/{calendar_id}'],
            id: 'ml.delete_calendar',
          },
          'ml.delete_data_frame_analytics': {
            url_params: { force: '__flag__' },
            methods: ['DELETE'],
            patterns: ['_ml/data_frame/analytics/{id}'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/delete-dfanalytics.html',
            id: 'ml.delete_data_frame_analytics',
          },
          'ml.delete_datafeed': {
            url_params: { force: '__flag__' },
            methods: ['DELETE'],
            patterns: ['_ml/datafeeds/{datafeed_id}'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-delete-datafeed.html',
            id: 'ml.delete_datafeed',
          },
          'ml.delete_expired_data': {
            methods: ['DELETE'],
            patterns: ['_ml/_delete_expired_data'],
            id: 'ml.delete_expired_data',
          },
          'ml.delete_filter': {
            methods: ['DELETE'],
            patterns: ['_ml/filters/{filter_id}'],
            id: 'ml.delete_filter',
          },
          'ml.delete_forecast': {
            url_params: { allow_no_forecasts: '__flag__', timeout: '' },
            methods: ['DELETE'],
            patterns: [
              '_ml/anomaly_detectors/{job_id}/_forecast',
              '_ml/anomaly_detectors/{job_id}/_forecast/{forecast_id}',
            ],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-delete-forecast.html',
            id: 'ml.delete_forecast',
          },
          'ml.delete_job': {
            url_params: { force: '__flag__', wait_for_completion: '__flag__' },
            methods: ['DELETE'],
            patterns: ['_ml/anomaly_detectors/{job_id}'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-delete-job.html',
            id: 'ml.delete_job',
          },
          'ml.delete_model_snapshot': {
            methods: ['DELETE'],
            patterns: ['_ml/anomaly_detectors/{job_id}/model_snapshots/{snapshot_id}'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-delete-snapshot.html',
            id: 'ml.delete_model_snapshot',
          },
          'ml.delete_trained_model': {
            methods: ['DELETE'],
            patterns: ['_ml/inference/{model_id}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/delete-inference.html',
            id: 'ml.delete_trained_model',
          },
          'ml.estimate_memory_usage': {
            methods: ['POST'],
            patterns: ['_ml/data_frame/analytics/_estimate_memory_usage'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/estimate-memory-usage-dfanalytics.html',
            data_autocomplete_rules: {
              data_frame_analytics_config: {
                source: { index: { __one_of: ['SOURCE_INDEX_NAME', []] }, query: {} },
                dest: { index: '', results_field: '' },
                analysis: {
                  outlier_detection: {
                    n_neighbors: 1,
                    method: { __one_of: ['lof', 'ldof', 'distance_knn_nn', 'distance_knn'] },
                    feature_influence_threshold: 1,
                  },
                },
                analyzed_fields: {
                  __one_of: [
                    'FIELD_NAME',
                    [],
                    {
                      includes: { __one_of: ['FIELD_NAME', []] },
                      excludes: { __one_of: ['FIELD_NAME', []] },
                    },
                  ],
                },
                model_memory_limit: '',
              },
            },
            id: 'ml.estimate_memory_usage',
          },
          'ml.evaluate_data_frame': {
            methods: ['POST'],
            patterns: ['_ml/data_frame/_evaluate'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/evaluate-dfanalytics.html',
            data_autocomplete_rules: {
              evaluation: {
                actual_field: 'FIELD_NAME',
                predicted_probability_field: 'FIELD_NAME',
                metrics: {
                  auc_roc: { include_curve: true },
                  precision: { at: [] },
                  recall: { at: [] },
                  confusion_matrix: { at: [] },
                },
              },
            },
            id: 'ml.evaluate_data_frame',
          },
          'ml.explain_data_frame_analytics': {
            methods: ['GET', 'POST'],
            patterns: [
              '_ml/data_frame/analytics/_explain',
              '_ml/data_frame/analytics/{id}/_explain',
            ],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/explain-dfanalytics.html',
            data_autocomplete_rules: {
              data_frame_analytics_config: {
                source: { index: { __one_of: ['SOURCE_INDEX_NAME', []] }, query: {} },
                dest: { index: '', results_field: '' },
                analysis: {
                  outlier_detection: {
                    n_neighbors: 1,
                    method: { __one_of: ['lof', 'ldof', 'distance_knn_nn', 'distance_knn'] },
                    feature_influence_threshold: 1,
                  },
                },
                analyzed_fields: {
                  __one_of: [
                    'FIELD_NAME',
                    [],
                    {
                      includes: { __one_of: ['FIELD_NAME', []] },
                      excludes: { __one_of: ['FIELD_NAME', []] },
                    },
                  ],
                },
                model_memory_limit: '',
              },
            },
            id: 'ml.explain_data_frame_analytics',
          },
          'ml.find_file_structure': {
            url_params: {
              lines_to_sample: 0,
              line_merge_size_limit: 0,
              timeout: '',
              charset: '',
              format: ['ndjson', 'xml', 'delimited', 'semi_structured_text'],
              has_header_row: '__flag__',
              column_names: [],
              delimiter: '',
              quote: '',
              should_trim_fields: '__flag__',
              grok_pattern: '',
              timestamp_field: '',
              timestamp_format: '',
              explain: '__flag__',
            },
            methods: ['POST'],
            patterns: ['_ml/find_file_structure'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-find-file-structure.html',
            id: 'ml.find_file_structure',
          },
          'ml.flush_job': {
            url_params: {
              calc_interim: '__flag__',
              start: '',
              end: '',
              advance_time: '',
              skip_time: '',
            },
            methods: ['POST'],
            patterns: ['_ml/anomaly_detectors/{job_id}/_flush'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-flush-job.html',
            id: 'ml.flush_job',
          },
          'ml.forecast': {
            url_params: { duration: '', expires_in: '' },
            methods: ['POST'],
            patterns: ['_ml/anomaly_detectors/{job_id}/_forecast'],
            id: 'ml.forecast',
          },
          'ml.get_buckets': {
            url_params: {
              expand: '__flag__',
              exclude_interim: '__flag__',
              from: 0,
              size: 0,
              start: '',
              end: '',
              anomaly_score: 0,
              sort: '',
              desc: '__flag__',
            },
            methods: ['GET', 'POST'],
            patterns: [
              '_ml/anomaly_detectors/{job_id}/results/buckets/{timestamp}',
              '_ml/anomaly_detectors/{job_id}/results/buckets',
            ],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-get-bucket.html',
            data_autocomplete_rules: {
              desc: { __one_of: ['true', 'false'] },
              exclude_interim: { __one_of: ['true', 'false'] },
              expand: { __one_of: ['true', 'false'] },
              anomaly_score: 0,
              end: '',
              page: { from: 0, size: 100 },
              sort: '',
              start: '',
            },
            id: 'ml.get_buckets',
          },
          'ml.get_calendar_events': {
            url_params: { job_id: '', start: '', end: '', from: 0, size: 0 },
            methods: ['GET'],
            patterns: ['_ml/calendars/{calendar_id}/events'],
            data_autocomplete_rules: { from: 0, size: 100 },
            id: 'ml.get_calendar_events',
          },
          'ml.get_calendars': {
            url_params: { from: 0, size: 0 },
            methods: ['GET', 'POST'],
            patterns: ['_ml/calendars', '_ml/calendars/{calendar_id}'],
            data_autocomplete_rules: { from: 0, size: 100 },
            id: 'ml.get_calendars',
          },
          'ml.get_categories': {
            url_params: { from: 0, size: 0 },
            methods: ['GET', 'POST'],
            patterns: [
              '_ml/anomaly_detectors/{job_id}/results/categories/{category_id}',
              '_ml/anomaly_detectors/{job_id}/results/categories/',
            ],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-get-category.html',
            data_autocomplete_rules: {
              page: { __template: { from: 0, size: 100 }, from: 0, size: 100 },
            },
            id: 'ml.get_categories',
          },
          'ml.get_data_frame_analytics_stats': {
            url_params: { allow_no_match: '__flag__', from: 0, size: 0 },
            methods: ['GET'],
            patterns: ['_ml/data_frame/analytics/_stats', '_ml/data_frame/analytics/{id}/_stats'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/get-dfanalytics-stats.html',
            id: 'ml.get_data_frame_analytics_stats',
          },
          'ml.get_data_frame_analytics': {
            url_params: { allow_no_match: '__flag__', from: 0, size: 0 },
            methods: ['GET'],
            patterns: ['_ml/data_frame/analytics/{id}', '_ml/data_frame/analytics'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/get-dfanalytics.html',
            id: 'ml.get_data_frame_analytics',
          },
          'ml.get_datafeed_stats': {
            url_params: { allow_no_datafeeds: '__flag__' },
            methods: ['GET'],
            patterns: ['_ml/datafeeds/{datafeed_id}/_stats', '_ml/datafeeds/_stats'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-get-datafeed-stats.html',
            id: 'ml.get_datafeed_stats',
          },
          'ml.get_datafeeds': {
            url_params: { allow_no_datafeeds: '__flag__' },
            methods: ['GET'],
            patterns: ['_ml/datafeeds/{datafeed_id}', '_ml/datafeeds'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-get-datafeed.html',
            id: 'ml.get_datafeeds',
          },
          'ml.get_filters': {
            url_params: { from: 0, size: 0 },
            methods: ['GET'],
            patterns: ['_ml/filters', '_ml/filters/{filter_id}'],
            id: 'ml.get_filters',
          },
          'ml.get_influencers': {
            url_params: {
              exclude_interim: '__flag__',
              from: 0,
              size: 0,
              start: '',
              end: '',
              influencer_score: 0,
              sort: '',
              desc: '__flag__',
            },
            methods: ['GET', 'POST'],
            patterns: ['_ml/anomaly_detectors/{job_id}/results/influencers'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-get-influencer.html',
            data_autocomplete_rules: {
              desc: { __one_of: ['true', 'false'] },
              exclude_interim: { __one_of: ['true', 'false'] },
              influencer_score: 0,
              end: '',
              page: { from: 0, size: 100 },
              sort: '',
              start: '',
            },
            id: 'ml.get_influencers',
          },
          'ml.get_job_stats': {
            url_params: { allow_no_jobs: '__flag__' },
            methods: ['GET'],
            patterns: ['_ml/anomaly_detectors/_stats', '_ml/anomaly_detectors/{job_id}/_stats'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-get-job-stats.html',
            id: 'ml.get_job_stats',
          },
          'ml.get_jobs': {
            url_params: { allow_no_jobs: '__flag__' },
            methods: ['GET'],
            patterns: ['_ml/anomaly_detectors/{job_id}', '_ml/anomaly_detectors'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-get-job.html',
            id: 'ml.get_jobs',
          },
          'ml.get_model_snapshots': {
            url_params: { from: 0, size: 0, start: '', end: '', sort: '', desc: '__flag__' },
            methods: ['GET', 'POST'],
            patterns: [
              '_ml/anomaly_detectors/{job_id}/model_snapshots/{snapshot_id}',
              '_ml/anomaly_detectors/{job_id}/model_snapshots',
            ],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-get-snapshot.html',
            data_autocomplete_rules: {
              desc: [true, false],
              end: '',
              from: 0,
              size: 1000,
              sort: '',
              start: '',
            },
            id: 'ml.get_model_snapshots',
          },
          'ml.get_overall_buckets': {
            url_params: {
              top_n: 0,
              bucket_span: '',
              overall_score: 0,
              exclude_interim: '__flag__',
              start: '',
              end: '',
              allow_no_jobs: '__flag__',
            },
            methods: ['GET', 'POST'],
            patterns: ['_ml/anomaly_detectors/{job_id}/results/overall_buckets'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-get-overall-buckets.html',
            data_autocomplete_rules: {
              allow_no_jobs: { __one_of: ['true', 'false'] },
              bucket_span: '',
              end: '',
              exclude_interim: { __one_of: ['true', 'false'] },
              overall_score: 0,
              start: '',
              top_n: 0,
            },
            id: 'ml.get_overall_buckets',
          },
          'ml.get_records': {
            url_params: {
              exclude_interim: '__flag__',
              from: 0,
              size: 0,
              start: '',
              end: '',
              record_score: 0,
              sort: '',
              desc: '__flag__',
            },
            methods: ['GET', 'POST'],
            patterns: ['_ml/anomaly_detectors/{job_id}/results/records'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-get-record.html',
            data_autocomplete_rules: {
              desc: { __one_of: ['true', 'false'] },
              exclude_interim: { __one_of: ['true', 'false'] },
              record_score: 0,
              end: '',
              page: { from: 0, size: 100 },
              sort: '',
              start: '',
            },
            id: 'ml.get_records',
          },
          'ml.get_trained_models_stats': {
            url_params: { allow_no_match: '__flag__', from: 0, size: 0 },
            methods: ['GET'],
            patterns: ['_ml/inference/{model_id}/_stats', '_ml/inference/_stats'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/get-inference-stats.html',
            id: 'ml.get_trained_models_stats',
          },
          'ml.get_trained_models': {
            url_params: {
              allow_no_match: '__flag__',
              include_model_definition: '__flag__',
              decompress_definition: '__flag__',
              from: 0,
              size: 0,
            },
            methods: ['GET'],
            patterns: ['_ml/inference/{model_id}', '_ml/inference'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/get-inference.html',
            id: 'ml.get_trained_models',
          },
          'ml.info': { methods: ['GET'], patterns: ['_ml/info'], id: 'ml.info' },
          'ml.open_job': {
            methods: ['POST'],
            patterns: ['_ml/anomaly_detectors/{job_id}/_open'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-open-job.html',
            id: 'ml.open_job',
          },
          'ml.post_calendar_events': {
            methods: ['POST'],
            patterns: ['_ml/calendars/{calendar_id}/events'],
            data_autocomplete_rules: { events: [{}] },
            id: 'ml.post_calendar_events',
          },
          'ml.post_data': {
            url_params: { reset_start: '', reset_end: '' },
            methods: ['POST'],
            patterns: ['_ml/anomaly_detectors/{job_id}/_data'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-post-data.html',
            id: 'ml.post_data',
          },
          'ml.preview_datafeed': {
            methods: ['GET'],
            patterns: ['_ml/datafeeds/{datafeed_id}/_preview'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-preview-datafeed.html',
            id: 'ml.preview_datafeed',
          },
          'ml.put_calendar_job': {
            methods: ['PUT'],
            patterns: ['_ml/calendars/{calendar_id}/jobs/{job_id}'],
            id: 'ml.put_calendar_job',
          },
          'ml.put_calendar': {
            methods: ['PUT'],
            patterns: ['_ml/calendars/{calendar_id}'],
            data_autocomplete_rules: { description: '' },
            id: 'ml.put_calendar',
          },
          'ml.put_data_frame_analytics': {
            methods: ['PUT'],
            patterns: ['_ml/data_frame/analytics/{id}'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/put-dfanalytics.html',
            data_autocomplete_rules: {
              source: { index: { __one_of: ['SOURCE_INDEX_NAME', []] }, query: {} },
              dest: { index: '', results_field: '' },
              analysis: {
                __one_of: [
                  {
                    outlier_detection: {
                      __template: { n_neighbors: '' },
                      n_neighbors: 1,
                      method: { __one_of: ['lof', 'ldof', 'distance_knn_nn', 'distance_knn'] },
                      feature_influence_threshold: 1,
                    },
                  },
                  {
                    regression: {
                      __template: { dependent_variable: '' },
                      dependent_variable: '',
                      lambda: 1,
                      gamma: 1,
                      eta: 1,
                      maximum_number_trees: 1,
                      feature_bag_fraction: 1,
                      prediction_field_name: '',
                      training_percent: 1,
                    },
                  },
                ],
              },
              analyzed_fields: {
                __one_of: [
                  'FIELD_NAME',
                  [],
                  {
                    includes: { __one_of: ['FIELD_NAME', []] },
                    excludes: { __one_of: ['FIELD_NAME', []] },
                  },
                ],
              },
              description: '',
              model_memory_limit: '',
            },
            id: 'ml.put_data_frame_analytics',
          },
          'ml.put_datafeed': {
            methods: ['PUT'],
            patterns: ['_ml/datafeeds/{datafeed_id}'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-put-datafeed.html',
            data_autocomplete_rules: {
              aggregations: {},
              chunking_config: {},
              frequency: '',
              indices: ['INDEX'],
              job_id: '',
              query: {},
              query_delay: '',
              script_field: {},
              scroll_size: 1000,
              types: [],
            },
            id: 'ml.put_datafeed',
          },
          'ml.put_filter': {
            methods: ['PUT'],
            patterns: ['_ml/filters/{filter_id}'],
            id: 'ml.put_filter',
          },
          'ml.put_job': {
            methods: ['PUT'],
            patterns: ['_ml/anomaly_detectors/{job_id}'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-put-job.html',
            data_autocomplete_rules: {
              analysis_config: {},
              background_persist_interval: '',
              custom_settings: {},
              data_description: {},
              description: '',
              groups: [''],
              model_plot_config: {},
              model_snapshot_retention_days: 1,
              renormalization_window_days: 1,
              results_index_name: '',
              results_retention_days: 1,
            },
            id: 'ml.put_job',
          },
          'ml.put_trained_model': {
            methods: ['PUT'],
            patterns: ['_ml/inference/{model_id}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/ml-df-analytics-apis.html',
            id: 'ml.put_trained_model',
          },
          'ml.revert_model_snapshot': {
            url_params: { delete_intervening_results: '__flag__' },
            methods: ['POST'],
            patterns: ['_ml/anomaly_detectors/{job_id}/model_snapshots/{snapshot_id}/_revert'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-revert-snapshot.html',
            data_autocomplete_rules: {
              delete_intervening_results: { __one_of: ['true', 'false'] },
            },
            id: 'ml.revert_model_snapshot',
          },
          'ml.set_upgrade_mode': {
            url_params: { enabled: '__flag__', timeout: '' },
            methods: ['POST'],
            patterns: ['_ml/set_upgrade_mode'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-set-upgrade-mode.html',
            id: 'ml.set_upgrade_mode',
          },
          'ml.start_data_frame_analytics': {
            url_params: { timeout: '' },
            methods: ['POST'],
            patterns: ['_ml/data_frame/analytics/{id}/_start'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/start-dfanalytics.html',
            id: 'ml.start_data_frame_analytics',
          },
          'ml.start_datafeed': {
            url_params: { start: '', end: '', timeout: '' },
            methods: ['POST'],
            patterns: ['_ml/datafeeds/{datafeed_id}/_start'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-start-datafeed.html',
            id: 'ml.start_datafeed',
          },
          'ml.stop_data_frame_analytics': {
            url_params: { allow_no_match: '__flag__', force: '__flag__', timeout: '' },
            methods: ['POST'],
            patterns: ['_ml/data_frame/analytics/{id}/_stop'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/stop-dfanalytics.html',
            id: 'ml.stop_data_frame_analytics',
          },
          'ml.stop_datafeed': {
            url_params: { allow_no_datafeeds: '__flag__', force: '__flag__', timeout: '' },
            methods: ['POST'],
            patterns: ['_ml/datafeeds/{datafeed_id}/_stop'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-stop-datafeed.html',
            id: 'ml.stop_datafeed',
          },
          'ml.update_datafeed': {
            methods: ['POST'],
            patterns: ['_ml/datafeeds/{datafeed_id}/_update'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-update-datafeed.html',
            data_autocomplete_rules: {
              aggregations: {},
              chunking_config: {},
              frequency: '',
              indices: [''],
              job_id: '',
              query: {},
              query_delay: '',
              script_field: {},
              scroll_size: 1000,
              types: [],
            },
            id: 'ml.update_datafeed',
          },
          'ml.update_filter': {
            methods: ['POST'],
            patterns: ['_ml/filters/{filter_id}/_update'],
            id: 'ml.update_filter',
          },
          'ml.update_job': {
            methods: ['POST'],
            patterns: ['_ml/anomaly_detectors/{job_id}/_update'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-update-job.html',
            data_autocomplete_rules: {
              analysis_limits: {},
              background_persist_interval: '',
              custom_settings: {},
              description: '',
              groups: [''],
              model_plot_config: {},
              model_snapshot_retention_days: 1,
              renormalization_window_days: 1,
              results_index_name: '',
              results_retention_days: 1,
            },
            id: 'ml.update_job',
          },
          'ml.update_model_snapshot': {
            methods: ['POST'],
            patterns: ['_ml/anomaly_detectors/{job_id}/model_snapshots/{snapshot_id}/_update'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-update-snapshot.html',
            data_autocomplete_rules: { description: '', retain: [true, false] },
            id: 'ml.update_model_snapshot',
          },
          'ml.upgrade': {
            url_params: { wait_for_completion: '__flag__' },
            methods: ['POST'],
            patterns: ['_ml/_upgrade'],
            documentation: 'TODO',
            id: 'ml.upgrade',
          },
          'ml.validate_detector': {
            methods: ['POST'],
            patterns: ['_ml/anomaly_detectors/_validate/detector'],
            id: 'ml.validate_detector',
          },
          'ml.validate': {
            methods: ['POST'],
            patterns: ['_ml/anomaly_detectors/_validate'],
            id: 'ml.validate',
          },
          'monitoring.bulk': {
            url_params: { system_id: '', system_api_version: '', interval: '' },
            methods: ['POST', 'PUT'],
            patterns: ['_monitoring/bulk'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/es-monitoring.html',
            id: 'monitoring.bulk',
          },
          'rollup.delete_job': {
            methods: ['DELETE'],
            patterns: ['_rollup/job/{id}'],
            id: 'rollup.delete_job',
          },
          'rollup.get_jobs': {
            methods: ['GET'],
            patterns: ['_rollup/job/{id}', '_rollup/job/'],
            id: 'rollup.get_jobs',
          },
          'rollup.get_rollup_caps': {
            methods: ['GET'],
            patterns: ['_rollup/data/{id}', '_rollup/data/'],
            id: 'rollup.get_rollup_caps',
          },
          'rollup.get_rollup_index_caps': {
            methods: ['GET'],
            patterns: ['{indices}/_rollup/data'],
            url_params: {
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            id: 'rollup.get_rollup_index_caps',
          },
          'rollup.put_job': {
            methods: ['PUT'],
            patterns: ['_rollup/job/{id}'],
            id: 'rollup.put_job',
          },
          'rollup.rollup_search': {
            url_params: {
              typed_keys: '__flag__',
              rest_total_hits_as_int: '__flag__',
              ignore_unavailable: '__flag__',
              allow_no_indices: '__flag__',
              expand_wildcards: ['open', 'closed'],
            },
            methods: ['GET', 'POST'],
            patterns: ['{indices}/_rollup_search'],
            id: 'rollup.rollup_search',
          },
          'rollup.start_job': {
            methods: ['POST'],
            patterns: ['_rollup/job/{id}/_start'],
            id: 'rollup.start_job',
          },
          'rollup.stop_job': {
            url_params: { wait_for_completion: '__flag__', timeout: '' },
            methods: ['POST'],
            patterns: ['_rollup/job/{id}/_stop'],
            id: 'rollup.stop_job',
          },
          'security.authenticate': {
            methods: ['GET'],
            patterns: ['_security/_authenticate'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-authenticate.html',
            data_autocomplete_rules: { password: '' },
            id: 'security.authenticate',
          },
          'security.change_password': {
            url_params: { refresh: ['true', 'false', 'wait_for'] },
            methods: ['PUT', 'POST'],
            patterns: ['_security/user/{username}/_password', '_security/user/_password'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-change-password.html',
            data_autocomplete_rules: { password: '' },
            id: 'security.change_password',
          },
          'security.clear_cached_realms': {
            url_params: { usernames: [] },
            methods: ['POST'],
            patterns: ['_security/realm/{realms}/_clear_cache'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-clear-cache.html',
            id: 'security.clear_cached_realms',
          },
          'security.clear_cached_roles': {
            methods: ['POST'],
            patterns: ['_security/role/{name}/_clear_cache'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-clear-role-cache.html',
            id: 'security.clear_cached_roles',
          },
          'security.create_api_key': {
            url_params: { refresh: ['true', 'false', 'wait_for'] },
            methods: ['PUT', 'POST'],
            patterns: ['_security/api_key'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-create-api-key.html',
            data_autocomplete_rules: {
              name: '',
              expiration: '',
              role_descriptors: {
                role_name: {
                  cluster: [],
                  indices: [{ field_security: {}, names: [], privileges: [], query: '' }],
                  run_as: [],
                  metadata: {},
                },
              },
            },
            id: 'security.create_api_key',
          },
          'security.delete_privileges': {
            url_params: { refresh: ['true', 'false', 'wait_for'] },
            methods: ['DELETE'],
            patterns: ['_security/privilege/{application}/{name}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-delete-privilege.html',
            id: 'security.delete_privileges',
          },
          'security.delete_role_mapping': {
            url_params: { refresh: ['true', 'false', 'wait_for'] },
            methods: ['DELETE'],
            patterns: ['_security/role_mapping/{name}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-delete-role-mapping.html',
            id: 'security.delete_role_mapping',
          },
          'security.delete_role': {
            url_params: { refresh: ['true', 'false', 'wait_for'] },
            methods: ['DELETE'],
            patterns: ['_security/role/{name}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-delete-role.html',
            id: 'security.delete_role',
          },
          'security.delete_user': {
            url_params: { refresh: ['true', 'false', 'wait_for'] },
            methods: ['DELETE'],
            patterns: ['_security/user/{username}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-delete-user.html',
            id: 'security.delete_user',
          },
          'security.disable_user': {
            url_params: { refresh: ['true', 'false', 'wait_for'] },
            methods: ['PUT', 'POST'],
            patterns: ['_security/user/{username}/_disable'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-disable-user.html',
            id: 'security.disable_user',
          },
          'security.enable_user': {
            url_params: { refresh: ['true', 'false', 'wait_for'] },
            methods: ['PUT', 'POST'],
            patterns: ['_security/user/{username}/_enable'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-enable-user.html',
            id: 'security.enable_user',
          },
          'security.get_api_key': {
            url_params: { id: '', name: '', username: '', realm_name: '', owner: '__flag__' },
            methods: ['GET'],
            patterns: ['_security/api_key'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-get-api-key.html',
            id: 'security.get_api_key',
          },
          'security.get_builtin_privileges': {
            methods: ['GET'],
            patterns: ['_security/privilege/_builtin'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-get-builtin-privileges.html',
            id: 'security.get_builtin_privileges',
          },
          'security.get_privileges': {
            methods: ['GET'],
            patterns: [
              '_security/privilege',
              '_security/privilege/{application}',
              '_security/privilege/{application}/{name}',
            ],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-get-privileges.html',
            id: 'security.get_privileges',
          },
          'security.get_role_mapping': {
            methods: ['GET'],
            patterns: ['_security/role_mapping/{name}', '_security/role_mapping'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-get-role-mapping.html',
            id: 'security.get_role_mapping',
          },
          'security.get_role': {
            methods: ['GET'],
            patterns: ['_security/role/{name}', '_security/role'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-get-role.html',
            id: 'security.get_role',
          },
          'security.get_token': {
            methods: ['POST'],
            patterns: ['_security/oauth2/token'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-get-token.html',
            data_autocomplete_rules: { grant_type: '', password: '', scope: '', username: '' },
            id: 'security.get_token',
          },
          'security.get_user_privileges': {
            methods: ['GET'],
            patterns: ['_security/user/_privileges'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-get-privileges.html',
            id: 'security.get_user_privileges',
          },
          'security.get_user': {
            methods: ['GET'],
            patterns: ['_security/user/{username}', '_security/user'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-get-user.html',
            id: 'security.get_user',
          },
          'security.has_privileges': {
            methods: ['GET', 'POST'],
            patterns: ['_security/user/_has_privileges', '_security/user/{user}/_has_privileges'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-has-privileges.html',
            data_autocomplete_rules: {
              cluster: [],
              index: { __template: { names: [], privileges: [] }, names: [], privileges: [] },
              application: {
                __template: { application: [], privileges: [], resources: [] },
                application: [],
                privileges: [],
                resources: [],
              },
            },
            id: 'security.has_privileges',
          },
          'security.invalidate_api_key': {
            methods: ['DELETE'],
            patterns: ['_security/api_key'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-invalidate-api-key.html',
            data_autocomplete_rules: { id: '', name: '', realm_name: '', username: '' },
            id: 'security.invalidate_api_key',
          },
          'security.invalidate_token': {
            methods: ['DELETE'],
            patterns: ['_security/oauth2/token'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-invalidate-token.html',
            data_autocomplete_rules: { token: '' },
            id: 'security.invalidate_token',
          },
          'security.put_privileges': {
            url_params: { refresh: ['true', 'false', 'wait_for'] },
            methods: ['PUT', 'POST'],
            patterns: ['_security/privilege/'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-put-privileges.html',
            id: 'security.put_privileges',
          },
          'security.put_role_mapping': {
            url_params: { refresh: ['true', 'false', 'wait_for'] },
            methods: ['PUT', 'POST'],
            patterns: ['_security/role_mapping/{name}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-put-role-mapping.html',
            data_autocomplete_rules: { enabled: true, metadata: {}, roles: [], rules: {} },
            id: 'security.put_role_mapping',
          },
          'security.put_role': {
            url_params: { refresh: ['true', 'false', 'wait_for'] },
            methods: ['PUT', 'POST'],
            patterns: ['_security/role/{name}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-put-role.html',
            data_autocomplete_rules: {
              cluster: [],
              indices: [{ field_security: {}, names: [], privileges: [], query: '' }],
              run_as: [],
              metadata: {},
            },
            id: 'security.put_role',
          },
          'security.put_user': {
            url_params: { refresh: ['true', 'false', 'wait_for'] },
            methods: ['PUT', 'POST'],
            patterns: ['_security/user/{username}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-put-user.html',
            data_autocomplete_rules: { metadata: {}, password: '', full_name: '', roles: [] },
            id: 'security.put_user',
          },
          'slm.delete_lifecycle': {
            methods: ['DELETE'],
            patterns: ['_slm/policy/{policy_id}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/slm-api-delete.html',
            id: 'slm.delete_lifecycle',
          },
          'slm.execute_lifecycle': {
            methods: ['PUT'],
            patterns: ['_slm/policy/{policy_id}/_execute'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/slm-api-execute.html',
            id: 'slm.execute_lifecycle',
          },
          'slm.execute_retention': {
            methods: ['POST'],
            patterns: ['_slm/_execute_retention'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/slm-api-execute-retention.html',
            id: 'slm.execute_retention',
          },
          'slm.get_lifecycle': {
            methods: ['GET'],
            patterns: ['_slm/policy/{policy_id}', '_slm/policy'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/slm-api-get.html',
            id: 'slm.get_lifecycle',
          },
          'slm.get_stats': {
            methods: ['GET'],
            patterns: ['_slm/stats'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/master/slm-get-stats.html',
            id: 'slm.get_stats',
          },
          'slm.get_status': {
            methods: ['GET'],
            patterns: ['_slm/status'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/slm-get-status.html',
            id: 'slm.get_status',
          },
          'slm.put_lifecycle': {
            methods: ['PUT'],
            patterns: ['_slm/policy/{policy_id}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/slm-api-put.html',
            data_autocomplete_rules: { schedule: '', name: '', repository: '', config: {} },
            id: 'slm.put_lifecycle',
          },
          'slm.start': {
            methods: ['POST'],
            patterns: ['_slm/start'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/slm-start.html',
            url_params: { timeout: '', master_timeout: '' },
            id: 'slm.start',
          },
          'slm.stop': {
            methods: ['POST'],
            patterns: ['_slm/stop'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/slm-stop.html',
            url_params: { timeout: '', master_timeout: '' },
            id: 'slm.stop',
          },
          'sql.clear_cursor': {
            methods: ['POST'],
            patterns: ['_sql/close'],
            documentation: 'Clear SQL cursor',
            id: 'sql.clear_cursor',
          },
          'sql.query': {
            url_params: { format: ['csv', 'json', 'tsv', 'txt', 'yaml', 'cbor', 'smile'] },
            methods: ['POST', 'GET'],
            patterns: ['_sql'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/sql-rest-overview.html',
            data_autocomplete_rules: {
              query: { __template: { __raw: true, value: '"""\nSELECT * FROM "TABLE"\n"""' } },
            },
            template:
              '_sql?format=json\n{\n  "query": """\n  SELECT * FROM "${1:TABLE}"\n  """\n}\n',
            id: 'sql.query',
          },
          'sql.translate': {
            methods: ['POST', 'GET'],
            patterns: ['_sql/translate'],
            documentation: 'Translate SQL into Elasticsearch queries',
            id: 'sql.translate',
          },
          'ssl.certificates': {
            methods: ['GET'],
            patterns: ['_ssl/certificates'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-ssl.html',
            id: 'ssl.certificates',
          },
          'transform.delete_transform': {
            url_params: { force: '__flag__' },
            methods: ['DELETE'],
            patterns: ['_transform/{transform_id}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/delete-transform.html',
            id: 'transform.delete_transform',
          },
          'transform.get_transform_stats': {
            url_params: { from: '', size: '', allow_no_match: '__flag__' },
            methods: ['GET'],
            patterns: ['_transform/_stats', '_transform/{transform_id}/_stats'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/get-transform-stats.html',
            id: 'transform.get_transform_stats',
          },
          'transform.get_transform': {
            url_params: { from: 0, size: 0, allow_no_match: '__flag__' },
            methods: ['GET'],
            patterns: ['_transform/{transform_id}', '_transform'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/get-transform.html',
            id: 'transform.get_transform',
          },
          'transform.preview_transform': {
            methods: ['POST'],
            patterns: ['_transform/_preview'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/preview-transform.html',
            data_autocomplete_rules: {
              source: {
                __template: { index: 'SOURCE_INDEX_NAME' },
                index: '',
                query: { __scope_link: 'GLOBAL.query' },
              },
              pivot: {
                group_by: { __template: { NAME: {} }, __scope_link: 'GLOBAL.groupByAggs' },
                aggregations: { __template: { NAME: {} }, __scope_link: 'GLOBAL.aggregations' },
              },
            },
            id: 'transform.preview_transform',
          },
          'transform.put_transform': {
            url_params: { defer_validation: '__flag__' },
            methods: ['PUT'],
            patterns: ['_transform/{transform_id}'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/put-transform.html',
            data_autocomplete_rules: {
              description: '',
              dest: {
                __template: { index: 'DESTINATION_INDEX_NAME' },
                index: 'DESTINATION_INDEX_NAME',
                pipeline: '',
              },
              frequency: '1m',
              pivot: {
                group_by: { __template: { NAME: {} }, __scope_link: 'GLOBAL.groupByAggs' },
                aggregations: { __template: { NAME: {} }, __scope_link: 'GLOBAL.aggregations' },
              },
              source: {
                __template: { index: 'SOURCE_INDEX_NAME' },
                index: 'SOURCE_INDEX_NAME',
                query: { __scope_link: 'GLOBAL.query' },
              },
              sync: { __template: { time: { field: '' } }, time: { field: '', delay: '60s' } },
            },
            id: 'transform.put_transform',
          },
          'transform.start_transform': {
            url_params: { timeout: '' },
            methods: ['POST'],
            patterns: ['_transform/{transform_id}/_start'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/start-transform.html',
            id: 'transform.start_transform',
          },
          'transform.stop_transform': {
            url_params: {
              force: '__flag__',
              wait_for_completion: '__flag__',
              timeout: '',
              allow_no_match: '__flag__',
              wait_for_checkpoint: '__flag__',
            },
            methods: ['POST'],
            patterns: ['_transform/_all/_stop'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/stop-transform.html',
            id: 'transform.stop_transform',
          },
          'transform.update_transform': {
            url_params: { defer_validation: '__flag__' },
            methods: ['POST'],
            patterns: ['_transform/{transform_id}/_update'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/update-transform.html',
            data_autocomplete_rules: {
              description: '',
              dest: { __template: { index: '' }, index: '', pipeline: '' },
              frequency: '1m',
              source: {
                __template: { index: '' },
                index: '',
                query: { __scope_link: 'GLOBAL.query' },
              },
              sync: { __template: { time: { field: '' } }, time: { field: '', delay: '60s' } },
            },
            id: 'transform.update_transform',
          },
          'watcher.ack_watch': {
            methods: ['PUT', 'POST'],
            patterns: [
              '_watcher/watch/{watch_id}/_ack',
              '_watcher/watch/{watch_id}/_ack/{action_id}',
            ],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/watcher-api-ack-watch.html',
            id: 'watcher.ack_watch',
          },
          'watcher.activate_watch': {
            methods: ['PUT', 'POST'],
            patterns: ['_watcher/watch/{watch_id}/_activate'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/watcher-api-activate-watch.html',
            id: 'watcher.activate_watch',
          },
          'watcher.deactivate_watch': {
            methods: ['PUT', 'POST'],
            patterns: ['_watcher/watch/{watch_id}/_deactivate'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/watcher-api-deactivate-watch.html',
            id: 'watcher.deactivate_watch',
          },
          'watcher.delete_watch': {
            methods: ['DELETE'],
            patterns: ['_watcher/watch/{id}'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/watcher-api-delete-watch.html',
            id: 'watcher.delete_watch',
          },
          'watcher.execute_watch': {
            url_params: { debug: '__flag__' },
            methods: ['PUT', 'POST'],
            patterns: ['_watcher/watch/{id}/_execute', '_watcher/watch/_execute'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/watcher-api-execute-watch.html',
            id: 'watcher.execute_watch',
          },
          'watcher.get_watch': {
            methods: ['GET'],
            patterns: ['_watcher/watch/{id}'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/watcher-api-get-watch.html',
            id: 'watcher.get_watch',
          },
          'watcher.put_watch': {
            url_params: { active: '__flag__', version: '', if_seq_no: '', if_primary_term: '' },
            methods: ['PUT', 'POST'],
            patterns: ['_watcher/watch/{id}'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/watcher-api-put-watch.html',
            id: 'watcher.put_watch',
          },
          'watcher.start': {
            methods: ['POST'],
            patterns: ['_watcher/_start'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/watcher-api-start.html',
            id: 'watcher.start',
          },
          'watcher.stats': {
            url_params: { metric: [], emit_stacktraces: '__flag__' },
            methods: ['GET'],
            patterns: ['_watcher/stats', '_watcher/stats/{metrics}'],
            url_components: {
              metrics: ['_all', 'current_watches', 'pending_watches', 'queued_watches'],
            },
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/watcher-api-stats.html',
            id: 'watcher.stats',
          },
          'watcher.stop': {
            methods: ['POST'],
            patterns: ['_watcher/_stop'],
            documentation:
              'http://www.elastic.co/guide/en/elasticsearch/reference/current/watcher-api-stop.html',
            id: 'watcher.stop',
          },
          'xpack.info': {
            url_params: { categories: ['build', 'license', 'features'], human: '__flag__' },
            methods: ['GET'],
            patterns: ['_xpack'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/info-api.html',
            id: 'xpack.info',
          },
          'xpack.ssl.certificates': {
            methods: ['GET'],
            patterns: ['_xpack/ssl/certificates'],
            documentation:
              'https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-ssl.html',
            id: 'xpack.ssl.certificates',
          },
          'xpack.usage': {
            url_params: { master_timeout: '' },
            methods: ['GET'],
            patterns: ['_xpack/usage'],
            documentation: 'Retrieve information about xpack features usage',
            id: 'xpack.usage',
          },
          _processor: {
            data_autocomplete_rules: {
              __one_of: [
                {
                  append: {
                    __template: { field: '', value: [] },
                    field: '',
                    value: [],
                    on_failure: [],
                    ignore_failure: { __one_of: [false, true] },
                    if: '',
                    tag: '',
                  },
                },
                {
                  bytes: {
                    __template: { field: '' },
                    field: '',
                    target_field: '',
                    ignore_missing: { __one_of: [false, true] },
                    on_failure: [],
                    ignore_failure: { __one_of: [false, true] },
                    if: '',
                    tag: '',
                  },
                },
                {
                  convert: {
                    __template: { field: '', type: '' },
                    field: '',
                    type: { __one_of: ['integer', 'float', 'string', 'boolean', 'auto'] },
                    target_field: '',
                    ignore_missing: { __one_of: [false, true] },
                    on_failure: [],
                    ignore_failure: { __one_of: [false, true] },
                    if: '',
                    tag: '',
                  },
                },
                {
                  date: {
                    __template: { field: '', formats: [] },
                    field: '',
                    target_field: '@timestamp',
                    formats: [],
                    timezone: 'UTC',
                    locale: 'ENGLISH',
                    on_failure: [],
                    ignore_failure: { __one_of: [false, true] },
                    if: '',
                    tag: '',
                  },
                },
                {
                  date_index_name: {
                    __template: { field: '', date_rounding: '' },
                    field: '',
                    date_rounding: { __one_of: ['y', 'M', 'w', 'd', 'h', 'm', 's'] },
                    date_formats: [],
                    timezone: 'UTC',
                    locale: 'ENGLISH',
                    index_name_format: 'yyyy-MM-dd',
                    on_failure: [],
                    ignore_failure: { __one_of: [false, true] },
                    if: '',
                    tag: '',
                  },
                },
                {
                  dissect: {
                    __template: { field: '', pattern: '' },
                    field: '',
                    pattern: '',
                    append_separator: '',
                    ignore_missing: { __one_of: [false, true] },
                    on_failure: [],
                    ignore_failure: { __one_of: [false, true] },
                    if: '',
                    tag: '',
                  },
                },
                {
                  dot_expander: {
                    __template: { field: '' },
                    field: '',
                    path: '',
                    on_failure: [],
                    ignore_failure: { __one_of: [false, true] },
                    if: '',
                    tag: '',
                  },
                },
                {
                  drop: {
                    __template: {},
                    on_failure: [],
                    ignore_failure: { __one_of: [false, true] },
                    if: '',
                    tag: '',
                  },
                },
                {
                  fail: {
                    __template: { message: '' },
                    message: '',
                    on_failure: [],
                    ignore_failure: { __one_of: [false, true] },
                    if: '',
                    tag: '',
                  },
                },
                {
                  foreach: {
                    __template: { field: '', processor: {} },
                    field: '',
                    processor: { __scope_link: '_processor' },
                    on_failure: [],
                    ignore_failure: { __one_of: [false, true] },
                    if: '',
                    tag: '',
                  },
                },
                {
                  grok: {
                    __template: { field: '', patterns: [] },
                    field: '',
                    patterns: [],
                    pattern_definitions: {},
                    trace_match: { __one_of: [false, true] },
                    ignore_missing: { __one_of: [false, true] },
                    on_failure: [],
                    ignore_failure: { __one_of: [false, true] },
                    if: '',
                    tag: '',
                  },
                },
                {
                  gsub: {
                    __template: { field: '', pattern: '', replacement: '' },
                    field: '',
                    pattern: '',
                    replacement: '',
                    on_failure: [],
                    ignore_failure: { __one_of: [false, true] },
                    if: '',
                    tag: '',
                  },
                },
                {
                  join: {
                    __template: { field: '', separator: '' },
                    field: '',
                    separator: '',
                    on_failure: [],
                    ignore_failure: { __one_of: [false, true] },
                    if: '',
                    tag: '',
                  },
                },
                {
                  json: {
                    __template: { field: '' },
                    field: '',
                    target_field: '',
                    add_to_root: { __one_of: [false, true] },
                    on_failure: [],
                    ignore_failure: { __one_of: [false, true] },
                    if: '',
                    tag: '',
                  },
                },
                {
                  kv: {
                    __template: { field: '', field_split: '', value_split: '' },
                    field: '',
                    field_split: '',
                    value_split: '',
                    target_field: '',
                    include_keys: [],
                    ignore_missing: { __one_of: [false, true] },
                    on_failure: [],
                    ignore_failure: { __one_of: [false, true] },
                    if: '',
                    tag: '',
                  },
                },
                {
                  lowercase: {
                    __template: { field: '' },
                    field: '',
                    ignore_missing: { __one_of: [false, true] },
                    on_failure: [],
                    ignore_failure: { __one_of: [false, true] },
                    if: '',
                    tag: '',
                  },
                },
                {
                  pipeline: {
                    __template: { name: '' },
                    name: '',
                    on_failure: [],
                    ignore_failure: { __one_of: [false, true] },
                    if: '',
                    tag: '',
                  },
                },
                {
                  remove: {
                    __template: { field: '' },
                    field: '',
                    on_failure: [],
                    ignore_failure: { __one_of: [false, true] },
                    if: '',
                    tag: '',
                  },
                },
                {
                  rename: {
                    __template: { field: '', target_field: '' },
                    field: '',
                    target_field: '',
                    ignore_missing: { __one_of: [false, true] },
                    on_failure: [],
                    ignore_failure: { __one_of: [false, true] },
                    if: '',
                    tag: '',
                  },
                },
                {
                  script: {
                    __template: {},
                    lang: 'painless',
                    file: '',
                    id: '',
                    source: '',
                    params: {},
                    on_failure: [],
                    ignore_failure: { __one_of: [false, true] },
                    if: '',
                    tag: '',
                  },
                },
                {
                  set: {
                    __template: { field: '', value: '' },
                    field: '',
                    value: '',
                    override: { __one_of: [true, false] },
                    on_failure: [],
                    ignore_failure: { __one_of: [false, true] },
                    if: '',
                    tag: '',
                  },
                },
                {
                  split: {
                    __template: { field: '', separator: '' },
                    field: '',
                    separator: '',
                    ignore_missing: { __one_of: [false, true] },
                    on_failure: [],
                    ignore_failure: { __one_of: [false, true] },
                    if: '',
                    tag: '',
                  },
                },
                {
                  sort: {
                    __template: { field: '' },
                    field: '',
                    order: 'asc',
                    on_failure: [],
                    ignore_failure: { __one_of: [false, true] },
                    if: '',
                    tag: '',
                  },
                },
                {
                  trim: {
                    __template: { field: '' },
                    field: '',
                    ignore_missing: { __one_of: [false, true] },
                    on_failure: [],
                    ignore_failure: { __one_of: [false, true] },
                    if: '',
                    tag: '',
                  },
                },
                {
                  uppercase: {
                    __template: { field: '' },
                    field: '',
                    ignore_missing: { __one_of: [false, true] },
                    on_failure: [],
                    ignore_failure: { __one_of: [false, true] },
                    if: '',
                    tag: '',
                  },
                },
                {
                  enrich: {
                    __template: { policy_name: '', field: '', target_field: '' },
                    policy_name: '',
                    field: '',
                    target_field: '',
                    ignore_missing: { __one_of: [false, true] },
                    override: { __one_of: [true, false] },
                    max_matches: 1,
                    shape_relation: 'INTERSECTS',
                    on_failure: [],
                    ignore_failure: { __one_of: [false, true] },
                    if: '',
                    tag: '',
                  },
                },
                {
                  inference: {
                    __template: { model_id: '', inference_config: {}, field_mappings: {} },
                    target_field: '',
                    model_id: '',
                    field_mappings: { __template: {} },
                    inference_config: {
                      regression: { __template: {}, results_field: '' },
                      classification: {
                        __template: {},
                        results_field: '',
                        num_top_classes: 2,
                        top_classes_results_field: '',
                      },
                    },
                    on_failure: [],
                    ignore_failure: { __one_of: [false, true] },
                    if: '',
                    tag: '',
                  },
                },
              ],
            },
            id: '_processor',
            patterns: ['_processor'],
            methods: ['GET'],
          },
          put_mapping: {
            priority: 10,
            data_autocomplete_rules: {
              __template: { properties: { FIELD: {} } },
              _source: { enabled: { __one_of: [true, false] } },
              _all: { enabled: { __one_of: [true, false] } },
              _field_names: { index: { __one_of: [true, false] } },
              _routing: { required: { __one_of: [true, false] } },
              _index: { enabled: { __one_of: [true, false] } },
              _parent: { __template: { type: '' }, type: '{type}' },
              _timestamp: {
                enabled: { __one_of: [true, false] },
                format: 'YYYY-MM-dd',
                default: '',
              },
              dynamic_date_formats: ['yyyy-MM-dd'],
              date_detection: { __one_of: [true, false] },
              numeric_detection: { __one_of: [true, false] },
              properties: {
                '*': {
                  type: {
                    __one_of: [
                      'text',
                      'keyword',
                      'float',
                      'half_float',
                      'scaled_float',
                      'double',
                      'byte',
                      'short',
                      'integer',
                      'long',
                      'date',
                      'boolean',
                      'binary',
                      'object',
                      'nested',
                      'geo_point',
                      'geo_shape',
                    ],
                  },
                  store: { __one_of: [true, false] },
                  index: { __one_of: [true, false] },
                  term_vector: {
                    __one_of: [
                      'no',
                      'yes',
                      'with_offsets',
                      'with_positions',
                      'with_positions_offsets',
                    ],
                  },
                  boost: 1,
                  null_value: '',
                  doc_values: { __one_of: [true, false] },
                  eager_global_ordinals: { __one_of: [true, false] },
                  norms: { __one_of: [true, false] },
                  index_options: { __one_of: ['docs', 'freqs', 'positions'] },
                  analyzer: 'standard',
                  search_analyzer: 'standard',
                  include_in_all: { __one_of: [false, true] },
                  ignore_above: 10,
                  position_increment_gap: 0,
                  precision_step: 4,
                  ignore_malformed: { __one_of: [true, false] },
                  scaling_factor: 100,
                  lat_lon: { __one_of: [true, false] },
                  geohash: { __one_of: [true, false] },
                  geohash_precision: '1m',
                  geohash_prefix: { __one_of: [true, false] },
                  validate: { __one_of: [true, false] },
                  validate_lat: { __one_of: [true, false] },
                  validate_lon: { __one_of: [true, false] },
                  normalize: { __one_of: [true, false] },
                  normalize_lat: { __one_of: [true, false] },
                  normalize_lon: { __one_of: [true, false] },
                  tree: { __one_of: ['geohash', 'quadtree'] },
                  precision: '5km',
                  tree_levels: 12,
                  distance_error_pct: 0.025,
                  orientation: 'ccw',
                  format: {
                    __one_of: [
                      ['basic_date', 'strict_date'],
                      ['basic_date_time', 'strict_date_time'],
                      ['basic_date_time_no_millis', 'strict_date_time_no_millis'],
                      ['basic_ordinal_date', 'strict_ordinal_date'],
                      ['basic_ordinal_date_time', 'strict_ordinal_date_time'],
                      ['basic_ordinal_date_time_no_millis', 'strict_ordinal_date_time_no_millis'],
                      ['basic_time', 'strict_time'],
                      ['basic_time_no_millis', 'strict_time_no_millis'],
                      ['basic_t_time', 'strict_t_time'],
                      ['basic_t_time_no_millis', 'strict_t_time_no_millis'],
                      ['basic_week_date', 'strict_week_date'],
                      ['basic_week_date_time', 'strict_week_date_time'],
                      ['basic_week_date_time_no_millis', 'strict_week_date_time_no_millis'],
                      'date',
                      'date_hour',
                      'date_hour_minute',
                      'date_hour_minute_second',
                      'date_hour_minute_second_fraction',
                      'date_hour_minute_second_millis',
                      'date_optional_time',
                      'date_time',
                      'date_time_no_millis',
                      'hour',
                      'hour_minute',
                      'hour_minute_second',
                      'hour_minute_second_fraction',
                      'hour_minute_second_millis',
                      'ordinal_date',
                      'ordinal_date_time',
                      'ordinal_date_time_no_millis',
                      'time',
                      'time_no_millis',
                      't_time',
                      't_time_no_millis',
                      'week_date',
                      'week_date_time',
                      'weekDateTimeNoMillis',
                      'week_year',
                      'weekyearWeek',
                      'weekyearWeekDay',
                      'year',
                      'year_month',
                      'year_month_day',
                      'epoch_millis',
                      'epoch_second',
                    ],
                  },
                  fielddata: {
                    filter: {
                      regex: '',
                      frequency: { min: 0.001, max: 0.1, min_segment_size: 500 },
                    },
                  },
                  similarity: { __one_of: ['default', 'BM25'] },
                  properties: { __scope_link: 'put_mapping.{type}.properties' },
                  fields: { '*': { __scope_link: 'put_mapping.type.properties.field' } },
                  copy_to: { __one_of: ['{field}', ['{field}']] },
                  include_in_parent: { __one_of: [true, false] },
                  include_in_root: { __one_of: [true, false] },
                },
              },
            },
            id: 'put_mapping',
            patterns: ['put_mapping'],
            methods: ['GET'],
          },
          '_search/template/{id}': {
            data_autocomplete_rules: { template: { __scope_link: 'search' } },
            id: '_search/template/{id}',
            patterns: ['_search/template/{id}'],
            methods: ['GET'],
          },
        },
      },
    };

    setActiveApi(loadApisFromJson(data));
    return;
  }

  ACTIVE_API = api;
}

setActiveApi();

export const _test = {
  loadApisFromJson: loadApisFromJson,
};
