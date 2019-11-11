import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Loader from '../common/Loader';
import routes from '../routes';

const ProtectedRoute = ({
  component: Component,
  render,
  userLoggedIn,
  loadingUserData,
  ...rest
}) => (
  <Loader show={loadingUserData} autoCenter>
    <Route
      {...rest}
      render={({ location, ...props }) => {
        if (userLoggedIn) {
          return render ? (
            render(props)
          ) : (
            <Component {...props} location={location} />
          );
        }
        return (
          <Redirect
            to={{
              pathname: routes.landingPage,
              state: { from: location }
            }}
          />
        );
      }}
    />
  </Loader>
);

ProtectedRoute.propTypes = {
  component: PropTypes.func,
  userLoggedIn: PropTypes.bool,
  render: PropTypes.func,
  loadingUserData: PropTypes.bool.isRequired
};

ProtectedRoute.defaultProps = {
  userLoggedIn: false
};

const mapStateToProps = state => ({
  loadingUserData: state.authReducer.authLoading,
  userLoggedIn: state.authReducer.authenticated
});

export default withRouter(connect(mapStateToProps)(ProtectedRoute));
