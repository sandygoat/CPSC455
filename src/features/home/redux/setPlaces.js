import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  HOME_SET_PLACES,
} from './constants';

export function setPlaces(res) {
  return {
    type: HOME_SET_PLACES,
    data: res,
  };
}

export function useSetPlaces() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(setPlaces(...params)), [dispatch]);
  return { setPlace: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_SET_PLACES:
      return {
        ...state,
        places: action.data,
      };

    default:
      return state;
  }
}
