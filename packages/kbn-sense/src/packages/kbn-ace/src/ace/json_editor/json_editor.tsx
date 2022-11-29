import React, { useEffect, useRef } from 'react';

import { createAceEditor } from '../modes/lib/ace';
import _ from 'lodash';

interface Props {
  data: any;
  readOnly?: boolean;
  className?: string;
  setEditorInstance?: any;
  setValid?: any;
  mode?: string;
  options?: any;
  onEditorChange?: any;
}

export const ACEJsonEditor = (props: Props) => {
  const { readOnly, className, data, setEditorInstance, setValid, mode, options, onEditorChange } =
    props;
  let aceEditor = null;
  let aceDiv = useRef();

  useEffect(() => {
    if (!aceEditor) {
      let prettyJson = null;
      let settingsKeys = null;
      if (typeof data === 'string') {
        prettyJson = data;
        try {
          let obj = JSON.parse(data);
          settingsKeys = Object.keys(obj);
        } catch (err) {}
      } else if (typeof data === 'object') {
        prettyJson = JSON.stringify(data, null, 2);
        settingsKeys = Object.keys(data);
      } else {
        prettyJson = data || '';
      }
      const editor = (aceEditor = createAceEditor(
        aceDiv.current,
        data,
        settingsKeys,
        mode,
        options,
        readOnly,
      ));
      setEditorInstance && setEditorInstance(editor);
      const session = editor.getSession();
      session.on('changeAnnotation', () => {
        const isEmptyString = session.getValue() === '';
        onEditorChange && onEditorChange(session.getValue());
        setValid && setValid(!isEmptyString && session.getAnnotations().length === 0);
      });
    } else {
      aceEditor.setValue(data, -1);
    }

    return () => {
      aceEditor && aceEditor.destroy();
    };
  }, [data]);

  return (
    <div className="application">
      <div className={className} data-test-subj="indexJsonEditor" ref={aceDiv} />
    </div>
  );
};
