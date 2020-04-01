import React, {Component} from "react";
import { connect } from "react-redux";
import { fetchUpdateCampus } from "../redux/singleCampus";

export class UpdateCampus extends Component {
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
    const id = this.props.match.params.campusId;
    //post req
    this.props.updateCampus(id, this.state.name, this.state.address);
    this.setState({name: '', address: ''});
  }
  
  render() {
    const { name, address } = this.state;
    console.log('this.state: ', this.state);
    console.log('this.props: ', this.props)
    return (
      <div>
        <h2>Edit Campus Form</h2>
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
    updateCampus: (id, name, address) => dispatch(fetchUpdateCampus(id, name, address))
  };
};

export default connect(null, mapDispatch)(UpdateCampus)
