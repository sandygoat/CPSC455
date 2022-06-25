const initialState = {
  authorizedUser:localStorage.getItem('authorizedUser') || null,
  places:[],
  registrationPending: false,
  registrationError: null,
  loginPending: false,
  loginError: null,
  getPlacesPending: false,
  getPlacesError: null,
};

export default initialState;
