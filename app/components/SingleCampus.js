import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleCampus } from '../redux/singleCampus'
import { unregisterFromServer } from '../redux/students'

class SingleCampus extends React.Component {
  componentDidMount() {
    this.props.getSingleCampusFromStore(this.props.match.params.campusId);
    this.handleUnregister = this.handleUnregister.bind(this);
  }
  
  handleUnregister(studentId, e) {
    e.preventDefault();
    this.props.unregister(studentId);
    this.props.getSingleCampusFromStore(this.props.match.params.campusId);
  }
  
  render() {
    const {campus} = this.props
    const studentsInCampus = campus.students
    const campusImg = campus.imageUrl
    console.log(campus, "<<<<<")
    console.log(campusImg)
    
    let studentList;
    if (studentsInCampus === undefined || studentsInCampus.length === 0) {
        studentList = <p>There are no students currently registered to this campus.</p>
    } else {
    studentList = (
      <ul className="container" id="list-without-bullet">
        <div className="row justify-content-around">
        {
          studentsInCampus.map(student => (
          <li key={student.id} className="col-5">
            <img src={student.imageUrl} height="200" width="200" />
            <br />
            <div><Link to={`/students/${student.id}`} id="students-on-campus">{student.firstName} {student.lastName}</Link></div>
            <Link to={`/students/${student.id}/unregister`}>
              <button type="button" onClick={(e) => this.handleUnregister(student.id, e)}className="btn btn-primary btn-sm m-3 col-5 float-right">unregister</button>
            </Link>
          </li>))
        }
        </div>
      </ul>)
    }
    
    if (this.props.loading) return <h1>Loading!!!</h1>
    
    return (
      <section className="portfolio-details">
        <div className="container">
          <div className="portfolio-details-container">
            <div className="owl-carousel portfolio-details-carousel">
              <img src={campusImg} className="img-fluid" alt="" width="90%" />
            </div>
            
            <div className="portfolio-info">
              <h2>{campus.name}</h2>
              <ul>
                <li><strong>Address:</strong> {campus.address}</li>
                <li>
                  <Link to={`/campuses/${campus.id}/edit`}>
                  <button type="button" className="btn btn-success btn-sm m-3 float-right">edit</button>
                  </Link>
                </li>
              </ul>
              {/* <p className="col-sm">{campus.address}</p> */}
            </div>
          </div>
          
          <div className="portfolio-description">
          <p className="col-sm">{campus.description}</p>
          </div>
          
          <br />
          <h2 id="students-list-single-camp">Students on campus</h2>
          {studentList}
        </div>
      </section>

    )
  }
}

const mapState = state => {
  return {
    campus: state.campus.singleCampus,
    loading: state.campus.loading
  };
};

const mapDispatch = dispatch => {
  return {
    getSingleCampusFromStore: (id) => dispatch(fetchSingleCampus(id)),
    unregister: (id) => dispatch(unregisterFromServer(id))
  };
};

export default connect(mapState, mapDispatch)(SingleCampus)

