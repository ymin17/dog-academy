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
    this.props.updateStudent(id, this.state.firstName, this.state.lastName, this.state.email);
    this.setState({firstName: '', lastName: '', email: ''});
  }
  
  render() {
    const { firstName, lastName, email } = this.state;
    if (this.props.loading) return <h1>Loading!!!</h1>
    
    return (
      <section id="contact" className="contact">
        <div className="container">
          <div className="col-lg-12" data-aos="fade-up">
            <h2>Edit Student Form</h2>
            <form onSubmit={this.handleSubmit} className="php-email-form">
            <div className="form-row">
              <div className="form-group col-lg-6">
                <label className="m-3">First Name: </label>
                <input type="text" name="firstName" value={firstName} onChange={this.handleChange} className="form-control" placeholder="First Name" />
              </div>
              
              <div className="form-group col-lg-6">
                <label className="m-3">Last Name: </label>
                <input type="text" name="lastName" value={lastName} onChange={this.handleChange} className="form-control" placeholder="Last Name" />
              </div>

              <div className="form-group col-lg-6">
                <label className="m-3">Email: </label>
                <input type="text" name="email" value={email} onChange={this.handleChange} className="form-control" aria-describedby="emailHelp" placeholder="Enter email" />
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
    loading: state.student.loading
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateStudent: (id, firstName, lastName, email) => dispatch(fetchUpdateStudent(id, firstName, lastName, email))
  };
};

export default connect(mapState, mapDispatch)(UpdateStudent)
