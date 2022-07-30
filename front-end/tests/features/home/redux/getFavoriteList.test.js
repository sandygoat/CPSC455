import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_FAVORITE_LIST_BEGIN,
  HOME_GET_FAVORITE_LIST_SUCCESS,
  HOME_GET_FAVORITE_LIST_FAILURE,
  HOME_GET_FAVORITE_LIST_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getFavoriteList,
  dismissGetFavoriteListError,
  reducer,
} from '../../../../src/features/home/redux/getFavoriteList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getFavoriteList', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getFavoriteList succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getFavoriteList())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_FAVORITE_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_FAVORITE_LIST_SUCCESS);
      });
  });

  it('dispatches failure action when getFavoriteList fails', () => {
    const store = mockStore({});

    return store.dispatch(getFavoriteList({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_FAVORITE_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_FAVORITE_LIST_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetFavoriteListError', () => {
    const expectedAction = {
      type: HOME_GET_FAVORITE_LIST_DISMISS_ERROR,
    };
    expect(dismissGetFavoriteListError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_FAVORITE_LIST_BEGIN correctly', () => {
    const prevState = { getFavoriteListPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_FAVORITE_LIST_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getFavoriteListPending).toBe(true);
  });

  it('handles action type HOME_GET_FAVORITE_LIST_SUCCESS correctly', () => {
    const prevState = { getFavoriteListPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_FAVORITE_LIST_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getFavoriteListPending).toBe(false);
  });

  it('handles action type HOME_GET_FAVORITE_LIST_FAILURE correctly', () => {
    const prevState = { getFavoriteListPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_FAVORITE_LIST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getFavoriteListPending).toBe(false);
    expect(state.getFavoriteListError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_FAVORITE_LIST_DISMISS_ERROR correctly', () => {
    const prevState = { getFavoriteListError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_FAVORITE_LIST_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getFavoriteListError).toBe(null);
  });
});

