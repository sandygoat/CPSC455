import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_PLACES_BEGIN,
  HOME_GET_PLACES_SUCCESS,
  HOME_GET_PLACES_FAILURE,
  HOME_GET_PLACES_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getPlaces,
  dismissGetPlacesError,
  reducer,
} from '../../../../src/features/home/redux/getPlaces';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getPlaces', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getPlaces succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getPlaces())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_PLACES_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_PLACES_SUCCESS);
      });
  });

  it('dispatches failure action when getPlaces fails', () => {
    const store = mockStore({});

    return store.dispatch(getPlaces({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_PLACES_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_PLACES_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetPlacesError', () => {
    const expectedAction = {
      type: HOME_GET_PLACES_DISMISS_ERROR,
    };
    expect(dismissGetPlacesError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_PLACES_BEGIN correctly', () => {
    const prevState = { getPlacesPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_PLACES_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getPlacesPending).toBe(true);
  });

  it('handles action type HOME_GET_PLACES_SUCCESS correctly', () => {
    const prevState = { getPlacesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_PLACES_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getPlacesPending).toBe(false);
  });

  it('handles action type HOME_GET_PLACES_FAILURE correctly', () => {
    const prevState = { getPlacesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_PLACES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getPlacesPending).toBe(false);
    expect(state.getPlacesError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_PLACES_DISMISS_ERROR correctly', () => {
    const prevState = { getPlacesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_PLACES_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getPlacesError).toBe(null);
  });
});

