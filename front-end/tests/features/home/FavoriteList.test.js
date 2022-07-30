import React from 'react';
import { shallow } from 'enzyme';
import { FavoriteList } from '../../../src/features/home/FavoriteList';

describe('home/FavoriteList', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <FavoriteList {...props} />
    );

    expect(
      renderedComponent.find('.home-favorite-list').length
    ).toBe(1);
  });
});
