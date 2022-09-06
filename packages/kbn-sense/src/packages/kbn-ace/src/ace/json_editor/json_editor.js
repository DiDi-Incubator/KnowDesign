/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import { I18nProvider, FormattedMessage } from '../../../../kbn-i18n/src/react';
import { i18n } from '../../../../kbn-i18n/src';

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiLink,
  EuiSpacer,
  EuiTextColor,
  EuiTitle,
} from '@elastic/eui';

import { createAceEditor } from '../modes/lib/ace';
import _ from 'lodash';

export class ACEJsonEditor extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      valid: true,
    };
    i18n.load('/zh-CN.json').catch((error) => {
      console.log(error);
    });
  }

  componentDidMount() {
    const { data, readOnly } = this.props;
    if (data && !this.editor) {
      let prettyJson = null;
      let settingsKeys = null;
      if (typeof data === 'string') {
        prettyJson = data;
        try {
          let obj = JSON.parse(data);
          settingsKeys = Object.keys(obj);
        } catch (err) {}
      } else {
        prettyJson = JSON.stringify(data, null, 2);
        settingsKeys = Object.keys(data);
      }
      const editor = (this.editor = createAceEditor(this.aceDiv, data, readOnly, settingsKeys));
      const session = editor.getSession();
      session.on('changeAnnotation', () => {
        const isEmptyString = session.getValue() === '';
        this.setState({ valid: !isEmptyString && session.getAnnotations().length === 0 });
      });
    }
  }
  componentWillUnmount() {
    this.editor && this.editor.destroy();
  }
  commitSettings = () => {
    const { updateIndexSettings, indexName } = this.props;
    const json = this.editor.getValue();
    const settings = JSON.parse(json);
    //don't set if the values have not changed
    Object.keys(this.originalSettings).forEach((key) => {
      if (_.isEqual(this.originalSettings[key], settings[key])) {
        delete settings[key];
      }
    });
    updateIndexSettings({ indexName, settings });
  };
  errorMessage() {
    const { error } = this.props;
    if (!error) {
      return null;
    }
    return (
      <div>
        <EuiSpacer />
        <EuiIcon color="danger" type="alert" />
        <EuiTextColor color="danger">{error}</EuiTextColor>
        <EuiSpacer />
      </div>
    );
  }
  render() {
    const { data, className, readOnly } = this.props;
    if (!data) {
      return null;
    }
    return (
      <I18nProvider>
        <div>
          {readOnly ? null : (
            <>
              <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
                <EuiFlexItem>
                  <EuiTitle>
                    <p>
                      <FormattedMessage
                        id="xpack.idxMgmt.editSettingsJSON.saveJSONDescription"
                        defaultMessage="Edit, then save your JSON"
                      />
                    </p>
                  </EuiTitle>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiButton
                    size="s"
                    fill
                    data-test-subj="updateEditIndexSettingsButton"
                    onClick={this.commitSettings}
                    disabled={!this.state.valid}
                  >
                    <FormattedMessage
                      id="xpack.idxMgmt.editSettingsJSON.saveJSONButtonLabel"
                      defaultMessage="Save"
                    />
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiSpacer />
              <EuiLink href={this.props.referdoc} target="_blank" rel="noopener noreferrer">
                <FormattedMessage
                  id="xpack.idxMgmt.editSettingsJSON.settingsReferenceLinkText"
                  defaultMessage="Settings reference"
                />
              </EuiLink>
              <EuiSpacer />
            </>
          )}
          <div
            className={className}
            data-test-subj="indexJsonEditor"
            ref={(aceDiv) => {
              this.aceDiv = aceDiv;
            }}
          />
          {this.errorMessage()}
          <EuiSpacer />
        </div>
      </I18nProvider>
    );
  }
}
