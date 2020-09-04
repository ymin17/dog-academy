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
      <section id="team" className="team">
        <div className="container">
          
          <div className="section-title">
            <h2>All Students</h2>
            <div className="col-3">
              <Link to="/students/addStudent">
                <button type="button" id="add-btn" className="btn btn-success btn-sm">
                  Add Student
                </button>
              </Link>
            </div>
          </div>
          
          <div className="row">
            
            {students.map(student => (
              <div key={student.id} data-aos="fade-up">
                <div className="member">
                  <div className="pic">
                    <img src={student.imageUrl} className="img-fluid" alt="" width="250px" height="250px" />
                  </div>
                  <div className="member-info">
                    <h4>
                      <Link to={`/students/${student.id}`}>
                        {student.firstName} {student.lastName}
                      </Link>
                    </h4>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm float-right mr-1 mb-1" 
                      onClick={(e) => this.handleClickDelete(student.id, e)}
                    >
                      delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
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
