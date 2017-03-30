var defaultState = {
  loadingComment: false,
  comments: []
};

module.exports = (state = defaultState, action) => {
  switch (action.type) {
    case "COMMENTSAVE_REQUESTED":
      return {
        ...state,
        loadingComment: true
      };
    case "COMMENTSAVE_DONE":
      return {
        ...state,
        comments: action.comments
      };
    case "COMMENTS_FETCH_DONE":
      return {
        ...state,
        loadingComment: false,
        comments: [...action.comments]
      };
    case "COMMENTS_RESET":
      return {
        ...state,
        comments: []
      };
    default:
      return state;
  }
};
