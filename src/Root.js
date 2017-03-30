import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { Route, Redirect } from "react-router-dom";
import store, { history } from "./store";
import { ThemeProvider } from "styled-components";
import { requireAuthentication } from "./containers/PrivateRoute";
import Template from "./containers/Template";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import { theme } from "./util/theme";

const Root = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <div>
            <Route exact path="/" render={() => <Redirect to="app" />} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/app" component={requireAuthentication(Template)} />
          </div>
        </ConnectedRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default Root;
