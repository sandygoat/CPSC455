import React from 'react';
import { shallow } from 'enzyme';
import { UserComment } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<UserComment />);
  expect(renderedComponent.find('.home-comment').length).toBe(1);
});
