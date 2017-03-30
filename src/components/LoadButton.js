import React, { Component } from "react";
import styled from "styled-components";
import { flexCenter, fadeIn } from "../util/sharedStyle";
import { Motion, spring } from "react-motion";

class LoadButton extends Component {
  render() {
    const { text } = this.props;
    return (
      <Container {...this.props}>
        <div>{text}</div>
      </Container>
    );
  }
}

const Container = styled.div`
    cursor:pointer;
    ${flexCenter}
    color:#0d47a1;
    padding:5px 10px;
    max-width:800px;
    animation: ${fadeIn} 1s linear;

    :hover&{
      background-color:#e0e0e0;
    }

`;

export default LoadButton;
