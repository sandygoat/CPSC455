import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  HOME_GET_PLACES_BEGIN,
  HOME_GET_PLACES_SUCCESS,
  HOME_GET_PLACES_FAILURE,
  HOME_GET_PLACES_DISMISS_ERROR,
} from './constants';

export function getPlaces({ lat, lng, type}) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: HOME_GET_PLACES_BEGIN,
    });

    return fetch(
      `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&type=park,school,campground&radius=2000&key=AIzaSyA1h-RJmy66EAvQmxOOExargkvrdDRLlH4`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': 'X-Requested-With',
        },
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
          type: HOME_GET_PLACES_SUCCESS,
          data: res.results,
        });
      })
      .catch(err => {
        dispatch({
          type: HOME_GET_PLACES_FAILURE,
          data: { error: err },
        });
      });
  };
}

export function dismissGetPlacesError() {
  return {
    type: HOME_GET_PLACES_DISMISS_ERROR,
  };
}

export function useGetPlaces() {
  const dispatch = useDispatch();

  const { getPlacesPending, getPlacesError } = useSelector(
    state => ({
      getPlacesPending: state.home.getPlacesPending,
      getPlacesError: state.home.getPlacesError,
    }),
    shallowEqual
  );

  const boundAction = useCallback(
    (...args) => {
      return dispatch(getPlaces(...args));
    },
    [dispatch]
  );

  const boundDismissError = useCallback(() => {
    return dispatch(dismissGetPlacesError());
  }, [dispatch]);

  return {
    getPlaces: boundAction,
    getPlacesPending,
    getPlacesError,
    dismissGetPlacesError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_GET_PLACES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getPlacesPending: true,
        getPlacesError: null,
      };

    case HOME_GET_PLACES_SUCCESS:
      // The request is success
      return {
        ...state,
        getPlacesPending: false,
        getPlacesError: null,
        places: action.data,
      };

    case HOME_GET_PLACES_FAILURE:
      // The request is failed
      return {
        ...state,
        getPlacesPending: false,
        getPlacesError: action.data.error,
      };

    case HOME_GET_PLACES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getPlacesError: null,
      };

    default:
      return state;
  }
}
