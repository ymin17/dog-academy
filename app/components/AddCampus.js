import React, {Component} from "react";
import { connect } from "react-redux";
import { fetchAddCampus } from "../redux/campuses";

export class AddCampus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      address: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({[ event.target.name ]: event.target.value});
  }
  
  handleSubmit(event) {
    event.preventDefault();
    this.props.addCampus(this.state.name, this.state.address);
    this.setState({name: '', address: ''});
  }
  
  render() {
    const { name, address } = this.state;
    if (this.props.loading) return <h2>Loading...</h2>
    return (
      <section id="contact" className="contact">
        <div className="container">
        <div className="col-lg-12" data-aos="fade-up">
        <h2>New Campus Form</h2>
        <form onSubmit={this.handleSubmit} className="php-email-form">
          
          <div className="form-row">
            <div className="col-lg-6 form-group">
              <label className="m-3">Campus Name: </label>
              <div className="col-50 ml-3">
              <input type="text" name="name" value={name} onChange={this.handleChange} className="form-control" />
              <br />
              </div>
            </div>
            
            <div className="col-lg-6 form-group">
              <label className="m-3">Campus Address: </label>
              <div className="ml-3">
              <input type="text" name="address" value={address} onChange={this.handleChange} className="form-control" />
              <br />
              </div>
            </div>
            
          </div>
          <button type="submit" className="btn btn-primary m-3">submit</button>
        </form>
        </div>
        </div>
      </section>
    )
  }
}

const mapState = state => {
  return {
    loading: state.campuses.loading
  };
};

const mapDispatch = (dispatch) => {
  return {
    addCampus: (name, address) => dispatch(fetchAddCampus(name, address))
  };
};

export default connect(mapState, mapDispatch)(AddCampus)
