import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCampuses, fetchDeleteCampus } from "../redux/campuses";

// Notice that we're exporting the AllCampuses component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllCampuses extends React.Component {
  componentDidMount() {
    this.props.getCampusesFromStore();
    
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }
  
  handleClickDelete(id, e) {
    e.preventDefault();
    this.props.deleteCampus(id);
  }
  
  render() {
    const {campuses} = this.props
    console.log(this.props);
    
    return (
      <div>
        <center>
        <h2>All Campuses</h2>
        <div>
          {campuses.map((campus) => (
            <div key={campus.id}>
              <h3><Link to={`/campuses/${campus.id}`}>{campus.name}</Link></h3>
              <img src={campus.imageUrl} height="400" width="400" />
              <button type="button" onClick={(e) => this.handleClickDelete(campus.id, e)}>delete</button>
            </div>
          ))}
        </div>
        <Link to="/campuses/addCampus"><button type="button">Add Campus</button></Link>
        </center>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    campuses: state.campuses.all
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCampusesFromStore: () => dispatch(fetchCampuses()),
    deleteCampus: (id) => dispatch(fetchDeleteCampus(id))
  };
};

export default connect(mapState, mapDispatch)(AllCampuses);
