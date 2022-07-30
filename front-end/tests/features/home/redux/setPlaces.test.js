import {
  HOME_SET_PLACES,
} from '../../../../src/features/home/redux/constants';

import {
  setPlaces,
  reducer,
} from '../../../../src/features/home/redux/setPlaces';

describe('home/redux/setPlaces', () => {
  it('returns correct action by setPlaces', () => {
    expect(setPlaces()).toHaveProperty('type', HOME_SET_PLACES);
  });

  it('handles action type HOME_SET_PLACES correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_SET_PLACES }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
