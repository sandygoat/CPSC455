import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  HOME_REMOVE_FROM_FAVORITE_LIST_BEGIN,
  HOME_REMOVE_FROM_FAVORITE_LIST_SUCCESS,
  HOME_REMOVE_FROM_FAVORITE_LIST_FAILURE,
  HOME_REMOVE_FROM_FAVORITE_LIST_DISMISS_ERROR,
} from './constants';

export function removeFromFavoriteList({userId, placeId}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_REMOVE_FROM_FAVORITE_LIST_BEGIN,
    });

    return fetch(`/favorite?placeId=${placeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body:JSON.stringify({
        userId
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.status);
      })
      .then(res => {
        dispatch({
            type: HOME_REMOVE_FROM_FAVORITE_LIST_SUCCESS,
            data: res,
          });
      })
      .catch(err => {
        dispatch({
            type: HOME_REMOVE_FROM_FAVORITE_LIST_FAILURE,
            data: { error: err },
          });
      });
  };
}

export function dismissRemoveFromFavoriteListError() {
  return {
    type: HOME_REMOVE_FROM_FAVORITE_LIST_DISMISS_ERROR,
  };
}

export function useRemoveFromFavoriteList() {
  const dispatch = useDispatch();

  const { removeFromFavoriteListPending, removeFromFavoriteListError } = useSelector(
    state => ({
      removeFromFavoriteListPending: state.home.removeFromFavoriteListPending,
      removeFromFavoriteListError: state.home.removeFromFavoriteListError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(removeFromFavoriteList(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissRemoveFromFavoriteListError());
  }, [dispatch]);

  return {
    removeFromFavoriteList: boundAction,
    removeFromFavoriteListPending,
    removeFromFavoriteListError,
    dismissRemoveFromFavoriteListError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_REMOVE_FROM_FAVORITE_LIST_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        removeFromFavoriteListPending: true,
        removeFromFavoriteListError: null,
      };

    case HOME_REMOVE_FROM_FAVORITE_LIST_SUCCESS:
      // The request is success
      return {
        ...state,
        removeFromFavoriteListPending: false,
        removeFromFavoriteListError: null,
        favoriteList: action.data,
      };

    case HOME_REMOVE_FROM_FAVORITE_LIST_FAILURE:
      // The request is failed
      return {
        ...state,
        removeFromFavoriteListPending: false,
        removeFromFavoriteListError: action.data.error,
      };

    case HOME_REMOVE_FROM_FAVORITE_LIST_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        removeFromFavoriteListError: null,
      };

    default:
      return state;
  }
}
