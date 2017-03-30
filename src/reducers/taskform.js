var defaultState = {
	 title	  : undefined,
	 text	  : '',
	 status	  : 0,
     user_id  : undefined
}

module.exports = (state=defaultState, action)=>{
	switch(action.type){
		 case 'TASK_FORM':
             return { ...state, 
             	      ...action.payload };   
		default:
		   return state;
	}
}