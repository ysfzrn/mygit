import React, { Component } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import media from "../util/media";
import { fadeIn } from "../util/sharedStyle";

ReactModal.setAppElement("#root");

class MyModal extends Component {
  render() {
    return (
      <MyReactModal
        {...this.props}
        isOpen={this.props.isOpen}
        contentLabel="onRequestClose Example"
        onRequestClose={this.props.onRequestClose}
        shouldCloseOnOverlayClick={false}
      >
        <ModalHeader>
          <Close
            className="zmdi zmdi-hc-2x zmdi-close"
            onClick={this.props.onCloseModal}
          />
        </ModalHeader>
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

const MyReactModal = styled(ReactModal)`
   position:relative;
   width:670px;

    ${media.giant`
		width:670px;
   `}
    
    ${media.desktop`
		width:670px;
   `}

    ${media.tablet`
		width:670px;
   `}
   
   ${media.portrait`
		width:620px;
   `}

   ${media.kindle`
		width:370px;
   `}

   ${media.phone`
		width:320px;
   `}
   height:526px;
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

export default MyModal;
