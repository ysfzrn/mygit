import React, { Component } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import media from "../util/media";
import { fadeIn } from "../util/sharedStyle";
import Button from './Button'

ReactModal.setAppElement("#root");

class MyModalAlert extends Component {
  render() {
    return (
      <MyReactModal
        {...this.props}
        isOpen={this.props.isOpen}
        contentLabel="onRequestClose Example"
        onRequestClose={this.props.onRequestClose}
        shouldCloseOnOverlayClick={true}
      >
        <ModalHeader>
          <Close
            className="zmdi zmdi-hc-2x zmdi-close"
            onClick={this.props.onCloseModal}
          />
        </ModalHeader>
        <p>Gönderiniz silinsin mi ?</p>
        <MyButton onClick={this.props.onRequestYes} status={true}>Evet</MyButton>
        <MyButton onClick={this.props.onRequestClose}  status={false}>Hayır</MyButton>
        {this.props.children}
      </MyReactModal>
    );
  }
}
const ModalHeader = styled.div`
   display:flex;
   justify-content:flex-end;  
`;

const Close = styled.i`
  cursor:pointer;
`

const MyButton = styled(Button)`
  margin-bottom:5px;
  width:100%;
  border:1px solid ${(p)=>p.status ? p.theme.palette.todo : p.theme.palette.done};
  background-color:${(p)=>p.status ? p.theme.palette.todo : p.theme.palette.done};
  
  &:hover{
     border:1px solid ${(p)=>p.status ? p.theme.palette.todo : p.theme.palette.done};
     color:${(p)=>p.status ? p.theme.palette.todo : p.theme.palette.done};
  }
`

const MyReactModal = styled(ReactModal)`
   position:relative;
   width:370px;
   height:250px;
   outline:none;
   margin:50px auto;
   animation:${fadeIn} 0.4s linear;
   background: #FFFFFF;
   box-shadow: 0 0 4px 0 rgba(0,0,0,0.50), 0 4px 4px 0 rgba(0,0,0,0.50);
   border-radius: 12px;
   display:flex;
   flex-direction:column;
   padding:20px 20px;
`;

export default MyModalAlert;
