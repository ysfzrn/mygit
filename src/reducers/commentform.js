var defaultState = {
  user_id: undefined,
  relatedid: undefined,
  text: ""
};

module.exports = (state = defaultState, action) => {
  switch (action.type) {
    case "COMMENT_FORM":
      return {
        ...state,
        ...action.payload
      };
    case "COMMENTSAVE_SUCCESS":
      return {
        ...state,
        text: "<p>...</p>"
      };
    default:
      return state;
  }
};
