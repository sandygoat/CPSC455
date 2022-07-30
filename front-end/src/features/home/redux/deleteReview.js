import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  HOME_DELETE_REVIEW_BEGIN,
  HOME_DELETE_REVIEW_SUCCESS,
  HOME_DELETE_REVIEW_FAILURE,
  HOME_DELETE_REVIEW_DISMISS_ERROR,
} from './constants';

export function deleteReview(comment) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_DELETE_REVIEW_BEGIN,
    });

    return fetch(`/reviews?id=${comment._id}&placeId=${comment.placeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
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
            type: HOME_DELETE_REVIEW_SUCCESS,
            data: res,
          });
      })
      .catch(err => {
        dispatch({
            type: HOME_DELETE_REVIEW_FAILURE,
            data: { error: err },
          });
      });
  };
}

export function dismissDeleteReviewError() {
  return {
    type: HOME_DELETE_REVIEW_DISMISS_ERROR,
  };
}

export function useDeleteReview() {
  const dispatch = useDispatch();

  const { deleteReviewPending, deleteReviewError } = useSelector(
    state => ({
      deleteReviewPending: state.home.deleteReviewPending,
      deleteReviewError: state.home.deleteReviewError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(deleteReview(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissDeleteReviewError());
  }, [dispatch]);

  return {
    deleteReview: boundAction,
    deleteReviewPending,
    deleteReviewError,
    dismissDeleteReviewError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_DELETE_REVIEW_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        deleteReviewPending: true,
        deleteReviewError: null,
      };

    case HOME_DELETE_REVIEW_SUCCESS:
      // The request is success
      return {
        ...state,
        deleteReviewPending: false,
        deleteReviewError: null,
        curReviews: action.data,
      };

    case HOME_DELETE_REVIEW_FAILURE:
      // The request is failed
      return {
        ...state,
        deleteReviewPending: false,
        deleteReviewError: action.data.error,
      };

    case HOME_DELETE_REVIEW_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        deleteReviewError: null,
      };

    default:
      return state;
  }
}
