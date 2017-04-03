import React from 'react'
import styled from "styled-components";
import { flexCenter } from "../util/sharedStyle";

const StatusAnnounce = (props) => {
    return(
        <Container>
            <Announce> Duyuru </Announce>
        </Container>
    )
}

export default StatusAnnounce;


const Container = styled.div`
    position:relative;
    width:150px;
    height:32px;
    color:${p => p.theme.palette.alternateTextColor};
    border-radius:4px;
    ${flexCenter};
    overflow:hidden;
    cursor:pointer;
`;

const Announce = styled.div`
    position: absolute;
    width:150px;
    top:0;
    right:${p => p.hovering ? -150 : 0}px;
    bottom:0;
    background-color:${p => p.theme.palette.announce};
    transition:all 0.3s linear;
    ${flexCenter};
    padding:4px 10px;
    
`;