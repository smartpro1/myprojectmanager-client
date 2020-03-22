import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteProjectTask } from "../../../actions/backlogActions";

class ProjectTask extends Component {
  render() {
    const { projectTask } = this.props;

    let priorityClass = "",
      priorityString = "";
    if (projectTask.priority === 1) {
      priorityClass = "bg-danger text-light";
      priorityString = "HIGH";
    } else if (projectTask.priority === 2) {
      priorityClass = "bg-info text-light";
      priorityString = "MEDIUM";
    } else {
      priorityClass = "bg-secondary text-light";
      priorityString = "LOW";
    }

    const {
      projectSequence,
      projectIdentifier,
      summary,
      acceptanceCriteria
    } = projectTask;

    return (
      <div className="card mb-1 bg-light">
        <div className={`card-header text-primary ${priorityClass}`}>
          ID: {projectSequence} -- Priority: {priorityString}
        </div>
        <div className="card-body bg-light">
          <h5 className="card-title">{summary}</h5>
          <p className="card-text text-truncate ">{acceptanceCriteria}</p>
          <Link
            to={`/updateProjectTask/${projectIdentifier}/${projectSequence}`}
            className="btn btn-primary"
          >
            View / Update
          </Link>

          <button
            className="btn btn-danger ml-4"
            onClick={() =>
              this.props.deleteProjectTask(projectIdentifier, projectSequence)
            }
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

ProjectTask.propTypes = {
  deleteProjectTask: PropTypes.func.isRequired
};

export default connect(null, { deleteProjectTask })(ProjectTask);
