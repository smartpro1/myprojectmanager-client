import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  updateProjectTask,
  getProjectTask
} from "../../../actions/backlogActions";

class UpdateProjectTask extends Component {
  constructor(props) {
    super();

    this.state = {
      summary: "",
      acceptanceCriteria: "",
      status: "",
      priority: "",
      dueDate: "",
      errors: {}
    };
  }

  componentDidMount = async () => {
    const projectSequence = this.props.match.params.id;
    let { url } = this.props.match;
    let projectIdentifier = url.split("/");
    projectIdentifier = projectIdentifier[projectIdentifier.length - 2];
    await this.props.getProjectTask(projectIdentifier, projectSequence);

    const { projectTask } = this.props.backlog;
    const {
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate
    } = projectTask;

    this.setState({ summary, acceptanceCriteria, status, priority, dueDate });
  };

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleOnSubmit = event => {
    event.preventDefault();
    const projectSequence = this.props.match.params.id;
    let { url } = this.props.match;
    let projectIdentifier = url.split("/");
    projectIdentifier = projectIdentifier[projectIdentifier.length - 2];
    const { id } = this.props.backlog.projectTask;
    const { updateProjectTask, history } = this.props;
    console.log({ updateProjectTask, history });
    const {
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate
    } = this.state;
    const updateProjTask = {
      id,
      projectSequence,
      projectIdentifier,
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate
    };

    updateProjectTask(
      projectIdentifier,
      projectSequence,
      updateProjTask,
      history
    );
    console.log(updateProjTask);
  };

  render() {
    const {
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      errors
    } = this.state;

    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={``} className="btn btn-light">
                Back to Project Board
              </Link>
              <h4 className="display-4 text-center">Update Project Task</h4>
              <p className="lead text-center">Project Name + Project Code</p>
              <form onSubmit={this.handleOnSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="summary"
                    placeholder="Project Task summary"
                    value={summary}
                    onChange={this.handleOnChange}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={acceptanceCriteria}
                    onChange={this.handleOnChange}
                  ></textarea>
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    value={dueDate}
                    onChange={this.handleOnChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="priority"
                    value={priority}
                    onChange={this.handleOnChange}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={status}
                    onChange={this.handleOnChange}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateProjectTask.propTypes = {
  errors: PropTypes.object.isRequired,
  backlog: PropTypes.object.isRequired,
  updateProjectTask: PropTypes.func.isRequired,
  getProjectTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  backlog: state.backlog
});

export default connect(mapStateToProps, { updateProjectTask, getProjectTask })(
  UpdateProjectTask
);
