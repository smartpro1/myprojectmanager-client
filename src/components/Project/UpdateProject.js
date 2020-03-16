import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { getProject, updateProject } from "../../actions/projectActions";

class UpdateProject extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      projectName: "",
      projectIdentifier: "",
      description: "",
      start_date: "",
      end_date: "",
      errors: {}
    };
  }

  componentDidMount = async () => {
    const { id } = this.props.match.params;
    await this.props.getProject(id);
    const { project } = this.props.projects;

    this.setState({
      projectName: project.projectName,
      projectIdentifier: project.projectIdentifier,
      description: project.description,
      start_date: project.start_date,
      end_date: project.end_date
    });
  };

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleOnSubmit = event => {
    event.preventDefault();
    const {
      projectName,
      projectIdentifier,
      description,
      start_date,
      end_date
    } = this.state;

    const { project } = this.props.projects;
    const updateProject = {
      id: project.id,
      projectName,
      projectIdentifier,
      description,
      start_date,
      end_date
    };
    this.props.updateProject(
      projectIdentifier,
      updateProject,
      this.props.history
    );
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    console.log(nextProps.errors);
  };

  render() {
    //    const { project } = this.props.projects;

    const {
      projectName,
      projectIdentifier,
      description,
      start_date,
      end_date,
      errors
    } = this.state;
    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center"> Edit Project form</h5>
              <hr />
              <form onSubmit={this.handleOnSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.projectName
                    })}
                    placeholder="Project Name"
                    value={projectName}
                    name="projectName"
                    onChange={this.handleOnChange}
                    required
                  />
                  {errors.projectName && (
                    <div className="invalid-feedback">{errors.projectName}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Unique Project ID"
                    name="projectIdentifier"
                    value={projectIdentifier}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.description
                    })}
                    placeholder="Project Description"
                    value={description}
                    name="description"
                    onChange={this.handleOnChange}
                    required
                  ></textarea>
                  {errors.projectName && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>
                <h6>Start Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="start_date"
                    value={start_date}
                    onChange={this.handleOnChange}
                  />
                </div>
                <h6>Estimated End Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="end_date"
                    value={end_date}
                    onChange={this.handleOnChange}
                  />
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

UpdateProject.propTypes = {
  getProject: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired,
  updateProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  projects: state.projects,
  errors: state.errors
  // this.props.project =>> const {project} = this.props.projects =>> state.projects.project
});
export default connect(mapStateToProps, { getProject, updateProject })(
  UpdateProject
);
