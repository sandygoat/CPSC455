const initialState = {
  authorizedUser:localStorage.getItem('user') || null,
  registrationPending: false,
  registrationError: null,
};

export default initialState;
