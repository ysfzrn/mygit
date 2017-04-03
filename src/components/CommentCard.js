import styled from "styled-components";
import media from "../util/media";
import React, { Component } from "react";
import IssueProfileImage from "./IssueProfileImage";
import moment from "moment";

class CommentCard extends Component {
  createMarkupComment = comment => {
    return { __html: comment };
  };
  render() {
    const { comment } = this.props;
    const now = moment.utc(comment.updatedAt).fromNow();
    return (
      <Container>
        <Owner>
          <IssueProfileImage user={comment.user} />
          <Name>
            {comment.user.name}
            {" "}
            {comment.user.surname}
          </Name>
          <Now> {now} </Now>
        </Owner>
        <Content
          className="comment"
          dangerouslySetInnerHTML={this.createMarkupComment(comment.text)}
        />
      </Container>
    );
  }
}

const Container = styled.div`
   max-width:740px;
   margin:15px auto;
   border:1px solid gray;
   border-radius:12px;
   display:flex;
   flex-direction:column;
   
`;

const Owner = styled.div`
   display:flex;
   flex-direction:row;
   align-items:center;
   background-color:#eeeeee;
   border-radius:12px;
   padding-left:10px;
   position:relative;
`;

const Content = styled.div`
   
   border-radius:12px;
   padding:0px 20px;
   font-size:16px;
   font-weight: 400;
   font-family: Roboto, sans-serif, Verdana,impact, Arial;
   line-height:1.58;
   letter-spacing:-.003em;
   --x-height-multiplier: 0.35;
   --baseline-multiplier: 0.179;
   background-color:white;
   

   ${media.kindle`        
        font-size: 14px;
        letter-spacing:-.004em;
   `}
`;

const Name = styled.div`
    padding-left:30px;
    font-size:14px;
    opacity:0.6;
`;

const Now = styled.div`
  position:absolute;
  right:15px;
	padding:5px 5px 5px 30px;
	font-size:11px;
	opacity:0.6;
`;

export default CommentCard;
