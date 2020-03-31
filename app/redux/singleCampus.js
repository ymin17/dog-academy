const GET_CAMPUS = 'GET_CAMPUS';

export const getCampus = (campus) => ({
  type: GET_CAMPUS,
  campus
})

export const fetchSingleCampus = (id) => {
  return async (dispatch, getState, {axios}) => {
    try {
      const { data } = await axios.get(`/api/campuses/${id}`);
      dispatch(getCampus(data));
    } catch (err) {
      console.error(err);
    }
  }
};

const initialState = {
  singleCampus: {}
}

export default function campusReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CAMPUS:
      return {...state, singleCampus: action.campus};
    default:
      return state;
  }
}
