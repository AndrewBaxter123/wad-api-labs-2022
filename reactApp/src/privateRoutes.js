//This component uses the AuthContext to check if a user is authenticated. If not, a <redirect > element configured for login page is returned.

import React, { useContext} from "react";
import { Route, Redirect } from "react-router-dom";
import {AuthContext} from './authContext'

const PrivateRoute = props => {
  const context = useContext(AuthContext)
  // Destructure props from <privateRoute> 
  const { component: Component, ...rest } = props;
  console.log(props.location)
  return context.isAuthenticated === true ? (
    <Route {...rest} render={props => <Component {...props} />} />
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: props.location }
      }}
    />
  );
};

export default PrivateRoute;