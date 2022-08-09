import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_USERS_BEGIN,
  HOME_GET_USERS_SUCCESS,
  HOME_GET_USERS_FAILURE,
  HOME_GET_USERS_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getUsers,
  dismissGetUsersError,
  reducer,
} from '../../../../src/features/home/redux/getUsers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getUsers', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getUsers succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getUsers())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_USERS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_USERS_SUCCESS);
      });
  });

  it('dispatches failure action when getUsers fails', () => {
    const store = mockStore({});

    return store.dispatch(getUsers({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_USERS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_USERS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetUsersError', () => {
    const expectedAction = {
      type: HOME_GET_USERS_DISMISS_ERROR,
    };
    expect(dismissGetUsersError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_USERS_BEGIN correctly', () => {
    const prevState = { getUsersPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_USERS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getUsersPending).toBe(true);
  });

  it('handles action type HOME_GET_USERS_SUCCESS correctly', () => {
    const prevState = { getUsersPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_USERS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getUsersPending).toBe(false);
  });

  it('handles action type HOME_GET_USERS_FAILURE correctly', () => {
    const prevState = { getUsersPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_USERS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getUsersPending).toBe(false);
    expect(state.getUsersError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_USERS_DISMISS_ERROR correctly', () => {
    const prevState = { getUsersError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_USERS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getUsersError).toBe(null);
  });
});

