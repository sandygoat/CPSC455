import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_REVIEWS_BEGIN,
  HOME_GET_REVIEWS_SUCCESS,
  HOME_GET_REVIEWS_FAILURE,
  HOME_GET_REVIEWS_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getReviews,
  dismissGetReviewsError,
  reducer,
} from '../../../../src/features/home/redux/getReviews';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getReviews', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getReviews succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getReviews())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_REVIEWS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_REVIEWS_SUCCESS);
      });
  });

  it('dispatches failure action when getReviews fails', () => {
    const store = mockStore({});

    return store.dispatch(getReviews({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_REVIEWS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_REVIEWS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetReviewsError', () => {
    const expectedAction = {
      type: HOME_GET_REVIEWS_DISMISS_ERROR,
    };
    expect(dismissGetReviewsError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_REVIEWS_BEGIN correctly', () => {
    const prevState = { getReviewsPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_REVIEWS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getReviewsPending).toBe(true);
  });

  it('handles action type HOME_GET_REVIEWS_SUCCESS correctly', () => {
    const prevState = { getReviewsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_REVIEWS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getReviewsPending).toBe(false);
  });

  it('handles action type HOME_GET_REVIEWS_FAILURE correctly', () => {
    const prevState = { getReviewsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_REVIEWS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getReviewsPending).toBe(false);
    expect(state.getReviewsError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_REVIEWS_DISMISS_ERROR correctly', () => {
    const prevState = { getReviewsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_REVIEWS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getReviewsError).toBe(null);
  });
});

