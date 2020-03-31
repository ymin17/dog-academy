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
    
    //post req
    this.props.addCampus(this.state.name, this.state.address);
    this.setState({name: '', address: ''});
  }
  
  render() {
    const { name, address } = this.state;
    return (
      <div>
        <h2>New Campus Form</h2>
        {/* <h3>Campus Name</h3> */}
        <form onSubmit={this.handleSubmit}>
          <label>Campus Name: </label>
          <input type="text" name="name" value={name} onChange={this.handleChange} />
          <br />
          <label>Campus Address: </label>
          <input type="text" name="address" value={address} onChange={this.handleChange} />
          <br />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    addCampus: (name, address) => dispatch(fetchAddCampus(name, address))
  };
};

export default connect(null, mapDispatch)(AddCampus)
