import React, { Component } from "react";
import styled from "styled-components";

class NotificationButton extends Component {
  render() {
    const { notify,handleToNotification,totalNot } = this.props;
    return (
      <Container onClick={handleToNotification} >
        <Icon className="zmdi zmdi-notifications">
          {notify ? <Reflector>{totalNot} </Reflector> : null}
        </Icon>
      </Container>
    );
  }
}

const Container = styled.div`
    position:relative;
    padding-right:6px;
    &:hover{
       color:${p => p.theme.AppBar.hoverColor};
    }
`;

const Icon = styled.i`
   margin-left:4px;
   position:relative;
`;

const Reflector = styled.div`
   width:12px;
   height:12px;
   border-radius:6px;
   background-color:${p => p.theme.palette.primary2Color};
   position:absolute;
   top:-5px;
   right:-6px;
   font-size:8px;
   color:white;

   display:flex;
   align-items:center;
   justify-content:center;

`;

export default NotificationButton;
