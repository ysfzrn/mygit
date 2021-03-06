import React from "react";
import styled from "styled-components";

const TextInput = props => {
  return (
    <Container>
      <Label>{props.label}</Label>
      <Input
        type={props.type}
        onChange={e => props.onChange(e.target.value, props.field)}
        defaultValue={props.defaultValue}
      />
    </Container>
  );
};

const Container = styled.div`
    display:flex;
    width:100%;
    flex-direction:column;
    padding-bottom:16px;
`;
const Label = styled.label`
    padding-bottom:5px;
    font-weight:bold;
    font-size:${p => p.theme.text.regular};
    color:${p => p.theme.palette.textColor};
`;
const Input = styled.input`
    outline:none;
    padding:6px 8px;
    min-height:34px;
    
    border:1px solid ${p => p.theme.palette.primary3Color};
    border-radius:${p => p.theme.TextInput.borderRadius};
    font-size:${p => p.theme.text.regular};
    background-color:${p => p.theme.TextInput.backgroundColor};
    color:${p => p.theme.palette.textColor};

    &:focus{
     border-color:${p => p.theme.palette.primary1Color};
    }
`;

export default TextInput;
