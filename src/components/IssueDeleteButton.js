import React from 'react'
import styled from 'styled-components'

const IssueDeleteButton = (props) => {
    return(
        <Container {...props} >
            Sil
        </Container>
    )
}

const Container = styled.button`
    width:150px;
    max-height:32px;
    background-color:${(p)=>p.theme.palette.primary1Color};
    color:${(p)=>p.theme.palette.alternateTextColor};
    outline:none;
    border:1px solid ${(p)=>p.theme.palette.primary1Color};
    padding:10px 20px;
    border-radius:4px;
    transition:all 0.3s linear;
    padding:4px 10px;
    margin-top:5px;

    &:hover{
      color:${(p)=>p.theme.palette.primary1Color};
      background-color:${(p)=>p.theme.palette.alternateTextColor};
      border:1px solid ${(p)=>p.theme.palette.primary1Color};
    }
`

export default IssueDeleteButton