var defaultState = {}

module.exports = (state=defaultState, action)=>{
	switch(action.type){
		case 'AUTH_GOOD':
	      return action.user;  
	    case 'LOGOUT_DONE':
	      return {};  
	    case 'LOGIN_SUCCEEDED':
	      return action.user.data; 
	    case 'IMAGEUPLOAD_SUCCESS':
             return { ...state, 
             	      'data' : reducer2(state.data, action) };
			case 'USERS_FETCH_DONE':
			        return{
								  ...state,
									'users':action.users
							}
		default:
		   return state;
	}
}


function reducer2(state, action) {
   console.log(state)
    switch (action.type) {
        case 'IMAGEUPLOAD_SUCCESS':
            return {
            	...state,
            	'image':action.addedfile.id
            	};
        default:
           return state       
    }
}