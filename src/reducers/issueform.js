var defaultState = {
	 user_id  : undefined,
	 title	  : undefined,
	 text	  : '',
	 status	  : true,
	 posttype : 'I',
	 category : 'I',
	 addedfile:''

}

module.exports = (state=defaultState, action)=>{
	switch(action.type){
		 case 'ISSUE_FORM':
             return { ...state, 
             	      ...action.payload };   
         case 'ISSUE_IMAGEUPLOAD_SUCCESS':
             return {
                    ...state,
                    addedfile:action.addedfile.id
             }
		default:
		   return state;
	}
}