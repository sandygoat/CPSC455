import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_REGISTRATION_BEGIN,
  HOME_REGISTRATION_SUCCESS,
  HOME_REGISTRATION_FAILURE,
  HOME_REGISTRATION_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  registration,
  dismissRegistrationError,
  reducer,
} from '../../../../src/features/home/redux/registration';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/registration', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when registration succeeds', () => {
    const store = mockStore({});

    return store.dispatch(registration())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_REGISTRATION_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_REGISTRATION_SUCCESS);
      });
  });

  it('dispatches failure action when registration fails', () => {
    const store = mockStore({});

    return store.dispatch(registration({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_REGISTRATION_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_REGISTRATION_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissRegistrationError', () => {
    const expectedAction = {
      type: HOME_REGISTRATION_DISMISS_ERROR,
    };
    expect(dismissRegistrationError()).toEqual(expectedAction);
  });

  it('handles action type HOME_REGISTRATION_BEGIN correctly', () => {
    const prevState = { registrationPending: false };
    const state = reducer(
      prevState,
      { type: HOME_REGISTRATION_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.registrationPending).toBe(true);
  });

  it('handles action type HOME_REGISTRATION_SUCCESS correctly', () => {
    const prevState = { registrationPending: true };
    const state = reducer(
      prevState,
      { type: HOME_REGISTRATION_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.registrationPending).toBe(false);
  });

  it('handles action type HOME_REGISTRATION_FAILURE correctly', () => {
    const prevState = { registrationPending: true };
    const state = reducer(
      prevState,
      { type: HOME_REGISTRATION_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.registrationPending).toBe(false);
    expect(state.registrationError).toEqual(expect.anything());
  });

  it('handles action type HOME_REGISTRATION_DISMISS_ERROR correctly', () => {
    const prevState = { registrationError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_REGISTRATION_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.registrationError).toBe(null);
  });
});

