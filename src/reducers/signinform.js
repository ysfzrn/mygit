var defaultState = {
	 email	  : undefined,
	 password : undefined
}

module.exports = (state=defaultState, action)=>{
	switch(action.type){
		 case 'SIGNIN_FORM':
             return { ...state, 
             	      ...action.payload };   
		default:
		   return state;
	}
}