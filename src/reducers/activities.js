var defaultState = {
  loadingactivities: false,
  items: [],
  total: 0
};

module.exports = (state = defaultState, action) => {
  switch (action.type) {
    case "ACTIVITY_FETCH_REQUESTED":
      return {
        ...state,
        loadingactivities: true
      };
    case "ACTIVITY_FETCH_DONE":
      return {
        ...state,
        loadingactivities: false,
        items: [...action.activities.data],
        total: action.activities.total
      };
    case "TASK_REMOVE_SUCCESS":
      return {
        ...state,
        items: reducer1(state.items, action),
        total:--state.total
      };
    default:
      return state;
  }
};

function reducer1(state, action) {
  switch (action.type) {
    case "TASK_REMOVE_SUCCESS":
      return state.filter(item => {
        if (item._id === action.id) {
          return false;
        } else {
          return true;
        }
      });
    default:
      return state;
  }
}
