var defaultState = {
  loading: false,
  tasks: [],
  total:0
};

module.exports = (state = defaultState, action) => {
  switch (action.type) {
    case "TASKS_FETCH_REQUESTED":
      return {
        ...state,
        loading: true
      };
    case "TASKS_FETCH_DONE":
      return {
        ...state,
        loading: false,
        tasks: [...action.tasks.data],
        total:action.tasks.total
      };
     case "TASKSSAVE_SUCCESS":
      return {
        ...state,
        loading: false,
        tasks: [...state.tasks,...action.task]
      };
    case "TASKUPDATE_SUCCESS":
      return {
        ...state,
        tasks: reducer1(state.tasks, action)
      };

    default:
      return state;
  }
};

function reducer1(state, action) {
  switch (action.type) {
    case "TASKUPDATE_SUCCESS":
      return state.map(t => reducer2(t, action));
    default:
      return state;
  }
}

function reducer2(state, action) {
  switch (action.type) {
    case "TASKUPDATE_SUCCESS":
      if (state._id !== action.id) {
        return state;
      }
      return {
        ...state,
        status: action.status
      };
    default:
      return state;
  }
}
