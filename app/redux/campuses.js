//action type
const SET_CAMPUSES = 'SET_CAMPUSES';
const ADD_CAMPUS = 'ADD_CAMPUS';

//action creators
export const setCampuses = (campuses) => ({
  type: SET_CAMPUSES,
  campuses
});

export const addCampus = (newCampus) => ({
  type: ADD_CAMPUS,
  newCampus
}) 

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

export const fetchAddCampus = (name, address) => {
  return async (dispatch, getState, {axios}) => {
    const { data } = await axios.post(('/api/campuses/addCampus'), {name, address});
    console.log(data);
    dispatch(addCampus(data));
    console.log('current state: ', getState());
  }
}

//initial state
const initialState = {
  all: []
}

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function campusesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CAMPUSES:
      return {...state, all: action.campuses};
    case ADD_CAMPUS:
      return {...state, all: [...state.all, action.newCampus]};
    default:
      return state;
  }
  // return null;
}
