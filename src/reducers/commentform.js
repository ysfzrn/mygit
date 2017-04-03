var defaultState = {
  user_id: undefined,
  relatedid: undefined,
  text: "",
  loading:false
};

module.exports = (state = defaultState, action) => {
  switch (action.type) {
    case "COMMENT_FORM":
      return {
        ...state,
        ...action.payload
      };
    case "COMMENTSAVE_REQUESTED":
      return {
        ...state,
        loading:true
      }
    case "COMMENTSAVE_DONE":
      return {
        ...state,
        text: "",
        loading:false
      };
    default:
      return state;
  }
};
