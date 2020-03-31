//action type
const SET_STUDENTS = 'SET_STUDENTS';
const ADD_STUDENT = 'ADD_STUDENT';


//action creators
export const setStudents = (students) => ({
  type: SET_STUDENTS,
  students
});

export const addStudent = (newStudent) => ({
  type: ADD_STUDENT,
  newStudent
})

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

export const fetchAddStudent = (firstName, lastName, email) => {
  return async (dispatch, getState, {axios}) => {
    const { data } = await axios.post(('/api/students/addStudent'), {firstName, lastName, email});
    console.log(data);
    dispatch(addStudent(data));
    console.log('current state: ', getState());
  }
}

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
    case ADD_STUDENT:
      return {...state, all: [...state.all, action.newStudent]};
    default:
      return state;
  }
  // return null;
}
