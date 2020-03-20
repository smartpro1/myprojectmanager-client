import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "../../actions/backlogActions";
import Backlog from "./Backlog";

class ProjectBoard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    const { id } = this.props.match.params;
    const { getBacklog } = this.props;
    getBacklog(id);
    // this.props.getBacklog(id);
  };

  render() {
    const { id } = this.props.match.params;
    return (
      <div className="container">
        <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />
        <Backlog />
      </div>
    );
  }
}

ProjectBoard.propTypes = {
  getBacklog: PropTypes.func.isRequired,
  backlog: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  backlog: state.backlog
});
export default connect(mapStateToProps, { getBacklog })(ProjectBoard);
