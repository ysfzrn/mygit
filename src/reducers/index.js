import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import auth from "./auth";
import signinform from "./signinform";
import signupform from "./signupform";
import taskform from "./taskform";
import alert from "./alert";
import issueform from "./issueform";
import issues from "./issues";
import tasks from "./tasks";
import selectedissue from "./selectedissue";
import commentform from "./commentform";
import comments from "./comments";

const reducer = combineReducers({
  routing: routerReducer,
  auth: auth,
  signinform: signinform,
  signupform: signupform,
  alerts: alert,
  issueform: issueform,
  taskform: taskform,
  issues: issues,
  tasks: tasks,
  selectedissue: selectedissue,
  commentform: commentform,
  comments: comments
});

export const percentDoneTask = state => {
  const totaltask = state.tasks.total;
  let donetask = 0;  
  

  for (let i=0; i<state.tasks.tasks.length; i++){
        if (state.tasks.tasks[i].status === 4) {
      donetask += 1;
    }
  }
  
  let percent = donetask * 100 / totaltask;
  percent = isNaN(percent) ? 0 : percent.toFixed(2);
  return percent;
};

export default reducer;
