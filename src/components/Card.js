import React from "react"
import styled from "styled-components"
import moment from "moment"
import Circle from './Circle'
import Image from './Image'
import MobileHidden from './MobileHidden'


const Card = props => {
  var now = moment.utc(props.item.updatedAt).fromNow();
  return (
    <MyCard {...props} onClick={()=>props.onClick(props.item._id)}>
     
     <MobileHidden>
      <Circle size={80}>
        {props.item.postitem.user.image
          ?<Image src={props.item.postitem.user.image} borderRadius={40} />
          : <div>
              {props.item.postitem.user.name.substr(0, 1).toUpperCase()}{" "}
            </div>}
      </Circle>
     </MobileHidden> 

      <Header>
        <Owner>
          <Name>
            {props.item.postitem.user.name} {props.item.postitem.user.surname}
          </Name>
          <Now> {now} </Now>
        </Owner>
        <Title>
          {props.item.title}
        </Title>
      </Header>
      <Status status={props.item.status} category={props.item.category} />

    </MyCard>
  );
};

const Status=styled.div`
  position:absolute;
  bottom:0;
  top:0;
  right:0;
  width:20px;
  background-color: ${(p)=>p.category==='I' ? p.status ? '#F44336' :'#4CAF50' : '#ffa726'}
`



//box-shadow:0 2px 4px 0 rgba(0,0,0,0.50), 0 2px 4px 0 rgba(0,0,0,0.50) border:1px solid #e0e0e0;
const MyCard = styled.div`
    position:relative;
    flex:1;
    flex-wrap:wrap;
    display:flex;
    padding:18px;
    flex-direction:row;
    min-width:300px;
    max-width:800px;
    
    margin-bottom:10px;
     background-color:#ffffff;

    &:hover{
		 cursor:pointer;
		 background-color:#e0e0e0;
	  }

    
`;
const Header = styled.div`
    display:flex;
    flex:1;
    flex-direction:column;
    padding:10px;
`;

const Owner = styled.div`
    display:flex;
    flex:1;
    justify-content:space-between;
`;

const Name = styled.div`
    padding-left:30px;
    font-size:14px;
    opacity:0.6;
`;

const Now = styled.div`
	padding:5px 5px 5px 30px;
	font-size:11px;
	opacity:0.6;
`;


const Title = styled.div`
    padding:5px 5px 5px 30px;
	  font-size:21px;

`;

export default Card;
