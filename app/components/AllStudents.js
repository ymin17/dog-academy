import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStudents } from '../redux/students';

// Notice that we're exporting the AllStudents component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllStudents extends React.Component {
  componentDidMount() {
    this.props.getStudentsFromStore()
  }
  render() {
    const {students} = this.props
    return (
      <div>
        <h2>All Students</h2>
          <div>
            {students.map(student => (
              <div key={student.id}>
                <img src={student.imageUrl} height="400" width="200" />
                <h3><Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link></h3>
              </div>
            ))}
          </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    students: state.students.all
  };
};

const mapDispatch = (dispatch) => {
  return {
    getStudentsFromStore: () => dispatch(fetchStudents())
  };
};

export default connect(mapState, mapDispatch)(AllStudents);
