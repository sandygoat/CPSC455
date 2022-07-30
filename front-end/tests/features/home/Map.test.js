import React from 'react';
import { shallow } from 'enzyme';
import { Map } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Map />);
  expect(renderedComponent.find('.home-map').length).toBe(1);
});
