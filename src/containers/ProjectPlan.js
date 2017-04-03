import React, { Component } from "react";
import styled from "styled-components";
import {
  Button,
  TaskStage,
  TextInput,
  TextArea,
  MyModal,
  SelectField
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
import { makingSelectedUsers } from "../reducers";

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
    const { fetchTasks, fetchUsers } = this.props;
    const taskService = app.service("tasks");
    // debugger;
    fetchUsers();
    
      taskService.on("created", item => fetchTasks());
      taskService.on("patched", item => fetchTasks());
      taskService.on("updated", item => fetchTasks());
      taskService.on("removed", item => fetchTasks());
    
  }

  componentDidMount() {
    const { fetchTasks } = this.props;
    fetchTasks();
  }

  handleInput = (value, field) => {
    const { taskFormChange } = this.props;

    taskFormChange({
      [field]: value
    });
  };

  taskSaveHandle = e => {
    const { taskform, taskSave, taskUpdateWithForm } = this.props;
    e.preventDefault();
    if (taskform.process === "I") {
      taskSave(
        taskform.title,
        taskform.text,
        taskform.user_id,
        taskform.status
      );
    } else if (taskform.process === "U") {
      taskUpdateWithForm(
        taskform.id,
        taskform.status,
        taskform.title,
        taskform.text,
        taskform.user_id
      );
    }
    this.handleCloseModal();
  };

  taskRemoveHandle=e=>{
      const { taskform, taskRemove } = this.props;
       e.preventDefault();
       taskRemove(taskform.id)
       this.handleCloseModal();
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleDropped = item => {
    const { taskUpdateStatus } = this.props;
    taskUpdateStatus(this.state.selectedItem, item);
  };

  onBeginningDrag = id => {
    this.setState({ selectedItem: id });
  };
  
  handleTaskAddClick=()=>{
     this.handleInput("I", "process");
     this.handleInput(0, "status");
     this.handleOpenModal();
  }

  handleTaskClick = task => {
    const { taskFormChange } = this.props;

    this.handleInput(task._id, "id");
    this.handleInput(task.title, "title");
    this.handleInput(task.text, "text");
    this.handleInput(task.user_id, "user_id");
    this.handleInput(task.status, "status");
    this.handleInput("U", "process");
    this.handleOpenModal();
  };

  render() {
    const { tasks, taskform, optionsusers } = this.props;
    return (
      <Container>
        <Header>
          <h3> Proje Planı </h3>
          <Button onClick={this.handleTaskAddClick}>
            Task Ekle
          </Button>
        </Header>

        <Content>
          <ContentPatch>
            {tasks.loading && tasks.tasks.length === 0
              ? <div>...loading </div>
              : this.state.containers.map((item, i) => {
                  return (
                    <TaskStage
                      onClick={this.handleTaskClick}
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
          <Form className="col col-xs-12" onSubmit={this.taskSaveHandle}>
            <TextInput
              defaultValue={taskform.title}
              label="Başlık"
              field="title"
              onChange={this.handleInput}
            />
            <TextArea
              defaultValue={taskform.text}
              label="Açıklama"
              field="text"
              rows="4"
              onChange={this.handleInput}
            />

            <SelectField
              label="Kim yapacak"
              options={optionsusers}
              onSelected={item => this.handleInput(item.value, "user_id")}
            />

            <Button type="submit" style={{ width: "100%",marginBottom:'10px' }}>
              {taskform.process === "I" ? "EKLE" : "GÜNCELLE"}
            </Button>
            {taskform.process === "U"
              ? <Button onClick={this.taskRemoveHandle} style={{ width: "100%"}}>
                   Sil
                </Button>
              : null}
          </Form>
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

const Form = styled.form`

`;

const mapStateToProps = (state, ownProps) => {
  return {
    taskform: state.taskform,
    tasks: state.tasks,
    optionsusers: makingSelectedUsers(state)
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  DragDropContext(detectmob() ? TouchBackend : HTML5Backend)(ProjectPlan)
);
