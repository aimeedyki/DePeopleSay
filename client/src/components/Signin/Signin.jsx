import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CommonModal from '../../common/CommonModal/CommonModal';
import { signinValidator } from '../../utils/signinValidation';
import { signinUser } from '../../actions/authAction';
import routes from '../../routes';

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
  }

  handleSubmit = () => {
    if (signinValidator(this.state.formDetails).isValid) {
      this.props.signinUser(this.state.formDetails).then((response) => {
        if (response) {
          this.handleClose();
          this.props.history.push(routes.home);
        }
      });
    } else {
      this.setState({ error: signinValidator(this.state.formDetails).error });
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

  render() {
    const { password, username } = this.state.formDetails;
    const {
      password: passwordError,
      username: usernameError
    } = this.state.error;

    const signinForm = (
      <Form>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            onChange={this.handleChange}
            placeholder="Enter username here"
            type="text"
            value={username}
            isInvalid={!!usernameError}
          />
          <Form.Control.Feedback type="invalid">
            {usernameError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            onChange={this.handleChange}
            placeholder="Enter password here"
            type="password"
            value={password}
            isInvalid={!!passwordError}
          />
          <Form.Control.Feedback type="invalid">
            {!!passwordError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Control.Feedback type="invalid">
          {this.props.errorMessage}
        </Form.Control.Feedback>
      </Form>
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

const mapStateToProps = state => ({
  errorMessage: state.authReducer.error
});

export default connect(mapStateToProps, { signinUser })(withRouter(Signin));
