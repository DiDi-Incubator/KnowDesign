import { mount } from 'enzyme';
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Col, Row } from '..';

jest.mock('rc-util/lib/Dom/canUseDom', () => () => false);

describe('Grid.Server', () => {
  it('use compatible gap logic', () => {
    const wrapper = mount(
      <Row gutter={[8, 16]}>
        <Col />
      </Row>,
    );

    expect(wrapper.find('.dcloud-row').props().style).toEqual(
      expect.objectContaining({
        marginLeft: -4,
        marginRight: -4,
        marginTop: -8,
        marginBottom: -8,
      }),
    );

    expect(wrapper.find('.dcloud-col').props().style).toEqual(
      expect.objectContaining({
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 8,
        paddingBottom: 8,
      }),
    );
  });
});
