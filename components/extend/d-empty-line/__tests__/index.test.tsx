import React from 'react';
import { create, act } from 'react-test-renderer';
import DEmptyLine from '../DEmptyLine';

test('默认高度渲染正常', () => {
  let dEmptyLine: any;

  act(() => {
    dEmptyLine = create(<DEmptyLine />);
  });

  expect(dEmptyLine.toJSON()?.props.style).toEqual(
    expect.objectContaining({
      height: 20,
    })
  );
});

test('自定义高度渲染正常', () => {
  let dEmptyLine: any;

  act(() => {
    dEmptyLine = create(<DEmptyLine height={30} />);
  });

  expect(dEmptyLine.toJSON()?.props.style).toEqual(
    expect.objectContaining({
      height: 30,
    })
  );
});
