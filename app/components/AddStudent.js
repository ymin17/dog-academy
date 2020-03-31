import React, {Component} from "react";
import { connect } from "react-redux";
import { fetchAddStudent } from "../redux/students";

export class AddStudent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
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
    this.props.addStudent(this.state.firstName, this.state.lastName, this.state.email);
    this.setState({firstName: '', lastName: '', email: ''});
  }
  
  render() {
    const { firstName, lastName, email } = this.state;
    return (
      <div>
        <h2>New Student Form</h2>

        <form onSubmit={this.handleSubmit}>
          <label>Student First Name: </label>
          <input type="text" name="firstName" value={firstName} onChange={this.handleChange} />
          <br />
          <label>Student Last Name: </label>
          <input type="text" name="lastName" value={lastName} onChange={this.handleChange} />
          <br />
          <label>Student Email: </label>
          <input type="text" name="email" value={email} onChange={this.handleChange} />
          <br />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    addStudent: (firstName, lastName, email) => dispatch(fetchAddStudent(firstName, lastName, email))
  };
};

export default connect(null, mapDispatch)(AddStudent)
