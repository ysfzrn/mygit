import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const LinkButton = (props) => {
    return(
        <Link {...props} >
           <Button type="button">
             {props.children}
           </Button> 
        </Link>
    )
}

const Button = styled.button`
   background-color:${(p)=>p.theme.LinkButton.backgroundColor};
   outline:none;
   border:none;
   color:${(p)=>p.theme.palette.textColor};
   padding:6px 8px;

   &:hover{
      background-color:${(p)=>p.theme.LinkButton.hoverColor};
   }
`

export default LinkButton