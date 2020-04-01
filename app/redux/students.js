//action type
const SET_STUDENTS = 'SET_STUDENTS';
const ADD_STUDENT = 'ADD_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UNREGISTER = 'UNREGISTER';

//action creators
export const setStudents = (students) => ({
  type: SET_STUDENTS,
  students
});

export const addStudent = (newStudent) => ({
  type: ADD_STUDENT,
  newStudent
})

export const deleteStudent = (id) => ({
  type: DELETE_STUDENT,
  studentId: id
})

export const unregisterStudent = (students) => ({
  type: UNREGISTER,
  students
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

export const fetchDeleteStudent = (id) => {
  return async (dispatch, getState, {axios}) => {
    try {
      await axios.delete((`/api/students/${id}`));
      dispatch(deleteStudent(id))
    } catch (err) {
      console.error(err);
    }
  }
};

export const unregisterFromServer = (id) => {
  return async (dispatch, getState, {axios}) => {
    try {
      await axios.put(`/api/students/${id}/unregister`);
      const {data} = await axios.get('/api/students');
      dispatch(unregisterStudent(data));
      console.log('curr state: ', getState())
    } catch (err) {
      console.error(err);
    }
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
    case DELETE_STUDENT: {
      let currStudent = [...state.all]
      currStudent = state.all.filter(student => student.id !== action.studentId);
      return {...state, all: currStudent};
    }
    case UNREGISTER:
      return {...state, all: action.students};
    default:
      return state;
  }
  // return null;
}
