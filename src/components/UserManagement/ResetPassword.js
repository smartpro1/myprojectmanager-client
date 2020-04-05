import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { resetPassword } from '../../actions/securityActions';

class ResetPassword extends Component {

    constructor() {
        super();

        this.state = {
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
        const { password, confirmPassword } = this.state;
        const token = this.props.location.search.substr(7);
        const userPassDetails = { password, confirmPassword, token };
        const { resetPassword, history } = this.props;
        resetPassword(userPassDetails, history);

    };

    componentWillReceiveProps = nextProps => {
        if (nextProps.errors) {
            const { password, confirmPassword } = this.state;
            this.setState({
                password,
                confirmPassword,
                errors: nextProps.errors
            });
        }
    };

    render() {
        const { password, confirmPassword, errors } = this.state;
        return (
            <div className="reset-password">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Reset Password</h1>
                            <p className="lead text-center">Make sure both passwords match</p>
                            <form onSubmit={this.handleOnSubmit}>
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
        )
    }
}

ResetPassword.propTypes = {
    resetPassword: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, { resetPassword })(ResetPassword);