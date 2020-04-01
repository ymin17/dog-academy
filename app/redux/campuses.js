//action type
const SET_CAMPUSES = 'SET_CAMPUSES';
const ADD_CAMPUS = 'ADD_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';

//action creators
export const setCampuses = (campuses) => ({
  type: SET_CAMPUSES,
  campuses
});

export const addCampus = (newCampus) => ({
  type: ADD_CAMPUS,
  newCampus
});

export const deleteCampus = (id) => ({
  type: DELETE_CAMPUS,
  campusId: id
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
    try {
      const { data } = await axios.post(('/api/campuses/addCampus'), {name, address});
      dispatch(addCampus(data));
    } catch (err) {
      console.error(err);
    }
  }
};

export const fetchDeleteCampus = (id) => {
  return async (dispatch, getState, {axios}) => {
    try {
      await axios.delete((`/api/campuses/${id}`));
      dispatch(deleteCampus(id))
    } catch (err) {
      console.error(err);
    }
  }
};

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
    case DELETE_CAMPUS: {
      let currCampus = [...state.all]
      currCampus = state.all.filter(campus => campus.id !== action.campusId);
      return {...state, all: currCampus};
    }
    default:
      return state;
  }
}
