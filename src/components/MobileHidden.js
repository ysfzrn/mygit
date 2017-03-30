import React from 'react'
import styled from 'styled-components'
import media from "../util/media";


const MobileHidden = (props) => {
    return(
        <Container>
            {props.children}
        </Container>
    )
}

const Container = styled.div`
   display:block;

   ${media.portrait`
		 display:none;
   `}
`

export default MobileHidden