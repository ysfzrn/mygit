import React from "react";
import styled from "styled-components";
import IssueProfileImage from "./IssueProfileImage";
import { Link } from "react-router-dom";
import moment from "moment"

const NotificationItem = props => {
  const item = props.item;
  var now = moment.utc(item.updatedAt).fromNow();
  return (
    <Container>
      <IssueProfileImage user={item.user} />
       <TextContainer> 
        <Now> {now} </Now>   
        <Text onClick={()=>props.onToItem(item)}>{item.body} </Text>
       </TextContainer>  
      <Close
        className="zmdi zmdi-hc zmdi-close"
        onClick={()=>props.onDeleteNotify(item)}
      />
    </Container>
  );
};

const Container = styled.div`
    padding:10px 15px;
    background-color:white;
    font-size:16px;
    display:flex;
    align-items:center;
    margin-bottom:10px;
    border-radius:12px;
    position:relative;
`;

const TextContainer=styled.div`
    display:flex;
    flex-direction:column;
    flex:1;
`

const Text = styled.div`
    width:100%;
    padding-top:5px;
    padding-left:13px;
    color:#2196F3;
    white-space: wrap; 
    text-overflow: ellipsis; 

    &:hover{
      cursor:pointer;
	  text-decoration:underline;
   }
    
`;

const Close = styled.i`
  color:${(p)=>p.theme.palette.todo};
  position:absolute;
  right:21px;
  padding:10px;
  border-radius:10px;
  font-size:24px;

  &:hover{
      cursor:pointer;
	  background-color:#e0e0e0;
   }
`;

const Now = styled.div`
    padding-left:13px;
	font-size:11px;
	opacity:0.6;
`;

export default NotificationItem;
