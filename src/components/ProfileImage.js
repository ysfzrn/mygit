import React, { Component } from "react";
import styled from "styled-components";
import { flexCenter } from "../util/sharedStyle";
let ClickOutComponent = require("react-onclickout");
import { API_URL } from "../util/api";

class ProfileImage extends ClickOutComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      items: [{ text: "Profil Ayarları", to: "/app/profile" }]
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
    const { auth } = this.props;
    const { items, open } = this.state;
    return (
      <Container>
        <Circle onClick={this.handleOpen}>
          {auth.data.image
            ? <Img src={`${API_URL}${auth.data.image}`} />
            : <div>{auth.data.name.substr(0, 1).toUpperCase()} </div>}
        </Circle>

      </Container>
    );
  }
}

const Container = styled.div`
    position:relative;
    display:flex;
    align-items:center;

    &:hover{
       color:${p => p.theme.AppBar.hoverColor};
    }
`;

const Img = styled.img`
	width:100%;
	height:100%;
`;

const Icon = styled.i`
    margin-left:4px;    
`;

const Circle = styled.div`
 ${flexCenter};
  width:230px;
  height:230px;
  border-radius:12px;
  font-size:72px;
  background-color:${p => p.theme.palette.primary1Color};
  color:${p => p.theme.AppBar.backgroundColor};
`;

export default ProfileImage;
