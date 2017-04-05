import React from "react";
import styled from "styled-components";
import PlusButton from "./PlusButton";
import ProfileImage from "./AppProfileImage";
import { Link } from "react-router-dom";
import NotificationButton from './NotificationButton'

const AppBar = props => {
  return (
    <Container className="col col-xs-12">

      <Link to="/app" style={{ textDecoration: "none" }}>
        <Title>
          ALTIN PROJESİ
        </Title>
      </Link>

      <ActionContainer>
       <NotificationButton totalNot={props.totalNot} notify={props.notify}  handleToNotification={props.handleToNotification} />
        <PlusButton handleToPush={to => props.handleToPush(to)} />
        <ProfileImage
          auth={props.auth}
          handleToPush={to => props.handleToPush(to)}
          handleLogOut={() => props.handleLogOut()}
        />
      </ActionContainer>

    </Container>
  );
};

const Container = styled.div`
    z-index:1;
    background-color:${p => p.theme.AppBar.backgroundColor};
    border-bottom:1px solid ${p => p.theme.AppBar.borderColor};
    height:${p => p.theme.AppBar.height};

    display:flex;
    align-items:center;
    flex-direction:row;
    justify-content:space-around;
    color:${p => p.theme.AppBar.color};
`;

const ActionContainer = styled.div`
    display:flex;
    fontSize:21px;
`;

const Title = styled.div`
	font-size:20px;
  color:${p => p.theme.AppBar.color};
  text-decoration:none;

  &:hover{
    color:${p => p.theme.AppBar.hoverColor};
  }
`;

export default AppBar;
