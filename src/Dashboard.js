import React, { Component } from "react";
import ProjectItem from "./components/Project/ProjectItem";
import CreateProjectButton from "./components/Project/CreateProjectButton";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProjects } from "./actions/projectActions";

class Dashboard extends Component {
  componentDidMount = async () => {
    await this.props.getProjects();
  };

  componentWillReceiveProps = nextProps => {
    // console.log(nextProps);
  };

  render() {
    const { projects } = this.props.projects;

    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Projects</h1>
              <br />
              <CreateProjectButton />
              <br />
              <hr />
              {projects.map(project => (
                <ProjectItem project={project} key={project.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  projects: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  projects: state.projects
  //project: state.projects
});

export default connect(mapStateToProps, { getProjects })(Dashboard);
