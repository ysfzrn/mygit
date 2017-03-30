import React, { Component } from "react";
import styled from "styled-components";

class Home extends Component {
  render() {
    return (
      <Container className="col-sm-12" style={{ padding: 0 }}>
        <h2> Bu sayfayı neden yaptık ? </h2>
        <ul>
          <li>Test sonuçlarının takibini daha kolay hale getirmek</li>
          <li>Sorular sormak</li>
          <li>Mail kalabalığından kurtulmak</li>
          <li>Sonuçta oluşan veriyi, kümülatif bilgi haline getirmek</li>
        </ul>
      </Container>
    );
  }
}

const Container = styled.div`
   position:fixed;
   background-color:#009688;
   height:100vh;
   
   display:flex;
   justify-content:flex-start;
   flex-direction:column;

   color:white;
   font-weight:bold;
   font-size:24px;
`;

export default Home;
