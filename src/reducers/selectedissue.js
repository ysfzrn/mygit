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
    default:
      return state;
  }
};
