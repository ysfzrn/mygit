import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../actions";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import { NotificationItem } from "../components";
import { app } from "../store";

let userid = 0;
class NotificationPage extends Component {
  
  componentWillMount() {
    const {fetchActivities,auth}=this.props;
    userid = auth.data._id;
    
    const activityService = app.service("activities");
    if (activityService.connection.disconnected) {
      activityService.on("created", item => fetchActivities(userid));
      activityService.on("removed", item => fetchActivities(userid));
    }
  }
  

  componentDidMount() {
    const { fetchActivities, auth } = this.props;
    fetchActivities(auth.data._id);
  }

  handleOnToItem = item => {
    const { toPush,removeActivity } = this.props;
    toPush(item.route);
    removeActivity(item._id)
  };

  handleOnDeleteNotify = item => {
    const { removeActivity } = this.props;
    removeActivity(item._id)
  };

  render() {
    const { activities } = this.props;
    return (
      <div className="col col-sm-12">
        <Container>
          {activities.total === 0
            ? <Message> Hiç bildiriminiz yok :) </Message>
            : <Message>
                {" "}Toplam {activities.total} tane bildiriminiz var
              </Message>}
          {activities.loadingactivities && activities.items.length === 0
            ? <Message>Yükleniyor...</Message>
            : activities.items.map((item, i) => {
                return (
                  <NotificationItem
                    key={i}
                    item={item}
                    onToItem={this.handleOnToItem}
                    onDeleteNotify={this.handleOnDeleteNotify}
                  />
                );
              })}
        </Container>
      </div>
    );
  }
}

const Container = styled.div`
   max-width:877px;
   margin:0 auto;
   padding-top:10px;
   padding-bottom:10px;
   display:flex;
   flex-direction:column;
   flex:1;
`;

const Message = styled.div`
  margin:10px;
`;

const mapStateToProps = (state, ownProps) => {
  return {
    activities: state.activities,
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage);
