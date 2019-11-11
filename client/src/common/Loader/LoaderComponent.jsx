import React from 'react';

import './LoaderComponent.css'

const LoaderComponent = ({ show, children }) => show ?
  (<div className="loader__container">
    <div className="loader__spinner" />
  </div>
  ) :
  (<React.Fragment>{children}</React.Fragment>);

export default LoaderComponent;
