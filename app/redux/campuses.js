//action type
const SET_CAMPUSES = 'SET_CAMPUSES';

//action creators
export const setCampuses = (campuses) => ({
  type: SET_CAMPUSES,
  campuses
});

//thunk creators
export const fetchCampuses = () => {
 return async (dispatch, getState, {axios}) => {
  try {
  const { data } = await axios.get('/api/campuses')
  dispatch(setCampuses(data))
  } catch (err) {
    console.error(err);
  }
 }
};

//initial state
const initialState = {
  campuses: []
}

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function campusesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CAMPUSES:
      return {...state, campuses: action.campuses};
    default:
      return state;
  }
  // return null;
}
