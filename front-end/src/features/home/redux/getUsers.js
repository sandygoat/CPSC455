import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  HOME_GET_USERS_BEGIN,
  HOME_GET_USERS_SUCCESS,
  HOME_GET_USERS_FAILURE,
  HOME_GET_USERS_DISMISS_ERROR,
} from './constants';

export function getUsers({userId}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_GET_USERS_BEGIN,
    });

    return fetch(`/users/users?userId=${userId}`, {
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
            type: HOME_GET_USERS_SUCCESS,
            data: res,
          });
      })
      .catch(err => {
        dispatch({
            type: HOME_GET_USERS_FAILURE,
            data: { error: err },
          });
      });
  };
}

export function dismissGetUsersError() {
  return {
    type: HOME_GET_USERS_DISMISS_ERROR,
  };
}

export function useGetUsers() {
  const dispatch = useDispatch();

  const { getUsersPending, getUsersError } = useSelector(
    state => ({
      getUsersPending: state.home.getUsersPending,
      getUsersError: state.home.getUsersError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(getUsers(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissGetUsersError());
  }, [dispatch]);

  return {
    getUsers: boundAction,
    getUsersPending,
    getUsersError,
    dismissGetUsersError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_GET_USERS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getUsersPending: true,
        getUsersError: null,
      };

    case HOME_GET_USERS_SUCCESS:
      // The request is success
      return {
        ...state,
        getUsersPending: false,
        getUsersError: null,
        usersList: action.data,
      };

    case HOME_GET_USERS_FAILURE:
      // The request is failed
      return {
        ...state,
        getUsersPending: false,
        getUsersError: action.data.error,
      };

    case HOME_GET_USERS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getUsersError: null,
      };

    default:
      return state;
  }
}
