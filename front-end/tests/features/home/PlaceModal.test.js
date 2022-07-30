import React from 'react';
import { shallow } from 'enzyme';
import { PlaceModal } from '../../../src/features/home/PlaceModal';

describe('home/PlaceModal', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PlaceModal {...props} />
    );

    expect(
      renderedComponent.find('.home-place-modal').length
    ).toBe(1);
  });
});
