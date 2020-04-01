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
    console.log('STUDENT ID: ', studentId)
    this.props.unregister(studentId);
    console.log('this.props.campus: ', this.props.campus)
    this.props.getSingleCampusFromStore(this.props.match.params.campusId);
  }
  
  
  render() {
    const {campus} = this.props
    const studentsInCampus = campus.students
    console.log('THIS.PROPS: ', this.props);
    console.log('THIS.STATE: ', this.state);
    console.log('STUDENTS IN CAMPUS: ', studentsInCampus)
    
    let studentList;
    if (studentsInCampus === undefined || studentsInCampus.length === 0) {
        studentList = <p>There are no students currently registered to this campus.</p>
    } else {
    studentList = (
      <ul>
        {
          studentsInCampus.map(student => (
          <li key={student.id}>
            <img src={student.imageUrl} height="200" width="200" />
            <br />
            <div><Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link></div>
            
            <Link to={`/students/${student.id}/unregister`}><button type="button" onClick={(e) => this.handleUnregister(student.id, e)}>unregister</button></Link>
          </li>))
        }
      </ul>)
    }

    return (
      <div>
        <h2>{campus.name}</h2>
        <img src={campus.imgUrl} height="400" width="400" />
        <p>{campus.address}</p>
        <p>{campus.description}</p>
        
        <Link to={`/campuses/${campus.id}/edit`}><button type="button">edit</button></Link>
        
        <h2>Students on campus</h2>
        {studentList}
      </div>

    )
  }
}

const mapState = state => {
  return {
    campus: state.campus.singleCampus
  };
};

const mapDispatch = dispatch => {
  return {
    getSingleCampusFromStore: (id) => dispatch(fetchSingleCampus(id)),
    unregister: (id) => dispatch(unregisterFromServer(id))
  };
};

export default connect(mapState, mapDispatch)(SingleCampus)
