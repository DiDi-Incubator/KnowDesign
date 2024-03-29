/* eslint-disable react/no-string-refs, react/prefer-es6-class */
import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Upload from '..';
import { setup, teardown } from './mock';
import mountTest from '../../../../tests/shared/mountTest';

describe('Upload.Dragger', () => {
  mountTest(Upload.Dragger);

  beforeEach(() => setup());
  afterEach(() => teardown());

  it('support drag file with over style', () => {
    jest.useFakeTimers();
    const wrapper = mount(
      <Upload.Dragger action="http://upload.com">
        <div />
      </Upload.Dragger>,
    );

    wrapper.find('.dcloud-upload-drag-container').simulate('dragover', {
      target: {
        files: [{ file: 'foo.png' }],
      },
    });

    act(() => {
      jest.runAllTimers();
    });
    wrapper.update();

    expect(wrapper.find('.dcloud-upload-drag').hasClass('dcloud-upload-drag-hover')).toBe(true);

    jest.useRealTimers();
  });

  it('support onDrop when files are dropped onto upload area', () => {
    const onDrop = jest.fn();
    const wrapper = mount(
      <Upload.Dragger onDrop={onDrop}>
        <div />
      </Upload.Dragger>,
    );

    wrapper.find('.dcloud-upload-drag-container').simulate('drop', {
      dataTransfer: {
        files: [new File(['foo'], 'foo.png', { type: 'image/png' })],
      },
    });

    expect(onDrop).toHaveBeenCalled();
  });
});
