import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../actions";
import { bindActionCreators } from "redux";
import styled from "styled-components";

import {
  TextInput,
  Button,
  FormContainer,
  TitleIcon,
  LinkButton
} from "../components";

class Signup extends Component {
  handleInput = (value, field) => {
    const { signupFormChange } = this.props;
    signupFormChange({
      [field]: value
    });
  };

  signUpUserHandle = e => {
    const { signupform, signup } = this.props;
    e.preventDefault();
    signup(
      signupform.email,
      signupform.password,
      signupform.name,
      signupform.surname
    );
  };

  render() {
    return (
      <Container className="col col-sm-12">
        <FormContainer
          onSubmit={this.signUpUserHandle}
          className="col col-xs-12 col-sm-9 col-md-6 col-lg-6"
        >
          <LinkButton style={{ alignSelf: "flex-start" }} to="/login">
            <i className="zmdi zmdi-hc-2x zmdi-arrow-left" />
          </LinkButton>
          <TitleIcon icon="zmdi zmdi-hc-4x zmdi-account-add" />
          <TextInput
            label="Email"
            field="email"
            onChange={this.handleInput}
            type="email"
          />
          <TextInput label="Adınız" field="name" onChange={this.handleInput} />
          <TextInput
            label="Soyadınız"
            field="surname"
            onChange={this.handleInput}
          />
          <TextInput
            label="Şifre"
            field="password"
            onChange={this.handleInput}
            type="password"
          />
          <Button type="submit">KAYIT</Button>
        </FormContainer>
      </Container>
    );
  }
}

const Container = styled.div`
   display:flex;
   alignItems:center;
   flex-direction:column;
`;

const mapStateToProps = (state, ownProps) => {
  return {
    signupform: state.signupform
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
