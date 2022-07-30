import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_REMOVE_FROM_FAVORITE_LIST_BEGIN,
  HOME_REMOVE_FROM_FAVORITE_LIST_SUCCESS,
  HOME_REMOVE_FROM_FAVORITE_LIST_FAILURE,
  HOME_REMOVE_FROM_FAVORITE_LIST_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  removeFromFavoriteList,
  dismissRemoveFromFavoriteListError,
  reducer,
} from '../../../../src/features/home/redux/removeFromFavoriteList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/removeFromFavoriteList', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when removeFromFavoriteList succeeds', () => {
    const store = mockStore({});

    return store.dispatch(removeFromFavoriteList())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_REMOVE_FROM_FAVORITE_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_REMOVE_FROM_FAVORITE_LIST_SUCCESS);
      });
  });

  it('dispatches failure action when removeFromFavoriteList fails', () => {
    const store = mockStore({});

    return store.dispatch(removeFromFavoriteList({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_REMOVE_FROM_FAVORITE_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_REMOVE_FROM_FAVORITE_LIST_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissRemoveFromFavoriteListError', () => {
    const expectedAction = {
      type: HOME_REMOVE_FROM_FAVORITE_LIST_DISMISS_ERROR,
    };
    expect(dismissRemoveFromFavoriteListError()).toEqual(expectedAction);
  });

  it('handles action type HOME_REMOVE_FROM_FAVORITE_LIST_BEGIN correctly', () => {
    const prevState = { removeFromFavoriteListPending: false };
    const state = reducer(
      prevState,
      { type: HOME_REMOVE_FROM_FAVORITE_LIST_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.removeFromFavoriteListPending).toBe(true);
  });

  it('handles action type HOME_REMOVE_FROM_FAVORITE_LIST_SUCCESS correctly', () => {
    const prevState = { removeFromFavoriteListPending: true };
    const state = reducer(
      prevState,
      { type: HOME_REMOVE_FROM_FAVORITE_LIST_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.removeFromFavoriteListPending).toBe(false);
  });

  it('handles action type HOME_REMOVE_FROM_FAVORITE_LIST_FAILURE correctly', () => {
    const prevState = { removeFromFavoriteListPending: true };
    const state = reducer(
      prevState,
      { type: HOME_REMOVE_FROM_FAVORITE_LIST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.removeFromFavoriteListPending).toBe(false);
    expect(state.removeFromFavoriteListError).toEqual(expect.anything());
  });

  it('handles action type HOME_REMOVE_FROM_FAVORITE_LIST_DISMISS_ERROR correctly', () => {
    const prevState = { removeFromFavoriteListError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_REMOVE_FROM_FAVORITE_LIST_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.removeFromFavoriteListError).toBe(null);
  });
});

