import React, { Component } from "react";
import styled from "styled-components";

class SnackBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };
  }

  static defaultProps = {
    status: "danger"
  };

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () => {
    this.setState({ count: this.state.count + 1000 });
    if (this.state.count === this.props.autoHideDuration) {
      this.props.onRequestClose();
    }
  };

  render() {
    const { message, status } = this.props;
    return (
      <MySnackBar status={status} {...this.props}>
        {message}
      </MySnackBar>
    );
  }
}

const MySnackBar = styled.div`
	position: fixed;
    bottom: 0;
    margin: 0px auto;
    color: azure;
    background-color: ${p => p.status === "danger" ? "crimson" : p.status === "success" ? "green" : "orange"};
    padding: 10px 20px;
    width: 320px
`;

export default SnackBar;
