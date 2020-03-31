const GET_STUDENT = 'GET_STUDENT';

export const getStudent = (student) => ({
  type: GET_STUDENT,
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

const initialState = {
  singleStudent: {}
}

export default function studentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STUDENT:
      return {...state, singleStudent: action.student}
    default:
      return state;
  }
}
