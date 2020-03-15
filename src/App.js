import React from "react";
import Dashboard from "./Dashboard";
import Header from "./components/Layout/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import UpdateProject from "./components/Project/UpdateProject";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/addProject" component={AddProject} />
        <Route exact path="/updateProject/:id" component={UpdateProject} />
      </div>
    </Router>
  );
}

export default App;
