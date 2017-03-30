var defaultState = {
	 email	  : '',
	 name	  : '',
	 surname  : '',
	 image	  : '',
	 password : '',
	 confirm  : ''

}

module.exports = (state=defaultState, action)=>{
	switch(action.type){
		 case 'SIGNUP_FORM':
             return { ...state, 
             	      ...action.payload };   
		default:
		   return state;
	}
}