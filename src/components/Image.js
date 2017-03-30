import React from "react";
import { API_URL } from "../util/api";
import styled from 'styled-components'

const Image = props => {
  return <Img src={`${API_URL}${props.src}`} borderRadius={props.borderRadius} />;
};

const Img = styled.img`
    width:100%;
	height:100%;
    border-radius:${p=>p.borderRadius}px ;
`;

export default Image;
