import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from './Home'
import AllCampuses from './AllCampuses'
import AllStudents from './AllStudents'
import SingleCampus from './SingleCampus'
import SingleStudent from './SingleStudent'
import AddCampus from './AddCampus'
import AddStudent from './AddStudent'
import UpdateCampus from './UpdateCampus'
import UpdateStudent from './UpdateStudent'

const Routes = () => {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand">Margaret Hamilton Academy of Javascript</a>
            <ul className="nav justify-content-end">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/campuses">Campuses</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/students">Students</Link></li>
            </ul>
        </nav>
        
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/campuses" component={AllCampuses} />
          <Route exact path="/campuses/addCampus" component={AddCampus} />
          <Route exact path="/students" component={AllStudents} />
          <Route exact path="/students/addStudent" component={AddStudent} />
          <Route exact path="/campuses/:campusId" component={SingleCampus} />
          <Route exact path="/campuses/:campusId/edit" component={UpdateCampus} />
          <Route exact path="/students/:studentId" component={SingleStudent} />
          <Route exact path="/students/:studentId/edit" component={UpdateStudent} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
