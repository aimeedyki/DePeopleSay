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
      <div className="container-fluid landing-overlay landing-background">
        <Signin
          showModal={this.state.showSigninForm}
          hideModal={this.hideModal}
        />
        <Signup
          showModal={this.state.showSignupForm}
          hideModal={this.hideModal}
        />
        <div>
          <div className="landing-header">
            <h1 className="brand-name">Opinipoll</h1>
            <Button className="signin" onClick={this.showSigninModal}>
              Sign in
            </Button>
          </div>
          <div className="landing-body">
            <h2>Take and create fun opinion polls</h2>
            <Button className="start" onClick={this.showSignupModal}>
              Get started
            </Button>
            <div className="social">
              <Button className="google-social">
                <Image src={GoogleLogo} responsive />
              </Button>
              <Button className="facebook-social">
                <Image src={FacebookLogo} responsive />
              </Button>
              <Button>
                <Image src={TwitterLogo} responsive />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
