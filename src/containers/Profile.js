import React, { Component } from "react";
import { connect } from "react-redux";
import { ProfileImage } from "../components";
import styled from "styled-components";
import { API_PUBLIC } from "../util/api";
import { bindActionCreators } from "redux";
import * as actionCreators from "../actions";

class Profile extends Component {
  uploadCallback = e => {
    console.log(this.props);
    const { imageupload, auth } = this.props;

    e.preventDefault();
    let file = e.target.files[0];

    let reader = new FileReader();
    reader.onload = () => {
      console.log(reader);
      imageupload(reader.result, auth.token, auth.data._id);
    };

    reader.readAsDataURL(file);
  };

  handleImageChange = e => {
    console.log(e);
  };

  render() {
    const { auth } = this.props;
    return (
      <Container>
        <LeftContainer>
          <ProfileImage auth={auth} />
          <FileLabel for="file">
            Resim Yükle
            <FileInput
              ref="file"
              id="file"
              name="file"
              type="file"
              onChange={(e, value) => this.uploadCallback(e)}
            />
          </FileLabel>
          <Name>{auth.data.name} {auth.data.surname}</Name>
          <div>{auth.data.email} </div>
        </LeftContainer>
        <RightContainer />
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actionCreators, dispatch)
});

const Container = styled.div`
    flex:1;
    
`;
const LeftContainer = styled.div`
    display:flex;
    flex-direction:column;
`;

const RightContainer = styled.div`
    display:flex;
    flex-direction:column;
`;

const FileInput = styled.input`
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
`;

const FileLabel = styled.label`
	margin-top:5px;
	padding:6px 20px;
	font-size: 16px;
  color: white;
  background-color: #2196F3;
  display: inline-block;
  cursor:poiner;
  transition:all 0.2s linear;
  border-radius:6px;
  width:230px;

  &:hover{
	  background-color:#0d47a1
  }
`;

const Name = styled.div`
    font-size:26px;
    font-weight:bold;
`;

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
