import React, { Component } from "react";
import styled from "styled-components";
import {
  Button,
  TaskStage,
  TextInput,
  TextArea,
  MyModal
} from "../components";
import { flexCenter } from "../util/sharedStyle";
import detectmob from "../util/detectmob";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { default as TouchBackend } from "react-dnd-touch-backend";
import { connect } from "react-redux";
import * as actionCreators from "../actions";
import { bindActionCreators } from "redux";
import { app } from "../store";


class ProjectPlan extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      selectedItem: null,
      containers: [
        { id: 0, title: "TO-DO", backgroundColor: "#F44336" },
        { id: 1, title: "Development", backgroundColor: "#FFC107" },
        { id: 2, title: "SG-Test", backgroundColor: "#2196F3" },
        { id: 3, title: "Kullanıcı Test", backgroundColor: "#009688" },
        { id: 4, title: "Done", backgroundColor: "#4CAF50" }
      ]
    };
  }

  
  componentWillMount() {
    const { fetchTasks } = this.props;
    const taskService = app.service("tasks");
    // debugger;
    if (taskService.connection.disconnected) {
         taskService.on("created", item => fetchTasks());
         taskService.on("patched", item => fetchTasks());
         taskService.on("updated", item => fetchTasks());
    }
  }
  

  componentDidMount() {
    const { fetchUsers, fetchTasks } = this.props;
    fetchTasks();
    fetchUsers();
  }

  handleInput = (value, field) => {
    const { taskFormChange } = this.props;
    taskFormChange({
      [field]: value
    });
  };

  taskSaveHandle = e => {
    const { taskform, taskSave } = this.props;
    e.preventDefault();
    taskSave(taskform.title, taskform.text, taskform.user_id, taskform.status);
    this.handleCloseModal();
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  /*handleDropped = item => {
    let _taskList = this.state.taskList;
    _taskList.map((listitem, i) => {
      if (listitem.id === this.state.selectedItem) {
        listitem.status = item;
      }
    });
    this.setState({ tasklist: _taskList });
  };*/

  handleDropped=item=>{
    const { taskUpdateStatus } = this.props;
    taskUpdateStatus(this.state.selectedItem,item )
  }

  onBeginningDrag = id => {
    
    this.setState({ selectedItem: id });
  };
  render() {
    const { tasks } = this.props;
    return (
      <Container>
        <Header>
          <h3> Proje Planı </h3>
          <Button onClick={this.handleOpenModal}>
            Task Ekle
          </Button>
        </Header>

        <Content>
          <ContentPatch>
            {tasks.loading && tasks.tasks.length===0
              ? <div>...loading </div>
              : this.state.containers.map((item, i) => {
                  return (
                    <TaskStage
                      key={i}
                      item={item}
                      tasklist={tasks.tasks}
                      onDropped={this.handleDropped}
                      onBeginningDrag={this.onBeginningDrag}
                    />
                  );
                })}

          </ContentPatch>
        </Content>

        <MyModal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick={false}
          onCloseModal={this.handleCloseModal}
        >
          <form className="col col-xs-12" onSubmit={this.taskSaveHandle}>
            <TextInput
              label="Başlık"
              field="title"
              onChange={this.handleInput}
            />
            <TextArea
              label="Açıklama"
              field="text"
              rows="4"
              onChange={this.handleInput}
            />

            <TextInput
              label="Kim yapacak"
              field="user_id"
              onChange={this.handleInput}
            />
            <Button type="submit" style={{ width: "100%" }}>EKLE</Button>
          </form>
        </MyModal>
      </Container>
    );
  }
}

const Content = styled.div`
   ${flexCenter}  
`;

const ContentPatch = styled.div`
   display:flex;
   flex-direction:row;
   overflow:auto;
`;

const Container = styled.div`
   margin:0 auto;
`;

const Header = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  align-items:baseline;  
`;

const mapStateToProps = (state, ownProps) => {
  return {
    taskform: state.taskform,
    tasks: state.tasks
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  DragDropContext(detectmob() ? TouchBackend : HTML5Backend)(ProjectPlan)
);
