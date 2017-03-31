import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../actions";
import { Route } from "react-router-dom";
import App from "./App";
import Profile from "./Profile";
import Issue from "./Issue";
import { AppBar } from "../components";
import styled from "styled-components";
import ProjectPlan from "./ProjectPlan";
import IssueView from "./IssueView";

const Announce = () => <h1>Announce</h1>;
class Template extends Component {
  handleToPush = to => {
    const { toPush } = this.props;
    toPush(to);
  };

  handleLogOut = () => {
    const { logout } = this.props;
    logout();
  };
  render() {
    const { auth } = this.props;
    return (
      <Container className="col col-xs-12" style={{ padding: 0 }}>
        <AppBarContainer>
          <AppBar
            auth={auth}
            handleToPush={this.handleToPush}
            handleLogOut={this.handleLogOut}
          />
        </AppBarContainer>
        <MainContainer className="col col-xs-12" style={{ padding: '48px 0' }}>
          <Route exact path="/app" component={App} />
          <Route path="/app/issue" component={Issue} />
          <Route path="/app/announce" component={Announce} />
          <Route path="/app/profile" component={Profile} />
          <Route path="/app/projectplan" component={ProjectPlan} />
          <Route path="/app/issueview/:id" component={IssueView} />
        </MainContainer>

      </Container>
    );
  }
}

const Container = styled.div`
   display:flex;
   flex:1;
   flex-direction:column;
   min-height:600px;
   align-items:center;
`;

const AppBarContainer = styled.div`
    position:fixed;
    top:0;
    left:0;
    right:0;
    z-index:1000;
`;

const MainContainer = styled.div`
    background-color:#eeeeee;
`;

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Template);
