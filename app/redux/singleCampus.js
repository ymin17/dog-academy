const GET_CAMPUS = 'GET_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

export const getCampus = (campus) => ({
  type: GET_CAMPUS,
  campus
})

export const updateCampus = (campus) => ({
  type: UPDATE_CAMPUS,
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

export const fetchUpdateCampus = (id, name, address) => {
  return async (dispatch, getState, {axios}) => {
    try {
      const { data } = await axios.put((`/api/campuses/${id}/edit`), {name, address});
      console.log('DATA from axios.put: ', data)
      dispatch(updateCampus({ data }));
      console.log('curr state: ', getState())
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
    case UPDATE_CAMPUS:
      return {...state, singleCampus: action.campus};
    default:
      return state;
  }
}
