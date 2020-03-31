import { combineReducers } from 'redux'
import campusesReducer from './campuses'
import studentsReducer from './students'
import campusReducer from './singleCampus'
import studentReducer from './singleStudent'

const appReducer = combineReducers({
  campuses: campusesReducer,
  students: studentsReducer,
  campus: campusReducer,
  student: studentReducer
})

export default appReducer
