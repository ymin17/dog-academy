import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleCampus } from '../redux/singleCampus'

class SingleCampus extends React.Component {
  componentDidMount() {
    this.props.getSingleCampusFromStore(this.props.match.params.campusId)
  }
  render() {
    const {campus} = this.props
    const studentsInCampus = campus.students
    console.log('THIS.PROPS: ', this.props);
    console.log('CAMPUS: ', campus);
    console.log('STUDENTS IN CAMPUS: ', studentsInCampus)

    let studentList;
    if (!studentsInCampus) {
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
    getSingleCampusFromStore: (id) => dispatch(fetchSingleCampus(id))
  };
};

export default connect(mapState, mapDispatch)(SingleCampus)
