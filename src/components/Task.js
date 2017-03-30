import React, { Component } from "react";
import styled from "styled-components";
import { flexCenter } from "../util/sharedStyle";
import { DragSource } from "react-dnd";
import { ItemTypes } from "./Constants";
import { API_URL } from "../util/api";

const taskSource = {
  beginDrag(props) {
    props.onBeginningDrag(props.taskitem._id);
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

class Task extends Component {
  render() {
    const { connectDragSource, isDragging, taskitem } = this.props;
    return connectDragSource(
      <div
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: "move"
        }}
      >
        <Container>
          <Title> {taskitem.title} </Title>
          <Content>
            <Circle onClick={this.handleOpen}>
              {taskitem.user.image
                ? <Img src={`${API_URL}${taskitem.user.image}`} />
                : <div>{taskitem.user.name.substr(0, 1).toUpperCase()} </div>}
            </Circle>
            <Text> {taskitem.text.substr(0, 90)} </Text>
          </Content>
        </Container>
      </div>
    );
  }
}

const Container = styled.div`
    width:200px;
    height:130px;
    display:flex;
    align-items:center;
    flex-direction:column;
    border:0px solid black;
    color:black;
    background-color:#FFFFFF;
    margin-bottom:10px;
    

    &:hover{
      background-color:#e0e0e0;
    }
    
`;
const Title = styled.div`
    position:relative;
    
    font-weight:bold;
    
    white-space: nowrap; 
    width: 12em; 
    overflow: hidden;
    text-overflow: ellipsis; 
`;

const Content = styled.div`
    width:100%;
    display:flex;
    flex-direction:row;
    padding-top:14px;
    padding-left:14px;
    flex:1;
    padding-left:2px;

    white-space: wrap; 
    width: 14em; 
    height:14em;
    overflow: hidden;
    text-overflow: ellipsis; 
    
`;

const Circle = styled.div`
 ${flexCenter};
  min-width:40px;
  min-height:40px;
  width:40px;
  height:40px;
  border-radius:20px;
  background-color:black;
  color:#FFFFFF;
  margin-right:5px;
  margin-right:14px;
`;

const Img = styled.img`
	width:100%;
	height:100%;
  border-radius:20px;
  border:none;
`;

const Text = styled.div`
    text-overflow: clip; 
`;
const Image = styled.div`
    width:100%;
	height:100%;
    border-radius:40px;
`;

export default DragSource(ItemTypes.TASK, taskSource, collect)(Task);
