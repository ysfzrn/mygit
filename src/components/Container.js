import React from 'react'
import styled from 'styled-components'
import media from "../util/media";

const Container = (props) => {
    return(
        <MyContainer>
            {props.children}
        </MyContainer>
    )
}

const MyContainer = styled.div`
   width:100%;
   box-sizing: border-box;
   margin:0 auto;
   display:flex;
   flex-direction:column;
   flex:1;
   min-height:100vh;
   background-color:#eeeeee;
   

   ${media.kindle`
        background-size: 2px 1px;
        background-position: 0 1.03em;
   `}
`;
export default Container