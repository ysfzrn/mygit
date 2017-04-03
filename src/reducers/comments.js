var defaultState = {
  loadingComment: false,
  comments: []
};

module.exports = (state = defaultState, action) => {
  switch (action.type) {
    case "COMMENTS_FETCH_REQUESTED":
      return {
        ...state,
        loadingComment: true
      };
    case "COMMENTS_FETCH_SUCCESS":
      return {
        ...state,
        loadingComment: false,
        comments: [...action.comments.data]
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
