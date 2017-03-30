import React from "react";
import styled from "styled-components";
import MobileHidden from './MobileHidden'

const TabCard = props => {
  return (
    <Filter
      status={props.status}
      filter={props.filter}
      {...props}
      style={{ backgroundColor: props.backgroundColor }}
    >
      <MobileHidden><Count>{props.count}</Count></MobileHidden>
      <div>{props.text}</div>
    </Filter>
  );
};

const Filter = styled.div`
   flex:1;
   cursor:pointer;
   color:${p => p.status === p.filter ? "#FFFFFF" : "#bdbdbd"};
   background-color:blue;
   padding-top:17px;
   padding-bottom:7px;
   display:flex;
   flex-direction:column;
   align-items:center;
   justify-content:center;
`;


const Count = styled.div`
  font-size:32px;
`

export default TabCard;
