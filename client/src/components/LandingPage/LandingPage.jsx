import React from 'react';
import { Button, Image } from 'react-bootstrap';

import './LandingPage.css';
import GoogleLogo from '../../assets/google-logo.svg';
import FacebookLogo from '../../assets/Facebook__logo.svg';
import TwitterLogo from '../../assets/Twitter_Icon.svg';

const LandingPage = () => (
  <div className="container-fluid landing-overlay landing-background">
    <div className="">
      <div className="landing-header">
        <h1 className="brand-name">Opinipoll</h1>
        <Button className="signin">Sign in</Button>
      </div>
      <div className="landing-body">
        <h2>Take and create fun opinion polls</h2>
        <Button className="start">Get started</Button>
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

export default LandingPage;
