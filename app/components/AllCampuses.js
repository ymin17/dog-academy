import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCampuses, fetchDeleteCampus } from "../redux/campuses";
import { BiLinkExternal } from 'react-icons/fa';

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
      <section id="portfolio" className="portfolio section-bg">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          
          <div className="section-title">
            <h2>All Campuses</h2>
            <div className="col-3">
              <Link to="/campuses/addCampus">
                <button type="button" className="btn btn-success btn-sm mt-3">
                  Add Campus
                </button>
              </Link>
            </div>
          </div>
          
          <div className="row portfolio-container">
            {campuses.map((campus) => (
              <div key={campus.id} className="col-lg-4 col-md-6 portfolio-item">
                <div className="portfolio-wrap">
                  <img className="img-fluid" src={campus.imageUrl} height="250" width="320" />
                  <div className="portfolio-info">
                    <h4>{campus.name}</h4>
                    <div className="portfolio-links">
                    
                      <Link to={`/campuses/${campus.id}`}> 
                        <span className="glyphicon glyphicon-eye-open"></span>
                      </Link>
                  
                    </div>
                  <br />
                  <button
                  type="button" className="btn btn-dark btn-sm float-right mr-2"
                  onClick={(e) => this.handleClickDelete(campus.id, e)}>
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
