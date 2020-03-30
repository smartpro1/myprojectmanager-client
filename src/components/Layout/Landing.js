import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  render() {
    const { userCredentials, isValidToken } = this.props.user;

    let signUp = (
      <div>
        <h1 className="display-3 mb-4">Hi, I'm your project manager</h1>
        <p className="lead">
          <mark>Register</mark> or <mark>Login</mark> to effectively manage your
          projects and sub projects from
          <mark>start</mark> to <mark>finish</mark>
        </p>
        <hr />

        <Link to="/register" className="btn btn-outline-info btn-lg  mr-2">
          Register
        </Link>

        <Link to="/login" className="btn btn-lg btn-outline-success mr-2">
          Login
        </Link>
      </div>
    );
    if (isValidToken && userCredentials) {
      signUp = (
        <h1 className="display-3 mb-4">
          Hi, {userCredentials.fullname}, hope your task management is seamless!
        </h1>
      );
    }
    return (
      <div className="landing">
        <div className="light-overlay landing-inner text-dark">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">{signUp}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  user: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Landing);
