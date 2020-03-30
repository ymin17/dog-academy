import React from "react";
import { connect } from "react-redux";
import { fetchCampuses } from "../redux/campuses"

// Notice that we're exporting the AllCampuses component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllCampuses extends React.Component {
  componentDidMount() {
    this.props.getCampusesFromStore()
  }
  render() {
    const {campuses, fetchCampuses} = this.props
    console.log(this.props);
    
    return (
      <div>
        <center>
        <h2>All Campuses</h2>
          <div>
            {campuses.map(campus => (
              <div key={campus.id}>
                <h3>{campus.name}</h3>
                <img src={campus.imageUrl} height="400" width="400" />
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
    campuses: state.campuses.campuses
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCampusesFromStore: () => dispatch(fetchCampuses())
  };
};

export default connect(mapState, mapDispatch)(AllCampuses);
