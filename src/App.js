import React from "react";
import Dashboard from "./Dashboard";
import Header from "./components/Layout/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";
import Landing from "./components/Layout/Landing";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import jwtDecode from "jwt-decode";
import { setJwtToken } from "./securityUtils/setJwtToken";
import { LOGIN_USER } from "./actions/types";
import store from "./store";
import { logoutUser } from "./actions/securityActions";
import SecuredRoute from "./securityUtils/SecuredRoute";
import ForgotPassword from "./components/UserManagement/ForgotPassword";
import ResetPassword from "./components/UserManagement/ResetPassword";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  console.log("got here");
  setJwtToken(jwtToken);
  const decoded_Token = jwtDecode(jwtToken);
  store.dispatch({
    type: LOGIN_USER,
    payload: decoded_Token
  });

  const currentTime = Date.now() / 1000;
  if (decoded_Token.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/";
  }
}

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        {
          // public Routes
        }
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset" component={ResetPassword} />

        {
          // Private
        }
        <Switch>
          <SecuredRoute exact path="/dashboard" component={Dashboard} />
          <SecuredRoute exact path="/addProject" component={AddProject} />
          <SecuredRoute
            exact
            path="/updateProject/:id"
            component={UpdateProject}
          />
          <SecuredRoute
            exact
            path="/projectBoard/:id"
            component={ProjectBoard}
          />
          <SecuredRoute
            exact
            path="/addProjectTask/:id"
            component={AddProjectTask}
          />
          <SecuredRoute
            exact
            path="/updateProjectTask/:id/:id"
            component={UpdateProjectTask}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
