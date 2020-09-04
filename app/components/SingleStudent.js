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
    const studentImg = student.imageUrl
    console.log(student)
    console.log(studentImg)
    
    let currentCampus;
    if (!studentsCampus) {
      currentCampus = <p className="mt-4">This Student is not registered a campus.</p>
    } else {
      currentCampus = (
        <div>
          <p className="mt-4">This student is registered to a campus: </p>
          <p><Link to={`/campuses/${studentsCampus.id}`} id="student-campus">{studentsCampus.name}</Link></p>
        </div>
        )
    }
    
    if (this.props.loading) return <h1>Loading!!!</h1>
    
    return (
      <div className="container">
        <h3 className="m-3">{student.firstName} {student.lastName}</h3>
        <img src={studentImg} height="200" width="200" id="single-student-img" />
        <div className="single-student-info">
          <p>Email: {student.email}</p>
          <p>GPA: {student.gpa}</p>
          <Link to={`/students/${student.id}/edit`}><button type="button" id="edit-student-btn" className="btn btn-success btn-sm">edit</button></Link>
        
        <br />
        {currentCampus}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    student: state.student.singleStudent,
    loading: state.student.loading
  };
};

const mapDispatch = dispatch => {
  return {
    getSingleStudentFromStore: (id) => dispatch(fetchSingleStudent(id))
  };
};

export default connect(mapState, mapDispatch)(SingleStudent)
