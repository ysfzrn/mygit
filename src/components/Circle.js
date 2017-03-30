import React from 'react'
import styled from 'styled-components'
import { flexCenter } from "../util/sharedStyle";


const Circle = (props) => {
    return(
        <Container size={props.size} >
            {props.children}
        </Container>
    )
}

const Container = styled.div`
 ${flexCenter};
  min-width:${p=>p.size}px;
  min-height:${p=>p.size}px;
  width:${p=>p.size}px;
  height:${p=>p.size}px;
  border-radius:${p=>p.size/2}px;
  background-color:${p => p.theme.AppBar.color};
  color:${p => p.theme.AppBar.backgroundColor};
`;


export default Circle