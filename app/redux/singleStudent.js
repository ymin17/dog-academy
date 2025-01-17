const GET_STUDENT = 'GET_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';

export const getStudent = (student) => ({
  type: GET_STUDENT,
  student
})

export const updateStudent = (student) => ({
  type: UPDATE_STUDENT,
  student
})

export const fetchSingleStudent = (id) => {
  return async (dispatch, getState, {axios}) => {
    try {
      const { data } = await axios.get(`/api/students/${id}`);
      dispatch(getStudent(data));
    } catch (err) {
      console.error(err);
    }
  }
};

export const fetchUpdateStudent = (id, firstName, lastName, email) => {
  return async (dispatch, getState, {axios}) => {
    try {
      const { data } = await axios.put((`/api/students/${id}/edit`), {firstName, lastName, email});
      dispatch(updateStudent({ data }));
    } catch (err) {
      console.error(err);
    }
  }
};

const initialState = {
  singleStudent: {},
  loading: true
}

export default function studentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STUDENT:
      return {...state, singleStudent: action.student, loading: false };
    case UPDATE_STUDENT:
      return {...state, singleStudent: action.student, loading: false };
    default:
      return state;
  }
}
