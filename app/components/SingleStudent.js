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
      currentCampus = <p className="mt-4">This Student is not registered a campus.</p>
    } else {
      currentCampus = (
        <div>
          <p className="mt-4">This student is registered to a campus: </p>
          <p id="students-name"><Link to={`/campuses/${studentsCampus.id}`}>{studentsCampus.name}</Link></p>
        </div>
        )
    }
    
    return (
      <div className="container">
        <h3 className="m-3">{student.firstName} {student.lastName}</h3>
        <img src={student.imgUrl} height="200" width="200" />
        <div className="float-right">
        <p>Email: {student.email}</p>
        <p>GPA: {student.gpa}</p>
        <Link to={`/students/${student.id}/edit`}><button type="button" className="btn btn-success btn-sm">edit</button></Link>
        </div>
        <br />
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
