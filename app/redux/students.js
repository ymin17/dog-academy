//action type
const SET_STUDENTS = 'SET_STUDENTS';


//action creators
export const setStudents = (students) => ({
  type: SET_STUDENTS,
  students
});

//thunk creator
export const fetchStudents = () => {
  return async (dispatch, getState, {axios}) => {
    try {
    const { data } = await axios.get('/api/students')
    dispatch(setStudents(data))
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
export default function studentsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STUDENTS:
      return {...state, all: action.students};
    default:
      return state;
  }
  // return null;
}
