import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { forgotPassword } from '../../actions/securityActions';

class ForgotPassword extends Component {

    constructor() {
        super();

        this.state = {
            username: "",
            errors: {},
            displaySpinner: false
        };
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors,
                displaySpinner: false
            });
        }
    };

    handleOnChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleOnSubmit = event => {
        event.preventDefault();
        this.setState({ displaySpinner: true });
        const email = this.state.username;
        const userEmail = { email };
        const { forgotPassword, history } = this.props;
        forgotPassword(userEmail, history);
    };

    render() {
        const { username, errors, displaySpinner } = this.state;
        console.log(displaySpinner);
        if (displaySpinner) {
            return (
                <div className="text-center">
                    <p className='spinner-border text-primary  my-3'></p>
                    <p className="my-2">Processing...</p>
                </div>
            );
        }

        return (
            <div className="forgot-password">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center mb-4">Enter email to reset password</h1>

                            <form onSubmit={this.handleOnSubmit}>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.projectIdentifier
                                        })}
                                        placeholder="Email Address"
                                        name="username"
                                        value={username}
                                        onChange={this.handleOnChange}
                                        required
                                    />
                                    {errors.projectIdentifier && (
                                        <div className="invalid-feedback">{errors.projectIdentifier}</div>
                                    )}
                                </div>

                                <input
                                    type="submit"
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ForgotPassword.propTypes = {
    forgotPassword: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, { forgotPassword })(ForgotPassword);
