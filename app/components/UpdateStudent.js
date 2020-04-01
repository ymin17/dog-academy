import React, {Component} from "react";
import { connect } from "react-redux";
import { fetchUpdateStudent } from "../redux/singleStudent";

export class UpdateStudent extends Component {
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
    const id = this.props.match.params.studentId;
    //post req
    this.props.updateStudent(id, this.state.firstName, this.state.lastName, this.state.email);
    this.setState({firstName: '', lastName: '', email: ''});
  }
  
  render() {
    const { firstName, lastName, email } = this.state;
    console.log('this.state: ', this.state);
    console.log('this.props: ', this.props)
    return (
      <div>
        <h2>Edit Student Form</h2>
        <form onSubmit={this.handleSubmit}>
          <label>First Name: </label>
          <input type="text" name="firstName" value={firstName} onChange={this.handleChange} />
          <br />
          <label>Last Name: </label>
          <input type="text" name="lastName" value={lastName} onChange={this.handleChange} />
          <br />
          <label>Email: </label>
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
    updateStudent: (id, firstName, lastName, email) => dispatch(fetchUpdateStudent(id, firstName, lastName, email))
  };
};

export default connect(null, mapDispatch)(UpdateStudent)
