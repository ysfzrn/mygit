import React from "react";
import styled from "styled-components";
import Circle from './Circle'
import Image from './Image'

const IssueProfileImage = props => {
  return (
    <Circle size={60}>
      {props.user.image
        ? <Image src={props.user.image} borderRadius={30} />
        : <div>
            {props.user.name.substr(0, 1).toUpperCase()}
            {" "}
          </div>}
    </Circle>
  );
};

export default IssueProfileImage;
