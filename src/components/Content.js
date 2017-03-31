import React from 'react'
import styled from 'styled-components'
import media from "../util/media";

const Content = (props) => {
    return(
        <Container className="content" dangerouslySetInnerHTML={props.createMarkup} />
    )
}

const Container = styled.div`   
   max-width:740px;
   margin:0 auto;
   padding:0px 20px;
   font-size:16px;
   font-weight: 400;
   font-family: Roboto, sans-serif, Verdana,impact, Arial;
   line-height:1.58;
   letter-spacing:-.003em;
   --x-height-multiplier: 0.35;
   --baseline-multiplier: 0.179;

   ${media.kindle`
        
        font-size: 14px;
        letter-spacing:-.004em;
   `}
`;

export default Content