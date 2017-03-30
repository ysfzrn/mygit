import React from "react";
import styled from "styled-components";
import { flexCenter } from "../util/sharedStyle";
let ClickOutComponent = require("react-onclickout");
import { API_URL } from '../util/api'

class ProfileImage extends ClickOutComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      items: [
        { text: "Profil Ayarları", to: "/app/profile" },
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
    const { auth } = this.props;
    const {  open} = this.state;
    return (
      <Container>
        <Circle onClick={this.handleOpen}>
          {auth.data.image
            ?  <Img src={`${API_URL}${auth.data.image}`}  />
            : <div>{auth.data.name.substr(0, 1).toUpperCase()} </div>}
        </Circle>
        <Icon
          className="zmdi zmdi-caret-down"
          style={{ paddingRight: "6px" }}
          onClick={this.handleOpen}
        />

        <Popover open={open}>
          <ChevronUp />
          <List>
            <ListItem onClick={()=>this.handleClick('/app/profile')}>
                  Profil Ayarları
            </ListItem>
            <ListItem onClick={()=>this.props.handleLogOut()}>
                  Çıkış
            </ListItem>
            
          </List>
        </Popover>

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
  border-radius:16px;
`

const Icon = styled.i`
    margin-left:4px;    
`;

const Circle = styled.div`
  margin-left:14px;
 ${flexCenter};
  width:32px;
  height:32px;
  border-radius:16px;
  background-color:${p => p.theme.AppBar.color};
  color:${p => p.theme.AppBar.backgroundColor};
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
    margin-top:54px;
    right:-4px;
    width:180px;
`;

const List = styled.ul`
    list-style:none;
    padding:0px;
`;
const ListItem = styled.li`
    cursor:pointer;
    padding:3px 10px;
    &:hover{
      background-color:${p => p.theme.palette.primary1Color};
      color:${p => p.theme.palette.alternateTextColor};
    }
`;

export default ProfileImage;
