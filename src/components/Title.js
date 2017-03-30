import React from 'react'
import styled from 'styled-components'
import media from "../util/media";

const Title = (props) => {
    return(
        <Container>
            {props.children}
        </Container>
    )
}

const Container = styled.div`
    max-width:740px;
    margin:0 auto;
    font-weight: 700;
    font-style: normal;
    font-size: 32px;
    line-height: 1.04;
    letter-spacing: -.028em;
    word-break: break-word;
    word-wrap: break-word;

   ${media.kindle`
        font-style: normal;
        font-size: 24px;
        background-size: 2px 1px;
        background-position: 0 1.03em;
   `}
`;

export default Title