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

import { EuiScreenReaderOnly } from '@elastic/eui';
import { i18n } from '../../../../../../../../packages/kbn-i18n/src';
import React, { useEffect, useRef } from 'react';
import { expandLiteralStrings } from '../../../../../shared_imports';
import {
  useEditorReadContext,
  useRequestReadContext,
  useServicesContext,
} from '../../../../contexts';
import { createReadOnlyAceEditor, CustomAceEditor } from '../../../../models/legacy_core_editor';
import { subscribeResizeChecker } from '../subscribe_console_resize_checker';
import { applyCurrentSettings } from './apply_editor_settings';

function modeForContentType(contentType?: string) {
  if (!contentType) {
    return 'ace/mode/text';
  }
  if (contentType.indexOf('application/json') >= 0) {
    return 'ace/mode/json';
  } else if (contentType.indexOf('application/yaml') >= 0) {
    return 'ace/mode/yaml';
  }
  return 'ace/mode/text';
}

function EditorOutputUI() {
  const editorRef = useRef<null | HTMLDivElement>(null);
  const editorInstanceRef = useRef<null | CustomAceEditor>(null);
  const { services } = useServicesContext();
  const { settings: readOnlySettings } = useEditorReadContext();
  const {
    lastResult: { data, error },
  } = useRequestReadContext();
  const inputId = 'ConAppOutputTextarea';

  useEffect(() => {
    editorInstanceRef.current = createReadOnlyAceEditor(editorRef.current!);
    const unsubscribe = subscribeResizeChecker(editorRef.current!, editorInstanceRef.current);
    const textarea = editorRef.current!.querySelector('textarea')!;
    textarea.setAttribute('id', inputId);
    textarea.setAttribute('readonly', 'true');

    return () => {
      unsubscribe();
      editorInstanceRef.current!.destroy();
    };
  }, []); // 监听services.settings重复创建的问题

  useEffect(() => {
    const editor = editorInstanceRef.current!;
    if (data) {
      const mode = modeForContentType(data[0].response.contentType);
      editor.session.setMode(mode);
      editor.update(
        data
          .map((d) => {
            let value = d.response.value as string;
            if (mode === 'ace/mode/json') {
              try {
                value = JSON.stringify(JSON.parse(value), null, 2);
              } catch (err) {
                // do nothing
              }
            }
            return value;
          })
          .map(readOnlySettings.tripleQuotes ? expandLiteralStrings : (a) => a)
          .join('\n'),
      );
    } else if (error) {
      const mode = modeForContentType(error.response.contentType);
      let value = error.response.value as string;
      if (mode === 'ace/mode/json') {
        try {
          value = JSON.stringify(JSON.parse(value), null, 2);
        } catch (err) {
          // do nothing
        }
      }
      editor.session.setMode(modeForContentType(error.response.contentType));
      editor.update(value);
    } else {
      editor.update('');
    }
  }, [readOnlySettings, data, error]);

  useEffect(() => {
    applyCurrentSettings(editorInstanceRef.current!, readOnlySettings);
  }, [readOnlySettings]);

  return (
    <>
      <EuiScreenReaderOnly>
        <label htmlFor={inputId}>
          {i18n.translate('console.outputTextarea', {
            defaultMessage: 'Dev Tools Console output',
          })}
        </label>
      </EuiScreenReaderOnly>
      <div ref={editorRef} className="conApp__output" data-test-subj="response-editor">
        <div className="conApp__outputContent" id="ConAppOutput" />
      </div>
    </>
  );
}

export const EditorOutput = React.memo(EditorOutputUI);
