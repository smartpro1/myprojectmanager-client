import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { registerUser } from "../../actions/securityActions";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
      errors: {}
    };
  }

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleOnSubmit = event => {
    event.preventDefault();
    const { fullname, username, password, confirmPassword } = this.state;
    const newUser = {
      fullname,
      username,
      password,
      confirmPassword
    };
    const { registerUser, history } = this.props;
    registerUser(newUser, history);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      const { fullname, password, confirmPassword } = this.state;
      this.setState({
        fullname,
        username: nextProps.errors.error,
        password,
        confirmPassword,
        errors: nextProps.errors
      });
    }
  };

  render() {
    const {
      fullname,
      username,
      password,
      confirmPassword,
      errors
    } = this.state;

    let errorText = "";
    if (errors.error) {
      errorText = "border-danger";
    }

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Account</p>
              <form onSubmit={this.handleOnSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.fullname
                    })}
                    placeholder="fullname"
                    name="fullname"
                    value={fullname}
                    onChange={this.handleOnChange}
                    required
                  />
                  {errors.fullname && (
                    <div className="invalid-feedback">{errors.fullname}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames(
                      `form-control form-control-lg ${errorText}`,
                      {
                        "is-invalid": errors.username
                      }
                    )}
                    placeholder="Email Address"
                    name="username"
                    value={username}
                    onChange={this.handleOnChange}
                    required
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={this.handleOnChange}
                    required
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.confirmPassword
                    })}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={this.handleOnChange}
                    required
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(mapStateToProps, { registerUser })(Register);
