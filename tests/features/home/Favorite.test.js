import React from 'react';
import { shallow } from 'enzyme';
import { Favorite } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Favorite />);
  expect(renderedComponent.find('.home-favorite').length).toBe(1);
});
