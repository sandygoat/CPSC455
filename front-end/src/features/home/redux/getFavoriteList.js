import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  HOME_GET_FAVORITE_LIST_BEGIN,
  HOME_GET_FAVORITE_LIST_SUCCESS,
  HOME_GET_FAVORITE_LIST_FAILURE,
  HOME_GET_FAVORITE_LIST_DISMISS_ERROR,
} from './constants';

export function getFavoriteList({userId}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_GET_FAVORITE_LIST_BEGIN,
    });

    return fetch(`/favorite?id=${userId}`, {
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
            type: HOME_GET_FAVORITE_LIST_SUCCESS,
            data: res,
          });
      })
      .catch(err => {
        dispatch({
            type: HOME_GET_FAVORITE_LIST_FAILURE,
            data: { error: err },
          });
      });
  };
}

export function dismissGetFavoriteListError() {
  return {
    type: HOME_GET_FAVORITE_LIST_DISMISS_ERROR,
  };
}

export function useGetFavoriteList() {
  const dispatch = useDispatch();

  const { getFavoriteListPending, getFavoriteListError } = useSelector(
    state => ({
      getFavoriteListPending: state.home.getFavoriteListPending,
      getFavoriteListError: state.home.getFavoriteListError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(getFavoriteList(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissGetFavoriteListError());
  }, [dispatch]);

  return {
    getFavoriteList: boundAction,
    getFavoriteListPending,
    getFavoriteListError,
    dismissGetFavoriteListError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_GET_FAVORITE_LIST_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getFavoriteListPending: true,
        getFavoriteListError: null,
      };

    case HOME_GET_FAVORITE_LIST_SUCCESS:
      // The request is success
      return {
        ...state,
        getFavoriteListPending: false,
        getFavoriteListError: null,
        favoriteList: action.data,
      };

    case HOME_GET_FAVORITE_LIST_FAILURE:
      // The request is failed
      return {
        ...state,
        getFavoriteListPending: false,
        getFavoriteListError: action.data.error,
      };

    case HOME_GET_FAVORITE_LIST_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getFavoriteListError: null,
      };

    default:
      return state;
  }
}
