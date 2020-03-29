import React from "react";
import Dashboard from "./Dashboard";
import Header from "./components/Layout/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
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

function App() {
  const jwtToken = localStorage.jwtToken;
  if (jwtToken) {
    setJwtToken(jwtToken);
    const decodedToken = jwtDecode(jwtToken);
    store.dispatch({
      type: LOGIN_USER,
      payload: decodedToken
    });

    const currentTime = Date.now();
    if (decodedToken.exp < currentTime) {
      console.log({ decodedToken });
      console.log({ currentTime });
      window.location.href = "/";
    }
  }
  return (
    <Router>
      <div className="App">
        <Header />
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/addProject" component={AddProject} />
        <Route exact path="/updateProject/:id" component={UpdateProject} />
        <Route exact path="/projectBoard/:id" component={ProjectBoard} />
        <Route exact path="/addProjectTask/:id" component={AddProjectTask} />
        <Route
          exact
          path="/updateProjectTask/:id/:id"
          component={UpdateProjectTask}
        />
      </div>
    </Router>
  );
}

export default App;
