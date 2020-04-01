const GET_STUDENT = 'GET_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
// const UNREGISTER = 'UNREGISTER';

export const getStudent = (student) => ({
  type: GET_STUDENT,
  student
})

export const updateStudent = (student) => ({
  type: UPDATE_STUDENT,
  student
})

// export const unregisterStudent = (student) => ({
//   type: UNREGISTER,
//   student
// })

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
      console.log('DATA from axios.put: ', data)
      dispatch(updateStudent({ data }));
      console.log('curr state: ', getState())
    } catch (err) {
      console.error(err);
    }
  }
};

// export const unregisterFromServer = (id) => {
//   return async (dispatch, getState, {axios}) => {
//     try {
//       const response = await axios.put(`/api/students/${id}/unregister`);
//       console.log('Response from axios.put: ', response)
//       const {data} = await axios.get('/api/students')
//       console.log('CurrentStudents from axios.get: ', data)
//       dispatch(unregisterStudent(data));
//       console.log('curr state: ', getState())
//     } catch (err) {
//       console.error(err);
//     }
//   }
// }

const initialState = {
  singleStudent: {}
}

export default function studentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STUDENT:
      return {...state, singleStudent: action.student};
    case UPDATE_STUDENT:
      return {...state, singleStudent: action.student};
    // case UNREGISTER:
    //   return {...state, singleStudent: action.student};
    default:
      return state;
  }
}
