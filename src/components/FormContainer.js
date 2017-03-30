import React from "react";
import styled from "styled-components";
import { flexCenter } from "../util/sharedStyle";

const FormContainer = props => {
  return (
    <Form {...props}>
      {props.children}
    </Form>
  );
};

const Form = styled.form`
   position:relative;
   flex:1;
   border:none;
   box-shadow: 0 0 4px 0 rgba(0,0,0,0.50), 0 4px 4px 0 rgba(0,0,0,0.50);
   ${flexCenter};
   flex-direction:column;
   padding:40px;
   max-height:700px;
   max-width:500px;
`;

export default FormContainer;
