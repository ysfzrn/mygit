import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../actions";
import { bindActionCreators } from "redux";
import { app } from "../store";

export function requireAuthentication(Component) {
  class PrivateRoute extends React.Component {
    /*shouldComponentUpdate(nextProps) {
      // performance workaround until react-router-redux fixes https://github.com/reactjs/react-router-redux/issues/481
      return nextProps.location.action === "POP";
    }*/

    componentDidMount() {
      this.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth();
    }

    checkAuth = () => {
      const { toLogin, auth } = this.props;
      app
        .authenticate({
          type: "token",
          token: auth.token
        })
        .then(function(result) {
          console.log("Authenticated");
        })
        .catch(function(error) {
          toLogin();
        });
    };

    render() {
      return (
        <div>
          {this.props.auth.data ? <Component {...this.props} /> : <div />}
        </div>
      );
    }
  }

  const mapStateToProps = state => ({
    auth: state.auth
  });

  const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(actionCreators, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
}
