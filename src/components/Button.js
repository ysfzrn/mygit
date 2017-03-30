import React from 'react'
import styled from 'styled-components'

const Button = (props) => {
    return(
        <MyButton {...props} type={props.type} >
            {props.children}
        </MyButton>
    )
}

const MyButton = styled.button`
    width:178px;
    max-height:48px;
    background-color:${(p)=>p.theme.palette.primary1Color};
    color:${(p)=>p.theme.palette.alternateTextColor};
    outline:none;
    border:1px solid ${(p)=>p.theme.palette.primary1Color};
    padding:10px 20px;
    border-radius:4px;
    transition:all 0.3s linear;

    &:hover{
      color:${(p)=>p.theme.palette.primary1Color};
      background-color:${(p)=>p.theme.palette.alternateTextColor};
      border:1px solid ${(p)=>p.theme.palette.primary1Color};
    }
`

export default Button