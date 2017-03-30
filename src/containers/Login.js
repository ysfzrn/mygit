import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../actions";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import { fadeIn } from "../util/sharedStyle";
import {
  TextInput,
  Button,
  FormContainer,
  TitleIcon,
  LinkButton,
  Snackbar
} from "../components";
import Home from "./Home";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showalert: true
    };
  }

  handleInput = (value, field) => {
    const { signinFormChange } = this.props;
    signinFormChange({
      [field]: value
    });
  };

  signinUserHandle = e => {
    const { login, signinform } = this.props;
    e.preventDefault();
    login(signinform.email, signinform.password, "/app");
  };

  handleRequestClose = (e, id) => {
    const { removeAlert } = this.props;
    removeAlert(id);
  };

  render() {
    const { alerts, signinform } = this.props;
    return (
      <Container className="col col-sm-12" style={{ padding: 0 }}>

        <LeftContainer className="col col-sm-12 col-md-6 col-lg-6" style={{ padding: 0 }}>
          <FormContainer
            onSubmit={this.signinUserHandle}
            className="col col-xs-12 col-sm-9 col-md-6 col-lg-6"
          >
            <LinkButton style={{ alignSelf: "flex-end" }} to="/signup">
              Kayıt Ol
            </LinkButton>

            <TitleIcon icon="zmdi zmdi-hc-4x zmdi-account" />
            <TextInput
              label="Email"
              field="email"
              onChange={this.handleInput}
              type="email"
              defaultValue={signinform.email}
            />
            <TextInput
              label="Şifre"
              field="password"
              onChange={this.handleInput}
              type="password"
              defaultValue={signinform.password}
            />

            <Button type="submit">GİRİŞ</Button>
          </FormContainer>
          {alerts.map(a => {
            return (
              <MySnackbar
                key={a.id}
                open={this.state.showalert}
                action="X"
                onClick={e => this.handleRequestClose(e, a.id)}
                message={a.text}
                autoHideDuration={4000}
                onRequestClose={e => this.handleRequestClose(e, a.id)}
              />
            );
          })}
        </LeftContainer>

        <RightContainer className="col col-sm-12 col-md-6 col-lg-6" style={{ padding: 0 }}>
          <Home />
        </RightContainer>

      </Container>
    );
  }
}

const Container = styled.div`
   
`;

const MySnackbar = styled(Snackbar)`
  animation: ${fadeIn} 0.4s linear;
`;

const LeftContainer = styled.div`
  display:flex;
  align-items:flex-start;
  justify-content:center;
  
`;

const RightContainer = styled.div`
   position:fixed;
   bottom:0;
`;

const mapStateToProps = (state, ownProps) => {
  return {
    signinform: state.signinform,
    alerts: state.alerts
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
