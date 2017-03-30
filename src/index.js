import React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";
import { injectGlobal } from "styled-components";

import "./index.css"
import "../public/bootstrap.min.css";
import '../public/matfont/css/material-design-iconic-font.min.css'

injectGlobal`
    body {
      font-family: Roboto, sans-serif;
        margin: 0;
        padding: 0;
        height:100%;
        overflow-x: hidden;
        text-rendering: optimizeLegibility;
        
    }
`;

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(<Root />, document.getElementById("root"));
