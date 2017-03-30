import React, { Component } from "react";
import styled from "styled-components";
let ClickOutComponent = require("react-onclickout");

class PlusButton extends ClickOutComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      items: [
        { text: "Issue ekle", to: "/app/issue" }
      ]
    };
  }

  handleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  onClickOut(e) {
    if (this.state.open) {
      this.setState({ open: false });
    }
  }

  handleClick = to => {
    this.setState({ open: false });
    this.props.handleToPush(to);
  };

  render() {
    const { items, open } = this.state;
    return (
      <Container>
        <Icon
          className="zmdi zmdi-plus"
          style={{ paddingLeft: "6px" }}
          onClick={this.handleOpen}
        />
        <Icon
          className="zmdi zmdi-caret-down"
          style={{ paddingRight: "6px" }}
          onClick={this.handleOpen}
        />

        <Popover open={open} onClickOut={this.handleOpen}>
          <ChevronUp />
          <List>
            {items.map((item, i) => {
              return (
                <ListItem onClick={() => this.handleClick(item.to)} key={i}>
                  {item.text}
                </ListItem>
              );
            })}
          </List>
        </Popover>

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
`;

const ChevronUp = styled.div`
    position:absolute;
    top:-10px;
    right:4px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
    z-index:2;
`;

const Popover = styled.div`
    display:${p => p.open ? "block" : "none"};
    color:black;
    position:absolute;
    border:0.1px solid ${p => p.theme.palette.primary3Color};
    background-color:white;
    border-radius:4px;
    font-size:14px;
    margin-top:14px;
    right:8px;
    width:180px;
`;

const List = styled.ul`
    list-style:none;
    padding:0px;
`;
const ListItem = styled.li`
    cursor:pointer;
    padding:10px 10px;
    &:hover{
      background-color:${p => p.theme.palette.primary1Color};
      color:${p => p.theme.palette.alternateTextColor};
    }
`;

export default PlusButton;
