import React from "react";
import { connect } from "react-redux";
import { fetchStudents } from '../redux/students'

// Notice that we're exporting the AllStudents component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllStudents extends React.Component {
  componentDidMount() {
    this.props.getStudentsFromStore()
  }
  render() {
    const {students, fetchStudents} = this.props
    return (
      <div>
        <center>
        <h2>All Students</h2>
          <div>
            {students.map(student => (
              <div key={student.id}>
                <h3>Name: {student.firstName} {student.lastName}</h3>
                {/* <img src={student.imageUrl} height="400" width="200" /> */}
              </div>
            ))}
          </div>
          </center>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    students: state.students.students
  };
};

const mapDispatch = (dispatch) => {
  return {
    getStudentsFromStore: () => dispatch(fetchStudents())
  };
};

export default connect(mapState, mapDispatch)(AllStudents);
