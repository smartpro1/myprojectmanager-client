import React, { Component } from "react";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      fullname: "",
      username: "",
      password: "",
      confirmPassword: ""
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

    console.log(newUser);
  };

  render() {
    const { fullname, username, password, confirmPassword } = this.state;
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
                    className="form-control form-control-lg"
                    placeholder="fullname"
                    name="fullname"
                    value={fullname}
                    onChange={this.handleOnChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="username"
                    value={username}
                    onChange={this.handleOnChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={this.handleOnChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={this.handleOnChange}
                    required
                  />
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

export default Register;
