import initialState from './initialState';
import { reducer as registrationReducer } from './registration';
import { reducer as loginReducer } from './login';
import { reducer as getPlacesReducer } from './getPlaces';

const reducers = [
  registrationReducer,
  loginReducer,
  getPlacesReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
