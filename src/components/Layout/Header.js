import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/securityActions";

class Header extends Component {
  logout = () => {
    this.props.logoutUser();
    window.location.href = "/";
  };

  render() {
    const { userCredentials, isValidToken } = this.props.user;

    let header = (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    );

    if (isValidToken && userCredentials) {
      header = (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="">
                <i className="fas fa-user-circle mr-1" />{" "}
                {userCredentials.fullname}
              </Link>
            </li>
            <li className="nav-item" onClick={this.logout}>
              <Link className="nav-link" to="">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      );
    }

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-info mb-5">
        <div className="container">
          <Link className="navbar-brand" to="/">
            MyProjectManager
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {header}
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps, { logoutUser })(Header);
