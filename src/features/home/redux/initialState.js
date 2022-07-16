const initialState = {
  authorizedUser:localStorage.getItem('authorizedUser') || null,
  places:[],
  curReviews:[],
  registrationPending: false,
  registrationError: null,
  loginPending: false,
  loginError: null,
  getPlacesPending: false,
  getPlacesError: null,
  getReviewsPending: false,
  getReviewsError: null,
  addReviewsPending: false,
  addReviewsError: null,
};

export default initialState;
