import React from 'react';
import { shallow } from 'enzyme';
import { HomeLayout } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<HomeLayout />);
  expect(renderedComponent.find('.home-home-layout').length).toBe(1);
});
