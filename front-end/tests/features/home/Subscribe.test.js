import React from 'react';
import { shallow } from 'enzyme';
import { Subscribe } from '../../../src/features/home/Subscribe';

describe('home/Subscribe', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Subscribe {...props} />
    );

    expect(
      renderedComponent.find('.home-subscribe').length
    ).toBe(1);
  });
});
