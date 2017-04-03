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
import { app } from "../store";
import {HOST_URL} from '../util/api'

const Announce = () => <h1>Announce</h1>;
class Template extends Component {
  componentWillMount() {
    /*const issuesService = app.service("issues");
    if (issuesService.connection.disconnected) {
      issuesService.on("created", item => this.handleAddingIssue(item));
      issuesService.on("patched", item => this.handleIssueNotification(item));
    }*/
  }

  componentDidMount() {
    /*if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
    if (!Notification) {
      alert(
        " :( Masaüstü bildirimler bu browserda etkin değil. Lütfen Chrome kullanın!"
      );
    }*/
  }

  handleIssueNotification = (item) => {
    const statutext = item.status ? "tekrar açıldı" : "kapatıldı"
    var notification = new Notification('Issue kapatıldı', {
	      icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple71/v4/5f/4b/7b/5f4b7b1e-b30a-fe81-6e9a-19f9fea82717/source/256x256bb.jpg',
	      body: `${item.title} başlıklı issue ${statutext}`,
        tag:"uniqueTag",
        sound:('../../public/job-done.mp3')
	    });
    notification.onclick = function () {
      window.open(`${HOST_URL}app/issueview/${item._id}`);      
    };
  };

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
        <MainContainer className="col col-xs-12" style={{ padding: "48px 0" }}>
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
