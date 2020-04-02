import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStudents, fetchDeleteStudent } from '../redux/students';

// Notice that we're exporting the AllStudents component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllStudents extends React.Component {
  componentDidMount() {
    this.props.getStudentsFromStore()
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }
  
  handleClickDelete(id, e) {
    e.preventDefault();
    this.props.deleteStudent(id);
  }
  
  render() {
    const {students} = this.props
    if (this.props.loading) return <h1>Loading!!!</h1>
    return (
      <div className="container">
        <div className="row align-items-center">
          <h2 className="col-9">All Students</h2>
          <div className="col-3">
            <Link to="/students/addStudent">
              <button type="button" className="btn btn-success btn-sm">
                Add Student
              </button>
            </Link>
          </div>
        </div>
        
        <div className="row justify-content-around">
          {students.map(student => (
            <div key={student.id} className="border border-secondary m-2">
              <div className="col-xs">
                <img src={student.imageUrl} height="200" width="200" />
                <h3 className="h5" id="students-name">
                  <Link to={`/students/${student.id}`}>
                    {student.firstName} {student.lastName}
                  </Link>
                </h3>
                <button
                  type="button"
                  className="btn btn-dark btn-sm float-right mr-1 mb-1" 
                  onClick={(e) => this.handleClickDelete(student.id, e)}
                >
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    students: state.students.all,
    loading: state.students.loading
  };
};

const mapDispatch = (dispatch) => {
  return {
    getStudentsFromStore: () => dispatch(fetchStudents()),
    deleteStudent: (id) => dispatch(fetchDeleteStudent(id))
  };
};

export default connect(mapState, mapDispatch)(AllStudents);
