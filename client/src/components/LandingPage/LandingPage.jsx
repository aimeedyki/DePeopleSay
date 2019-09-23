import React, { Component } from 'react';
import { Button, Image } from 'react-bootstrap';

import './LandingPage.css';
import Signin from '../Signin/Signin';
import Signup from '../Signup/Signup';
import GoogleLogo from '../../assets/google-logo.svg';
import FacebookLogo from '../../assets/Facebook__logo.svg';
import TwitterLogo from '../../assets/Twitter_Icon.svg';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSigninForm: false,
      showSignupForm: false
    };
  }

  showSigninModal = () => {
    this.setState({
      showSigninForm: true
    });
  }

  showSignupModal = () => {
    this.setState({
      showSignupForm: true
    });
  }

  hideModal = (form) => {
    this.setState({
      [form]: false
    });
  }

  render() {
    return (
      <div className="landing__background">
        <div className="landing__overlay container-fluid">
          <Signin
            showModal={this.state.showSigninForm}
            hideModal={this.hideModal}
          />
          <Signup
            showModal={this.state.showSignupForm}
            hideModal={this.hideModal}
          />
          <div>
            <div className="landing__header">
              <h1 className="brand-name">Opinipoll</h1>
              <Button className="sign-in" onClick={this.showSigninModal}>
                Sign in
            </Button>
            </div>
            <div className="landing__body">
              <h2>Take and create fun opinion polls</h2>
              <Button className="start-button" onClick={this.showSignupModal}>
                Get started
            </Button>
              <div className="social-buttons">
                <Button className="google-social social-button">
                  <Image src={GoogleLogo} />
                </Button>
                <Button className="facebook-social social-button">
                  <Image src={FacebookLogo} className="facebook-logo" />
                </Button>
                <Button className="social-button">
                  <Image src={TwitterLogo} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
