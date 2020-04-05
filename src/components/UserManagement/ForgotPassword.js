import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { forgotPassword } from '../../actions/securityActions';

class ForgotPassword extends Component {

    constructor() {
        super();

        this.state = {
            email: "",
            errors: {}
        };
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
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
        const { email } = this.state;
        const userEmail = { email };
        const { forgotPassword, history } = this.props;
        console.log(userEmail);
        forgotPassword(userEmail, history);
    };

    render() {
        const { email, errors } = this.state;
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
                                            "is-invalid": errors.username
                                        })}
                                        placeholder="Email Address"
                                        name="email"
                                        value={email}
                                        onChange={this.handleOnChange}
                                        required
                                    />
                                    {errors.email && (
                                        <div className="invalid-feedback">{errors.email}</div>
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
