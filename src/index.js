import React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";
import { injectGlobal } from "styled-components";


import "../public/bootstrap.min.css";
import '../public/matfont/css/material-design-iconic-font.min.css'

injectGlobal`
    html {
        line-height: 1.15; 
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        font-family: Roboto, sans-serif, Segoe UI;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        text-rendering: optimizeLegibility;
    }

    body{
    	display:flex;
        flex-direction:column;
    }

    .rdw-editor-wrapper{
    	background-color:#FFFFFF;
    	min-height:200px; 
        margin-top:20px;
        margin-bottom:20px;
        border-radius:12px;
    }

    .content img{
        width:100%;
        height:100%;
    }

    .comment img{
       
    }
`;

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(<Root />, document.getElementById("root"));
