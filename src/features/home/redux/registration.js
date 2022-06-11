import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  HOME_REGISTRATION_BEGIN,
  HOME_REGISTRATION_SUCCESS,
  HOME_REGISTRATION_FAILURE,
  HOME_REGISTRATION_DISMISS_ERROR,
} from './constants';

export function registration(userCredentials) {
  console.log("reg")
            
  return dispatch => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_REGISTRATION_BEGIN,
    });

    return new Promise((resolve, reject) => {
      // const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      // doRequest.then(
      //   (res) => {
      //     dispatch({
      //       type: HOME_REGISTRATION_SUCCESS,
      //       data: res,
      //     });
      //     resolve(res);
      //   },
      //   // Use rejectHandler as the second argument so that render errors won't be caught.
      //   (err) => {
      //     dispatch({
      //       type: HOME_REGISTRATION_FAILURE,
      //       data: { error: err },
      //     });
      //     reject(err);
      //   },
      // );
          dispatch({
            type: HOME_REGISTRATION_SUCCESS,
            data: userCredentials.username,
          });
          return 1;
    });
  };
}

export function dismissRegistrationError() {
  return {
    type: HOME_REGISTRATION_DISMISS_ERROR,
  };
}

export function useRegistration() {
  const dispatch = useDispatch();

  const { authorizedUser, registrationPending, registrationError } = useSelector(
    state => ({
      authorizedUser: state.home.authorizedUser,
      registrationPending: state.home.registrationPending,
      registrationError: state.home.registrationError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(registration(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissRegistrationError());
  }, [dispatch]);

  return {
    authorizedUser,
    registration: boundAction,
    registrationPending,
    registrationError,
    dismissRegistrationError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_REGISTRATION_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        registrationPending: true,
        registrationError: null,
      };

    case HOME_REGISTRATION_SUCCESS:
      // The request is success
      return {
        ...state,
        registrationPending: false,
        registrationError: null,
        authorizedUser: {username: action.data},
      };

    case HOME_REGISTRATION_FAILURE:
      // The request is failed
      return {
        ...state,
        registrationPending: false,
        registrationError: action.data.error,
      };

    case HOME_REGISTRATION_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        registrationError: null,
      };

    default:
      return state;
  }
}
