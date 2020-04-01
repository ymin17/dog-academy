import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleStudent } from '../redux/singleStudent'

export class SingleStudent extends React.Component {
  componentDidMount() {
    this.props.getSingleStudentFromStore(this.props.match.params.studentId)
  }
  render() {
    const {student} = this.props
    const studentsCampus = student.campus
    console.log('single student props: ', this.props)
    console.log('STUDENTS CAMPUS: ', studentsCampus)
    console.log('type of studentsCamp: ', typeof studentsCampus);
    
    let currentCampus;
    if (!studentsCampus) {
      currentCampus = <p>This Student is not registered a campus.</p>
    } else {
      currentCampus = (
        <div>
          <p>This student is registered to a campus</p>
          <p><Link to={`/campuses/${studentsCampus.id}`}>{studentsCampus.name}</Link></p>
        </div>
        )
    }
    
    return (
      <div>
        <h2>{student.firstName} {student.lastName}</h2>
        <img src={student.imgUrl} height="200" width="200" />
        <p>Email: {student.email}</p>
        <p>GPA: {student.gpa}</p>
        <Link to={`/students/${student.id}/edit`}><button type="button">edit</button></Link>
        {currentCampus}
      </div>
    )
  }
}

const mapState = state => {
  return {
    student: state.student.singleStudent
  };
};

const mapDispatch = dispatch => {
  return {
    getSingleStudentFromStore: (id) => dispatch(fetchSingleStudent(id))
  };
};

export default connect(mapState, mapDispatch)(SingleStudent)
