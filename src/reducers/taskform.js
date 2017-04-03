var defaultState = {
  title: undefined,
  text: "",
  status: 0,
  user_id: undefined,
  process: "I"
};

module.exports = (state = defaultState, action) => {
  switch (action.type) {
    case "TASK_FORM":
      return {
        ...state,
        ...action.payload
      };
    case "TASKUPDATE_WITHFORM_SUCCESS":
    case "TASK_REMOVE_SUCCESS":
    case "TASKSAVE_SUCCESS":
      return {
        defaultState
      };
    default:
      return state;
  }
};
