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
      notifications.error({
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

    try {
      const resp = await window.fetch('/console/arius/kibana7/api/searchprofiler/profile', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json', 'kbn-xsrf': 'kibana', },
      }).then((res) => res.json());

      if (!resp.ok) {
        return { data: null, error: resp.err.msg };
      }

      return { data: resp.resp.profile.shards };
    } catch (e) {
      const profilerErrorMessage = extractProfilerErrorMessage(e);

      if (profilerErrorMessage) {
        notifications.error({
          message: i18n.translate('xpack.searchProfiler.errorSomethingWentWrongTitle', {
            defaultMessage: 'Something went wrong',
          }),
          description: profilerErrorMessage,
        });
      } else {
        // Otherwise just report the original error
        notifications.error({
          message: i18n.translate('xpack.searchProfiler.errorSomethingWentWrongTitle', {
            defaultMessage: 'Something went wrong',
          }),
          // description: e,
        });
      }
      return { data: null };
    }
  };
};
