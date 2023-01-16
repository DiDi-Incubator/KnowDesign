/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import { i18n } from '../../../../../../packages/kbn-i18n/src';

import { useAppContext } from '../contexts/app_context';
import { checkForParseErrors } from '../utils';
import { ShardSerialized } from '../types';

interface Args {
  query: string;
  index: string;
}

interface ReturnValue {
  data: ShardSerialized[] | null;
  error?: string;
}
function getCookie(key) {
  const map = {};
  document.cookie.split(';').map((kv) => {
    const d = kv.trim();
    const index = kv.trim().indexOf('=');
    const k = d.substring(0, index);
    const v = d.substring(index + 1);
    map[k] = v;

    return null;
  });
  return map[key];
}

const extractProfilerErrorMessage = (e: any): string | undefined => {
  if (e.body?.attributes?.error?.reason) {
    const { reason, line, col } = e.body.attributes.error;
    if (typeof line === 'number' && typeof col === 'number') {
      return `${reason} at line: ${line - 1} col: ${col}`;
    }
  }

  if (e.body?.message) {
    return e.body.message;
  }

  return;
};

export const useRequestProfile = () => {
  const { http, notifications, getLicenseStatus } = useAppContext();
  const licenseEnabled = getLicenseStatus().valid;
  return async ({ query, index }: Args): Promise<ReturnValue> => {
    if (!licenseEnabled) {
      return { data: null };
    }
    const { error, parsed } = checkForParseErrors(query);
    if (error) {
      notifications({
        type: 'error',
        message: i18n.translate('xpack.searchProfiler.errorToastTitle', {
          defaultMessage: 'JSON parse error',
        }),
        description: error,
      });
      return { data: null };
    }
    // Shortcut the network request if we have json with shards already...
    if (parsed.profile && parsed.profile.shards) {
      return { data: parsed.profile.shards };
    }

    const payload: Record<string, any> = { query: parsed };

    if (index == null || index === '') {
      payload.index = '_all';
    } else {
      payload.index = index;
    }

    const params = {
      profile: true,
      ...payload.query,
    };

    try {
      const resp = await window
        .fetch(`/api/es/gateway/${payload.index}/_search`, {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
            'Content-Type': 'application/json',
            'kbn-xsrf': 'kibana',
            Authorization: `Basic ${getCookie('Authorization') || ''}`,
            'CLUSTER-ID': getCookie('kibanaPhyClusterName') || '',
          },
        })
        .then((res) => res.json());

      if (resp.error) {
        notifications({
          type: 'error',
          message: resp.error.type || '',
          description: resp.error.reason || '',
        });
        return { data: null };
      }

      return { data: resp.profile.shards };
    } catch (e) {
      const profilerErrorMessage = extractProfilerErrorMessage(e);

      if (profilerErrorMessage) {
        notifications({
          type: 'error',
          message: i18n.translate('xpack.searchProfiler.errorSomethingWentWrongTitle', {
            defaultMessage: 'Something went wrong',
          }),
          description: profilerErrorMessage,
        });
      } else {
        // Otherwise just report the original error
        notifications({
          type: 'error',
          message: i18n.translate('xpack.searchProfiler.errorSomethingWentWrongTitle', {
            defaultMessage: 'Something went wrong',
          }),
        });
      }
      return { data: null };
    }
  };
};
