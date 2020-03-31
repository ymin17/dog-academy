import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import AllCampuses from './AllCampuses'
import AllStudents from './AllStudents'
import SingleCampus from './SingleCampus'
import SingleStudent from './SingleStudent'

const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          Welcome!
          <ul>
            <li><Link className="navlink" to="/campuses">Campuses</Link></li>
            <li><Link className="navlink" to="/students">Students</Link></li>
          </ul>
        </nav>
        
        <main>
          <h1>Welcome to the Margaret Hamilton Academy of JavaScript!</h1>
          <p>This seems like a nice place to get started with some Routes!</p>
        </main>
        
        <Switch>
          <Route exact path="/campuses" component={AllCampuses} />
          <Route exact path="/students" component={AllStudents} />
          <Route exact path="/campuses/:campusId" component={SingleCampus} />
          <Route exact path="/students/:studentId" component={SingleStudent} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
