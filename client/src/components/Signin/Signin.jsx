import React, { Component } from 'react';
import {
  ControlLabel,
  FormGroup,
  FormControl,
  HelpBlock,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CommonModal from '../../common/CommonModal/CommonModal';
import { signinValidator } from '../../utils/signinValidation';
import './Signin.css';


import { signinUser } from '../../actions/authAction';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      formDetails: {
        username: '',
        password: '',
      },
      error: {},
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
    this.props.hideModal('showSigninForm');
    this.props.history.push('/home');
  }

  handleSubmit = () => {
    if (signinValidator(this.state.formDetails).isValid) {
      this.props.signinUser(this.state.formDetails);
      this.handleClose();
      // console.log('valid', this.state.formDetails);
    } else {
      this.setState({ error: signinValidator(this.state.formDetails).error });
    }
  }
  /** @description sets changed field to state
   *
   * @returns {*} null
   * @param {object} event
   * @memberof Signin
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
   * @memberof Signin
   */
  render() {
    const { password, username } = this.state.formDetails;
    const signinForm = (
      <div>
        <FormGroup
          validationState={this.getValidationState}
        >
          <ControlLabel>Username</ControlLabel>
          <FormControl
            name="username"
            onChange={this.handleChange}
            placeholder="Enter username here"
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
            placeholder="Enter password here"
            type="password"
            value={password}
          />
          <HelpBlock>
            {this.state.error.password}
          </HelpBlock>
        </FormGroup>
      </div>
    );
    return (
      < CommonModal
        customClass={'signin-modal'}
        close={this.handleClose}
        content={signinForm}
        ctAction={this.handleSubmit}
        ctaTitle={'Sign in'}
        show={this.state.showModal}
        title={'Sign in'}
      />
    );
  }
}

/** connects the state from the store to the component props
 *
 * @param {object} state
 * @returns {string} error message
 */
const mapStateToProps = state => ({
  errorMessage: state.authReducer.error
});

export default connect(mapStateToProps, { signinUser })(withRouter(Signin));
