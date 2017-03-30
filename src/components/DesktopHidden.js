import React from 'react'
import styled from 'styled-components'
import media from "../util/media";


const DesktopHidden = (props) => {
    return(
        <Container>
            {props.children}
        </Container>
    )
}

const Container = styled.div`
   display:block;

   ${media.desktop`
		 display:none;
   `}
`

export default DesktopHidden