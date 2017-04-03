import { keyframes }  from 'styled-components'


export function fontShared(){
	return `
	   font-size:14px;
	   overflow:hidden;
	`;
}

export function flexCenter(){
	return `
	   display:flex;
	   align-items:center;
	   justify-content:center;
	`;
}


export function fadeIn(){
	const fadeIn = keyframes`
	  from {
	    opacity: 0;
	  }

	  to {
	    opacity: 1;
	  }
	`;
	
	return fadeIn;
}

export function slideInLeft(){
	const slidelinLeft = keyframes`
	  from {
	    left: -178px;
	  }

	  to {
	    left: 0;
	  }
	`;
	
	return slidelinLeft;
}

export function slideInRight(){
	const slidelinRight = keyframes`
	  from {
	    right: -178px;
	  }

	  to {
	    right: 0;
	  }
	`;
	
	return slidelinRight;
}




