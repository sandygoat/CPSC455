import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_ADD_REVIEWS_BEGIN,
  HOME_ADD_REVIEWS_SUCCESS,
  HOME_ADD_REVIEWS_FAILURE,
  HOME_ADD_REVIEWS_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  addReviews,
  dismissAddReviewsError,
  reducer,
} from '../../../../src/features/home/redux/addReviews';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/addReviews', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when addReviews succeeds', () => {
    const store = mockStore({});

    return store.dispatch(addReviews())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_ADD_REVIEWS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_ADD_REVIEWS_SUCCESS);
      });
  });

  it('dispatches failure action when addReviews fails', () => {
    const store = mockStore({});

    return store.dispatch(addReviews({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_ADD_REVIEWS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_ADD_REVIEWS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissAddReviewsError', () => {
    const expectedAction = {
      type: HOME_ADD_REVIEWS_DISMISS_ERROR,
    };
    expect(dismissAddReviewsError()).toEqual(expectedAction);
  });

  it('handles action type HOME_ADD_REVIEWS_BEGIN correctly', () => {
    const prevState = { addReviewsPending: false };
    const state = reducer(
      prevState,
      { type: HOME_ADD_REVIEWS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addReviewsPending).toBe(true);
  });

  it('handles action type HOME_ADD_REVIEWS_SUCCESS correctly', () => {
    const prevState = { addReviewsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_ADD_REVIEWS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addReviewsPending).toBe(false);
  });

  it('handles action type HOME_ADD_REVIEWS_FAILURE correctly', () => {
    const prevState = { addReviewsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_ADD_REVIEWS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addReviewsPending).toBe(false);
    expect(state.addReviewsError).toEqual(expect.anything());
  });

  it('handles action type HOME_ADD_REVIEWS_DISMISS_ERROR correctly', () => {
    const prevState = { addReviewsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_ADD_REVIEWS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addReviewsError).toBe(null);
  });
});

