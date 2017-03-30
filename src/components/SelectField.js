import React, { Component } from "react";
import styled from "styled-components";
let ClickOutComponent = require("react-onclickout");

class SelectField extends ClickOutComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handlePopover = () => {
    this.setState({ open: !this.state.open });
  };

  onClickOut(e) {
    if (this.state.open) {
      this.setState({ open: false });
    }
  }

  render() {
    const { open } = this.state;
    const { label, options } = this.props;
    let cs = open
      ? "zmdi zmdi-chevron-up zmdi-hc-2x"
      : "zmdi zmdi-chevron-down zmdi-hc-2x";

    return (
      <SelectContainer onClick={this.handlePopover}>
        <Label>{label}</Label>
        <Input>
          {options.map((item, i) => {
            if (item.selected) {
              return <div key={i}>{item.label} </div>;
            }
          })}
        </Input>
        <Icon className={cs} />
        <Popover open={open}>
          {options.map((item, i) => {
            return (
              <ListItem key={i} onClick={() => this.props.onSelected(item)}>
                {item.label}
              </ListItem>
            );
          })}
        </Popover>
      </SelectContainer>
    );
  }
}

const SelectContainer = styled.div`
    display:flex;
    width:100%;
    justify-content:center;
    flex-direction:column;
    padding-bottom:16px;
    position:relative;
`;

const ListItem = styled.div`
   padding:10px 20px;
   font-size:14px;

   &:hover{
     background-color:#e0e0e0; 
   }
`;

const Popover = styled.div`
   display:${p => p.open ? "block" : "none"}
   position:absolute;
   left:0;
   right:0;
   top:60px;
   background-color:#FFFFFF;
   max-height:200px;
   overflow-y:auto;
   box-shadow: 10px 10px 5px #888888;
   
`;

const Label = styled.label`
    padding-bottom:5px;
    font-size:${p => p.theme.text.regular};
    color:${p => p.theme.palette.textColor};
`;

const Input = styled.div`
    border:1px solid ${p => p.theme.palette.primary3Color};
    border-radius:${p => p.theme.TextInput.borderRadius};
    padding:6px 8px;
    outline:none;
    font-size:${p => p.theme.text.regular};
    background-color:#FFFFFF;
`;

const Icon = styled.i`
    position:absolute;
    right:10px;
    bottom:20px;
    
`;

export default SelectField;
