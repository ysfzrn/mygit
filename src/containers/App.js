import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../actions";
import { app } from "../store";
import { Card, LoadButton, PieChart, TabCard,DesktopHidden } from "../components";
import { Link } from "react-router-dom";
import { percentDoneTask } from "../reducers";
import media from "../util/media";

class App extends Component {
  componentWillMount() {
    const {  fetchTasks } = this.props;
    const issuesService = app.service("issues");
    // debugger;
    if (issuesService.connection.disconnected) {
      issuesService.on("created", item => this.handleAddingIssue(item));
    }
    //issuesService.on('updated', (item) => fetchissues(0,issues.filter,issues.status,auth.token));
    //issuesService.on('patched', (item) => fetchissues(0,issues.filter,issues.status,auth.token));
    //issuesService.on('removed', (item) => fetchissues(0,issues.filter,issues.status,auth.token));

    const taskService = app.service("tasks");
    if (taskService.connection.disconnected) {
      taskService.on("created", item => fetchTasks());
      taskService.on("patched", item => fetchTasks());
      taskService.on("updated", item => fetchTasks());
    }
  }

  componentDidMount() {
    const { fetchTasks,getcountissues } = this.props;
    fetchTasks();
    getcountissues();
    this.handleFetch();

    //this.props.getsumissues();
  }

  handleFetch = () => {
    const { issues, fetchissues, auth } = this.props;
    if (issues.issues.length === 0) {
      fetchissues(issues.offset, issues.filter, issues.status, auth.token);
    }
  };

  handleAddingIssue = item => {
    const { addingIssue,getcountissues } = this.props;
    addingIssue();
    getcountissues();
  };

  handleFetchSocket = () => {
    const { issues, fetchissuessocket, auth } = this.props;
    fetchissuessocket(0, issues.filter, "all", auth.token);
  };

  handleFetchMore = e => {
    e.preventDefault();
    const { issues, fetchissuesmore, auth } = this.props;
    fetchissuesmore(issues.offset, issues.filter, issues.status, auth.token);
  };

  handleInput = (text, field) => {
    const { issueFilterChange } = this.props;
    issueFilterChange({
      [field]: text
    });
  };

  handleStatus = (text, field) => {
    const { issues, fetchissuesfilter, auth } = this.props;
    this.handleInput(text, field);
    fetchissuesfilter(0, issues.filter, text, auth.token);
  };

  handleToView = id => {
    const { toPush } = this.props;
    toPush(`/app/issueview/${id}`);
  };

  render() {
    const { issues, percentdonetask } = this.props;
    return (
      <Container>
       <DesktopHidden> 
        <GraphsContainer>
          <Link to="/app/projectplan" style={{ textDecoration: "none" }}>
            <ProjectPlan>
              <PieChart percent={percentdonetask} />
            </ProjectPlan>
          </Link>
        </GraphsContainer>
       </DesktopHidden> 

        <FilterContainer className="col col-sm-12">

          <TabCard
            text="Hepsi"
            count={issues.total}
            status={issues.status}
            filter="all"
            backgroundColor="#2196F3"
            onClick={() => this.handleStatus("all", "status")}
          />

          <TabCard
            text="Açık"
            count={issues.totalopen}
            status={issues.status}
            filter="open"
            backgroundColor="#F44336"
            onClick={() => this.handleStatus("open", "status")}
          />

          <TabCard
            text="Kapalı"
            count={issues.totalclose}
            status={issues.status}
            filter="close"
            backgroundColor="#4CAF50"
            onClick={() => this.handleStatus("close", "status")}
          />

          <TabCard
            text="Duyuru"
            count={issues.totalannounce}
            status={issues.status}
            filter="warning"
            backgroundColor="#FFC107"
            onClick={() => this.handleStatus("warning", "status")}
          />

        </FilterContainer>

        <IssueContainer className="col col-sm-12">
          {!issues.loading && issues.count !== 0
            ? <LoadButton
                onClick={this.handleFetchSocket}
                text={`${issues.count} yeni gönderi`}
              />
            : null}
          <div>
            {issues.loading && issues.issues.length === 0
              ? <div>Yükleniyor...</div>
              : issues.issues
                  .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                  .map((item, i) => {
                    return (
                      <Card onClick={this.handleToView} key={i} item={item} />
                    );
                  })}
          </div>
          <LoadButton onClick={e => this.handleFetchMore(e)} text="Yükle" />
        </IssueContainer>

      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    issues: state.issues,
    percentdonetask: percentDoneTask(state)
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actionCreators, dispatch)
});

const Container = styled.div`
   max-width:877px;
   margin:0 auto;
   padding-top:10px;
   padding-bottom:10px;
   display:flex;
   flex-direction:column;
   flex:1;
`;

const FilterContainer = styled.div`
   display:flex;
   flex-direction:row;
   align-items:stretch;
   justify-content:space-around;
   max-width:800px;
   margin-bottom:34px;
`;

const IssueContainer = styled.div`
   max-width:800px;
`;

const GraphsContainer = styled.div`
    margin:46px auto;
    position:fixed;
    right:10%;

     ${media.giant`
		    right:5%;
     `}

`;

//box-shadow:0 2px 4px 0 rgba(0,0,0,0.50), 0 2px 4px 0 rgba(0,0,0,0.50);
const ProjectPlan = styled.div`
   cursor:pointer;
   display:flex;
   flex-direction:column;
   align-items:center;
   justify-content:center;
   font-size:33px;
   color:black;

   &:hover{
     cursor:pointer;
		 background-color:#e0e0e0;
   }

`;

export default connect(mapStateToProps, mapDispatchToProps)(App);
