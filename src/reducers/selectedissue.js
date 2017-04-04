var defaultState = {
  issue: "",
  comments: [],
  loading:true
};

module.exports = (state = defaultState, action) => {
  switch (action.type) {
    case "ISSUE_SELECTED_FETCH_REQUESTED":
       return {
           ...state,
           loading:true
       }
    
    case "ISSUE_SELECTED_FETCH_DONE":
      return {
        ...state,
        loading:false,
        issue: action.issue[0]
      };
    
    case 'UPDATEISSUE_SUCCESS':
             return {
             	    ...state,
             	    issue:reducer2(state.issue, action)
             }
    case "RESET_SELECTED_ISSUE":
       return{
          ...defaultState
       }
    default:
      return state;
  }
};

function reducer1(state, action) {
    switch(action.type) {    	
        case 'UPDATEISSUE_SUCCESS':
      return state.map(t =>
             reducer2(t, action)
            );
        default:
           return state;
    }
}


function reducer2(state, action) {
    switch(action.type) {    	
        case 'UPDATEISSUE_SUCCESS':
	      if (state._id !== action.id) {
	        return state;
	      }
	      return {
	        ...state,
	        status: action.status,
	      };
        default:
           return state;
    }
}