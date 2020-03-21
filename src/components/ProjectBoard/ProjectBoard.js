import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "../../actions/backlogActions";
import Backlog from "./Backlog";

class ProjectBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {}
    };
  }

  componentDidMount = () => {
    const { id } = this.props.match.params;
    const { getBacklog } = this.props;
    getBacklog(id);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  render() {
    const { id } = this.props.match.params;
    const { projectTasks } = this.props.backlog;
    const { errors } = this.state;

    const displayProjectTasks = (err, task) => {
      if (projectTasks.length === 0) {
        if (err.projectIdentifier) {
          return (
            <div
              className="container alert alert-danger text-center"
              role="alert"
            >
              {err.projectIdentifier}
            </div>
          );
        } else {
          return (
            <div
              className="container alert alert-info text-center"
              role="alert"
            >
              There are no project task for this project yet
            </div>
          );
        }
      } else {
        return (
          <div className="container">
            <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
              <i className="fas fa-plus-circle"> Create Project Task</i>
            </Link>
            <br />
            <hr />
            <Backlog projectTasks={projectTasks} />
          </div>
        );
      }
    };

    return displayProjectTasks(errors, projectTasks);
  }
}

ProjectBoard.propTypes = {
  getBacklog: PropTypes.func.isRequired,
  backlog: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  backlog: state.backlog,
  errors: state.errors
});
export default connect(mapStateToProps, { getBacklog })(ProjectBoard);
