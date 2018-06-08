import React, { Component } from 'react';
import {
  ControlLabel,
  FormGroup,
  FormControl,
  HelpBlock,
} from 'react-bootstrap';
import { connect } from 'react-redux';

import CommonModal from '../../common/CommonModal/CommonModal';
import './Signup.css';
import { signupValidator } from '../../utils/signupValidation';

import { signupUser } from '../../actions/authAction';

/**
 *
 * @returns {JSX} JSX
 * @class Signup
 * @extends {Component}
 */
class Signup extends Component {
  /**
   * Creates an instance of Signup.
   * @param {any} props
   * @memberof Signup
   */
  constructor(props) {
    super(props);
    this.state = {
      error: {},
      showModal: false,
      formDetails: {
        confirmPassword: '',
        email: '',
        password: '',
        username: '',
      },
    };
  }
  /**
   * @returns {null} null
   * @memberof Signup
   */
  componentDidMount() {
    this.setState({
      showModal: this.props.showModal
    });
  }
  /**
   * @param {Object} nextProps the next properties
   * @returns {null} null
   * @memberof Signup
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      showModal: nextProps.showModal
    });
  }
  /** Closes the modal
   * @returns {*} null
   * @memberof Signup
   */
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
      error: {
        ...this.state.error,
        password: 'Passwords do not match, please re-confirm'
      }
    });
  }

  validateSignupForm = () => {
    const validationError = signupValidator(this.state.formDetails);
    if (Object.keys(validationError).length !== 0) {
      this.setState({ error: validationError });
      return false;
    }
    return true;
  }

  handleSubmit = () => {
    if (this.passwordConfirmation()) {
      if (this.validateSignupForm()) {
        this.props.signupUser(this.state.formDetails);
        this.handleClose();
      }
    } else {
      this.showPasswordError();
    }
  }
  /** @description sets changed field to state
   *
   * @returns {*} null
   * @param {object} event
   * @memberof Signup
   */
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
    const signupForm = (
      <div>
        <FormGroup
          validationState={this.getValidationState}
        >
          <ControlLabel>Email</ControlLabel>
          <FormControl
            name="email"
            onChange={this.handleChange}
            placeholder="E.g example@yahoo.com"
            type="text"
            value={email}
          />
          <HelpBlock>
            {this.state.error.email}
          </HelpBlock>
        </FormGroup>
        <FormGroup
          validationState={this.getValidationState}
        >
          <ControlLabel>Username</ControlLabel>
          <FormControl
            name="username"
            onChange={this.handleChange}
            placeholder="Username must be 3 characters or more"
            type="text"
            value={username}
          />
          <HelpBlock>
            {this.state.error.username}
          </HelpBlock>
        </FormGroup>
        <FormGroup
          validationState={this.getValidationState}
        >
          <ControlLabel>Password</ControlLabel>
          <FormControl
            name="password"
            onChange={this.handleChange}
            placeholder="Password must be more than 6 characters"
            type="password"
            value={password}
          />
          <HelpBlock>
            {this.state.error.password}
          </HelpBlock>
        </FormGroup>
        <FormGroup
          validationState={this.getValidationState}
        >
          <ControlLabel>Confirm password</ControlLabel>
          <FormControl
            name="confirmPassword"
            onChange={this.handleChange}
            placeholder="Re-enter password here"
            type="password"
            value={confirmPassword}
          />
          <HelpBlock>
            {this.state.error.password}
          </HelpBlock>
        </FormGroup>
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

/** @description connect the state from the store to the component props
 *
 * @param {object} state
 * @returns {string} error message
 */
const mapStateToProps = state => ({
  errorMessage: state.authReducer.error
});

export default connect(mapStateToProps, { signupUser })(Signup);
