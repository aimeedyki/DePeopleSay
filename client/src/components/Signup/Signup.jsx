import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CommonModal from '../../common/CommonModal/CommonModal';
import { signupValidator } from '../../utils/signupValidation';
import { signupUser } from '../../actions/authAction';
import routes from '../../routes';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      showModal: false,
      formDetails: {
        confirmPassword: '',
        email: '',
        password: '',
        username: '',
      },
    };
  }

  componentDidMount() {
    this.setState({
      showModal: this.props.showModal
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showModal: nextProps.showModal
    });
  }

  handleClose = () => {
    this.setState({
      showModal: false
    });
    this.props.hideModal('showSignupForm');
  }

  passwordConfirmation = () => {
    const { confirmPassword, password } = this.state.formDetails;
    if (confirmPassword !== password) {
      return false;
    }
    return true;
  }

  showPasswordError = () => {
    this.setState({
      errors: {
        ...this.state.errors,
        password: 'Passwords do not match, please re-confirm'
      }
    });
  }

  validateSignupForm = () => {
    const validationError = signupValidator(this.state.formDetails);
    if (Object.keys(validationError).length !== 0) {
      this.setState({ errors: validationError });
      return false;
    }
    return true;
  }

  handleSubmit = () => {
    if (this.passwordConfirmation()) {
      if (this.validateSignupForm()) {
        this.props.signupUser(this.state.formDetails)
          .then((response) => {
            if (response) {
              this.handleClose();
              this.props.history.push(routes.home);
            }
          });
      }
    } else {
      this.showPasswordError();
    }
  }

  handleChange = (event) => {
    this.setState({
      formDetails: {
        ...this.state.formDetails,
        [event.target.name]: event.target.value
      }
    });
  }
  /**
   * @returns {JSX} JSX
   * @memberof Signup
   */
  render() {
    const {
      confirmPassword, email, password, username
    } = this.state.formDetails;
    const {
      email: emailError,
      username: userNameError,
      password: passwordError
    } = this.state.errors;

    const signupForm = (
      <div>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            onChange={this.handleChange}
            placeholder="E.g example@yahoo.com"
            type="text"
            value={email}
            isInvalid={!!emailError}
          />
          <Form.Control.Feedback type="invalid">
            {emailError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            onChange={this.handleChange}
            placeholder="Username must be 3 characters or more"
            type="text"
            value={username}
            isInvalid={!!userNameError}
          />
          <Form.Control.Feedback type="invalid">
            {userNameError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            onChange={this.handleChange}
            placeholder="Password must be more than 6 characters"
            type="password"
            value={password}
            isInvalid={!!passwordError}
          />
          <Form.Control.Feedback type="invalid">
            {passwordError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            name="confirmPassword"
            onChange={this.handleChange}
            placeholder="Re-enter password here"
            type="password"
            value={confirmPassword}
            isInvalid={!!passwordError}
          />
          <Form.Control.Feedback type="invalid">
            {passwordError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Control.Feedback type="invalid">
            {this.props.errorMessage}
          </Form.Control.Feedback>
      </div>
    );

    return (
      <CommonModal
        customClass={'signup-modal'}
        close={this.handleClose}
        content={signupForm}
        ctAction={this.handleSubmit}
        ctaTitle={'Sign up'}
        show={this.state.showModal}
        title={'Sign up'}
      />
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.authReducer.error
});

export default connect(mapStateToProps, { signupUser })(withRouter(Signup));
