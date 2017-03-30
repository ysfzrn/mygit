import React, { Component, PropTypes } from "react";
import styled from "styled-components";
import Task from "./Task";
import { DropTarget } from "react-dnd";
import { ItemTypes } from "./Constants";

const squareTarget = {
  canDrop(props) {
    //return canMoveKnight(props.x, props.y);
    return true;
  },

  drop(props) {
    props.onDropped(props.item.id);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class TaskStage extends Component {
  onBeginningDrag = id => {
    this.props.onBeginningDrag(id);
  };

  renderList = id => {
    const task = this.props.tasklist.map((task, i) => {
      if (task.status === id) {
        return <Task key={task._id} taskitem={task} onBeginningDrag={this.onBeginningDrag} />;
      } else {
        return null;
      }
    });
    return task;
  };

  render() {
    const { item, tasklist, connectDropTarget } = this.props;
   
    return connectDropTarget(
      <div>
        <Stage backgroundColor={item.backgroundColor}>
          <h3> {item.title}</h3>
          {this.renderList(item.id)}
        </Stage>
      </div>
    );
  }
}

TaskStage.propTypes = {
  onDropped: PropTypes.func
};

const Stage = styled.div`
    min-width:250px;
    width:250px;
    min-height:400px;
    height:100%;
    background-color:${p => p.backgroundColor} ;
    display:flex;
    flex-direction:column;
    align-items:center;
    color:#FFFFFF;
    margin:auto 2px;
    overflow-y:scroll;
`;

export default DropTarget(ItemTypes.TASK, squareTarget, collect)(TaskStage);
