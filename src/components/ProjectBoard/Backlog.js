import React, { Component } from "react";
import ProjectTask from "./ProjectTasks/ProjectTask";

class Backlog extends Component {
  render() {
    const { projectTasks } = this.props;

    const result = projectTasks.map(projectTask => (
      <ProjectTask key={projectTask.id} projectTask={projectTask} />
    ));

    let todoItems = [],
      inProgressItems = [],
      doneItems = [];
    for (let i = 0; i < result.length; i++) {
      if (result[i].props.projectTask.status === "TO_DO") {
        todoItems.push(result[i]);
      } else if (result[i].props.projectTask.status === "IN_PROGRESS") {
        inProgressItems.push(result[i]);
      } else {
        doneItems.push(result[i]);
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-info text-white">
                <h3>TO DO  <i className="fas fa-exclamation-circle pl-2" /></h3>
              </div>
            </div>

            {todoItems}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-warning text-white">
                <h3>In Progress  <i className="fas fa-folder-open pl-2" /></h3>
              </div>
            </div>
            {inProgressItems}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-success text-white">
                <h3>Done<i className="fas fa-check-circle pl-2" /></h3>
              </div>
            </div>
            {doneItems}
          </div>
        </div>
      </div>
    );
  }
}

export default Backlog;
