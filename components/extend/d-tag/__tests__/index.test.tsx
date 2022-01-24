import React from 'react';
import { CodeSandboxOutlined, DownCircleOutlined } from '@ant-design/icons';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import DTag from '../DTag';

describe('DTag', () => {
  it('size渲染正常', () => {
    const { getByTestId } = render(
      <DTag
        size="small"
      >标签样式1</DTag>,
    );
    const element = getByTestId('tag-props');
    expect(element).toHaveClass('dantd-basic-tag-small');
  });
  it('theme渲染正常', () => {
    const { getByTestId } = render(
      <DTag
        theme="success"
      >标签样式1</DTag>,
    );
    const element = getByTestId('tag-props');
    expect(element).toHaveClass('dantd-basic-tag-success');
  });
  it('level渲染正常', () => {
    const { getByTestId } = render(
      <DTag
        level="P0"
      />,
    );
    const element = getByTestId('tag-props');
    expect(element).toHaveClass('dantd-basic-tag-P0');
  });

});
