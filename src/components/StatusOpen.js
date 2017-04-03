import React, { Component } from "react";
import styled from "styled-components";
import { slideInLeft, slideInRight, flexCenter } from "../util/sharedStyle";

class StatusOpen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false
    };
  }

   handleClick=()=>{
    this.setState({hovering:false})
    this.props.onClick();
  }

  handleMouseEnter = () => {
    this.setState({ hovering: true });
  };

  handleMouseLeave = () => {
    this.setState({ hovering: false});
  };

  render() {
    const { status, children } = this.props;
    const { hovering } = this.state;
    return (
      <Container {...this.props}
        onClick={this.handleClick} 
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Close hovering={hovering}> Kapat </Close>
        <Open hovering={hovering}> Açık </Open>
      </Container>
    );
  }
}

const Container = styled.div`
    position:relative;
    width:150px;
    height:32px;
    color:${p => p.theme.palette.alternateTextColor};
    border-radius:4px;
    ${flexCenter};
    overflow:hidden;
    cursor:pointer;
`;

const Close = styled.div`
    position: absolute;
    width:150px;
    top:0;
    left:${p => p.hovering ? 0 : -150}px;
    bottom:0;
    background-color:${p => p.theme.palette.done};
    transition:all 0.3s linear;
    ${flexCenter};
    padding:4px 10px;

    &:active{
      padding:2px 8px;
    }

`;

const Open = styled.div`
    position: absolute;
    width:150px;
    top:0;
    right:${p => p.hovering ? -150 : 0}px;
    bottom:0;
    background-color:${p => p.theme.palette.todo};
    transition:all 0.3s linear;
    ${flexCenter};
    padding:4px 10px;
    
`;

export default StatusOpen;
