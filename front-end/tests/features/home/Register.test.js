import React from 'react';
import { shallow } from 'enzyme';
import { Register } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Register />);
  expect(renderedComponent.find('.home-register').length).toBe(1);
});
