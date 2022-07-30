import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_DELETE_REVIEW_BEGIN,
  HOME_DELETE_REVIEW_SUCCESS,
  HOME_DELETE_REVIEW_FAILURE,
  HOME_DELETE_REVIEW_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  deleteReview,
  dismissDeleteReviewError,
  reducer,
} from '../../../../src/features/home/redux/deleteReview';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/deleteReview', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when deleteReview succeeds', () => {
    const store = mockStore({});

    return store.dispatch(deleteReview())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_DELETE_REVIEW_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_DELETE_REVIEW_SUCCESS);
      });
  });

  it('dispatches failure action when deleteReview fails', () => {
    const store = mockStore({});

    return store.dispatch(deleteReview({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_DELETE_REVIEW_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_DELETE_REVIEW_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissDeleteReviewError', () => {
    const expectedAction = {
      type: HOME_DELETE_REVIEW_DISMISS_ERROR,
    };
    expect(dismissDeleteReviewError()).toEqual(expectedAction);
  });

  it('handles action type HOME_DELETE_REVIEW_BEGIN correctly', () => {
    const prevState = { deleteReviewPending: false };
    const state = reducer(
      prevState,
      { type: HOME_DELETE_REVIEW_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteReviewPending).toBe(true);
  });

  it('handles action type HOME_DELETE_REVIEW_SUCCESS correctly', () => {
    const prevState = { deleteReviewPending: true };
    const state = reducer(
      prevState,
      { type: HOME_DELETE_REVIEW_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteReviewPending).toBe(false);
  });

  it('handles action type HOME_DELETE_REVIEW_FAILURE correctly', () => {
    const prevState = { deleteReviewPending: true };
    const state = reducer(
      prevState,
      { type: HOME_DELETE_REVIEW_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteReviewPending).toBe(false);
    expect(state.deleteReviewError).toEqual(expect.anything());
  });

  it('handles action type HOME_DELETE_REVIEW_DISMISS_ERROR correctly', () => {
    const prevState = { deleteReviewError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_DELETE_REVIEW_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteReviewError).toBe(null);
  });
});

