import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_ADD_FAVORITE_BEGIN,
  HOME_ADD_FAVORITE_SUCCESS,
  HOME_ADD_FAVORITE_FAILURE,
  HOME_ADD_FAVORITE_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  addFavorite,
  dismissAddFavoriteError,
  reducer,
} from '../../../../src/features/home/redux/addFavorite';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/addFavorite', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when addFavorite succeeds', () => {
    const store = mockStore({});

    return store.dispatch(addFavorite())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_ADD_FAVORITE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_ADD_FAVORITE_SUCCESS);
      });
  });

  it('dispatches failure action when addFavorite fails', () => {
    const store = mockStore({});

    return store.dispatch(addFavorite({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_ADD_FAVORITE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_ADD_FAVORITE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissAddFavoriteError', () => {
    const expectedAction = {
      type: HOME_ADD_FAVORITE_DISMISS_ERROR,
    };
    expect(dismissAddFavoriteError()).toEqual(expectedAction);
  });

  it('handles action type HOME_ADD_FAVORITE_BEGIN correctly', () => {
    const prevState = { addFavoritePending: false };
    const state = reducer(
      prevState,
      { type: HOME_ADD_FAVORITE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addFavoritePending).toBe(true);
  });

  it('handles action type HOME_ADD_FAVORITE_SUCCESS correctly', () => {
    const prevState = { addFavoritePending: true };
    const state = reducer(
      prevState,
      { type: HOME_ADD_FAVORITE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addFavoritePending).toBe(false);
  });

  it('handles action type HOME_ADD_FAVORITE_FAILURE correctly', () => {
    const prevState = { addFavoritePending: true };
    const state = reducer(
      prevState,
      { type: HOME_ADD_FAVORITE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addFavoritePending).toBe(false);
    expect(state.addFavoriteError).toEqual(expect.anything());
  });

  it('handles action type HOME_ADD_FAVORITE_DISMISS_ERROR correctly', () => {
    const prevState = { addFavoriteError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_ADD_FAVORITE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addFavoriteError).toBe(null);
  });
});

