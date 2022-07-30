import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  HOME_ADD_FAVORITE_BEGIN,
  HOME_ADD_FAVORITE_SUCCESS,
  HOME_ADD_FAVORITE_FAILURE,
  HOME_ADD_FAVORITE_DISMISS_ERROR,
} from './constants';

export function addFavorite({placeId, userId}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_ADD_FAVORITE_BEGIN,
    });

    return fetch(`http://localhost:3100/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body:JSON.stringify({
        placeId,
        userId,
      })
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
            type: HOME_ADD_FAVORITE_SUCCESS,
            data: res,
          });
      })
      .catch(err => {
        dispatch({
            type: HOME_ADD_FAVORITE_FAILURE,
            data: { error: err },
          });
      });
  };
}

export function dismissAddFavoriteError() {
  return {
    type: HOME_ADD_FAVORITE_DISMISS_ERROR,
  };
}

export function useAddFavorite() {
  const dispatch = useDispatch();

  const { addFavoritePending, addFavoriteError } = useSelector(
    state => ({
      addFavoritePending: state.home.addFavoritePending,
      addFavoriteError: state.home.addFavoriteError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(addFavorite(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissAddFavoriteError());
  }, [dispatch]);

  return {
    addFavorite: boundAction,
    addFavoritePending,
    addFavoriteError,
    dismissAddFavoriteError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_ADD_FAVORITE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        addFavoritePending: true,
        addFavoriteError: null,
      };

    case HOME_ADD_FAVORITE_SUCCESS:
      // The request is success
      return {
        ...state,
        addFavoritePending: false,
        addFavoriteError: null,
        favoriteList: action.data,
      };

    case HOME_ADD_FAVORITE_FAILURE:
      // The request is failed
      return {
        ...state,
        addFavoritePending: false,
        addFavoriteError: action.data.error,
      };

    case HOME_ADD_FAVORITE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        addFavoriteError: null,
      };

    default:
      return state;
  }
}
