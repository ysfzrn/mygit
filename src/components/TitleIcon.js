import React from 'react'
import styled from 'styled-components'
import { flexCenter } from '../util/sharedStyle'

const TitleIcon = (props) => {
    return(
        <Cirle>
          <MyIcon className={props.icon} />
        </Cirle>
    )
}

const Cirle = styled.div`
    ${flexCenter};
    width:100px;
    height:100px;
	border-radius:50px;
	background-color:${p => p.theme.palette.primary2Color} ;
`;

const MyIcon = styled.i`
    color: ${p => p.theme.palette.alternateTextColor} ;
`;

export default TitleIcon