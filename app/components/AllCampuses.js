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
    if (this.props.loading) return <h1>Loading!!!</h1>
    
    return (
      <div className="container">
        <div className="row align-items-center">
          <h2 className="col-9 mt-3">All Campuses</h2>
          <div className="col-3">
            <Link to="/campuses/addCampus">
              <button type="button" className="btn btn-success btn-sm mt-3">
                Add Campus
              </button>
            </Link>
          </div>
        </div>
        
        <div className="row justify-content-around">
          {campuses.map((campus) => (
            <div key={campus.id} className="border border-secondary m-2">
              <div className="col-50">
              <img className="float-left mr-2" src={campus.imageUrl} height="200" width="200" />
              <p className="float-right mr-5">
                <Link to={`/campuses/${campus.id}`}>
                  {campus.name}
                </Link>
              </p> <br />
              <button
              type="button" className="btn btn-dark btn-sm float-right mr-2"
              onClick={(e) => this.handleClickDelete(campus.id, e)}>
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
    campuses: state.campuses.all,
    loading: state.campuses.loading
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCampusesFromStore: () => dispatch(fetchCampuses()),
    deleteCampus: (id) => dispatch(fetchDeleteCampus(id))
  };
};

export default connect(mapState, mapDispatch)(AllCampuses);
