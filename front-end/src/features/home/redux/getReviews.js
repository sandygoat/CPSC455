import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  HOME_GET_REVIEWS_BEGIN,
  HOME_GET_REVIEWS_SUCCESS,
  HOME_GET_REVIEWS_FAILURE,
  HOME_GET_REVIEWS_DISMISS_ERROR,
} from './constants';

export function getReviews(id) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_GET_REVIEWS_BEGIN,
    });

    return fetch(`/reviews?placeId=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.status);
      })
      .then(res => {
        dispatch({
            type: HOME_GET_REVIEWS_SUCCESS,
            data: res,
          });
      })
      .catch(err => {
        dispatch({
            type: HOME_GET_REVIEWS_FAILURE,
            data: { error: err },
          });
      });
  };
}

export function dismissGetReviewsError() {
  return {
    type: HOME_GET_REVIEWS_DISMISS_ERROR,
  };
}

export function useGetReviews() {
  const dispatch = useDispatch();

  const { getReviewsPending, getReviewsError } = useSelector(
    state => ({
      getReviewsPending: state.home.getReviewsPending,
      getReviewsError: state.home.getReviewsError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(getReviews(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissGetReviewsError());
  }, [dispatch]);

  return {
    getReviews: boundAction,
    getReviewsPending,
    getReviewsError,
    dismissGetReviewsError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_GET_REVIEWS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getReviewsPending: true,
        getReviewsError: null,
      };

    case HOME_GET_REVIEWS_SUCCESS:
      // The request is success
      return {
        ...state,
        getReviewsPending: false,
        getReviewsError: null,
        curReviews: action.data,
      };

    case HOME_GET_REVIEWS_FAILURE:
      // The request is failed
      return {
        ...state,
        getReviewsPending: false,
        getReviewsError: action.data.error,
      };

    case HOME_GET_REVIEWS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getReviewsError: null,
      };

    default:
      return state;
  }
}
