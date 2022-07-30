import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  HOME_ADD_REVIEWS_BEGIN,
  HOME_ADD_REVIEWS_SUCCESS,
  HOME_ADD_REVIEWS_FAILURE,
  HOME_ADD_REVIEWS_DISMISS_ERROR,
} from './constants';

export function addReviews(review) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_ADD_REVIEWS_BEGIN,
    });

    return fetch(`/reviews?placeId=${review.placeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body:JSON.stringify(review)
      }
    )
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.status);
      })
      .then(res => {
        dispatch({
            type: HOME_ADD_REVIEWS_SUCCESS,
            data: res,
          });
      })
      .catch(err => {
        dispatch({
            type: HOME_ADD_REVIEWS_FAILURE,
            data: { error: err },
          });
      });
  };
}

export function dismissAddReviewsError() {
  return {
    type: HOME_ADD_REVIEWS_DISMISS_ERROR,
  };
}

export function useAddReviews() {
  const dispatch = useDispatch();

  const { addReviewsPending, addReviewsError, curReviews } = useSelector(
    state => ({
      addReviewsPending: state.home.addReviewsPending,
      addReviewsError: state.home.addReviewsError,
      curReviews: state.home.curReviews
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(addReviews(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissAddReviewsError());
  }, [dispatch]);

  return {
    addReviews: boundAction,
    addReviewsPending,
    addReviewsError,
    dismissAddReviewsError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_ADD_REVIEWS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        addReviewsPending: true,
        addReviewsError: null,
      };

    case HOME_ADD_REVIEWS_SUCCESS:
      // The request is success
      return {
        ...state,
        addReviewsPending: false,
        addReviewsError: null,
        curReviews: action.data
      };

    case HOME_ADD_REVIEWS_FAILURE:
      // The request is failed
      return {
        ...state,
        addReviewsPending: false,
        addReviewsError: action.data.error,
      };

    case HOME_ADD_REVIEWS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        addReviewsError: null,
      };

    default:
      return state;
  }
}
