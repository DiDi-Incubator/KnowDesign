/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React, { useRef, memo, useCallback, useState } from 'react';
import { i18n } from '../../../../../../packages/kbn-i18n/src';
import {
  EuiForm,
  EuiFieldText,
  EuiFormRow,
  EuiButton,
  EuiText,
  EuiFlexGroup,
  EuiSpacer,
  EuiFlexItem,
} from '@elastic/eui';
import { Editor, EditorInstance } from '../editor';
import { useRequestProfile } from '../hooks';
import { useAppContext } from '../contexts/app_context';
import { useProfilerActionContext } from '../contexts/profiler_context';

const DEFAULT_INDEX_VALUE = '_all';

const INITIAL_EDITOR_VALUE = `{
  "query":{
    "match_all" : {}
  }
}`;

/**
 * This component should only need to render once.
 *
 * Drives state changes for mine via profiler action context.
 */
export const ProfileQueryEditor = memo(() => {
  const editorRef = useRef<EditorInstance>(null as any);
  const indexInputRef = useRef<HTMLInputElement>(null as any);
  const indexSelectRef = useRef<HTMLSelectElement>(null as any);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const dispatch = useProfilerActionContext();

  const { getLicenseStatus, notifications, IndexSelect, currentCluster } = useAppContext();
  const requestProfile = useRequestProfile();

  const resetProfile = (value = true) => {
    dispatch({ type: 'setPristine', value });
  };

  const handleProfileClick = async () => {
    dispatch({ type: 'setProfiling', value: true });
    try {
      const { current: editor } = editorRef;
      const { data: result, error } = await requestProfile({
        query: editorRef.current.getValue(),
        index: IndexSelect ? indexSelectRef.current.value : indexInputRef.current.value,
      });
      if (error) {
        notifications({
          type: 'error',
          description: error,
          message: 'error',
        });
        editor.focus();
        return;
      }
      if (result === null) {
        return;
      }
      dispatch({ type: 'setCurrentResponse', value: result });
    } finally {
      dispatch({ type: 'setProfiling', value: false });
    }
  };

  const onEditorReady = useCallback((editorInstance) => (editorRef.current = editorInstance), []);
  const getEditorInstance = () => editorRef.current;
  const licenseEnabled = getLicenseStatus().valid;

  return (
    <EuiFlexGroup
      responsive={false}
      className="prfDevTool__sense"
      gutterSize="none"
      direction="column"
    >
      {/* Form */}
      <EuiFlexItem grow={false}>
        <EuiForm>
          <EuiFlexGroup direction="row" gutterSize="s">
            <EuiFlexItem>
              <EuiFormRow
                // label={i18n.translate('xpack.searchProfiler.formIndexLabel', {
                //   defaultMessage: 'Index',
                // })}
                label={''}
              >
                <>
                  {IndexSelect ? (
                    <IndexSelect
                      getEditorInstance={getEditorInstance}
                      currentCluster={currentCluster}
                      ref={indexSelectRef}
                      setBtnDisabled={(value) => setBtnDisabled(value)}
                      resetProfile={resetProfile}
                    />
                  ) : (
                    <EuiFieldText
                      disabled={!licenseEnabled}
                      inputRef={(ref) => {
                        if (ref) {
                          indexInputRef.current = ref;
                          ref.value = DEFAULT_INDEX_VALUE;
                        }
                      }}
                    />
                  )}
                  <EuiButton
                    data-test-subj="profileButton"
                    fill
                    disabled={!licenseEnabled || btnDisabled}
                    onClick={() => handleProfileClick()}
                  >
                    <EuiText>
                      {i18n.translate('xpack.searchProfiler.formProfileButtonLabel', {
                        defaultMessage: 'Profile',
                      })}
                    </EuiText>
                  </EuiButton>
                </>
              </EuiFormRow>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiForm>
      </EuiFlexItem>

      {/* Editor */}
      <EuiFlexItem grow={10}>
        <Editor
          onEditorReady={onEditorReady}
          licenseEnabled={licenseEnabled}
          initialValue={INITIAL_EDITOR_VALUE}
        />
      </EuiFlexItem>

      {/* Button */}
    </EuiFlexGroup>
  );
});
