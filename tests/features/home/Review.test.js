import React from 'react';
import { shallow } from 'enzyme';
import { Review } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Review />);
  expect(renderedComponent.find('.home-review').length).toBe(1);
});
