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
import activities from "./activities";

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
  comments: comments,
  activities:activities
});

export const commentPersons=state=>{
  const comments = state.comments.comments;
  let persons=[];
  for (let i = 0; i < comments.length; i++) {
     if( !persons.includes(comments[i].user_id)){
         persons.push(comments[i].user_id)
     }
     //persons=[...persons, comments[i].user_id];
  }
  return persons;
}


export const percentDoneTask = state => {
  const totaltask = state.tasks.total;
  let donetask = 0;

  for (let i = 0; i < state.tasks.tasks.length; i++) {
    if (state.tasks.tasks[i].status === 4) {
      donetask += 1;
    }
  }

  let percent = donetask * 100 / totaltask;
  percent = isNaN(percent) ? 0 : percent.toFixed(2);
  return percent;
};

export const makingSelectedUsers = state => {
  let options = [];
  options.push({
    value: null,
    label: null,
    img: null,
    selected: true
  });

  if (state.auth.users) {
    for (let i = 0; i < state.auth.users.length; i++) {
      options.push({
        value: state.auth.users[i]._id,
        label: state.auth.users[i].name + " " + state.auth.users[i].surname,
        img: state.auth.users[i].image,
        selected: false
      });
    }
  }
  
  for (let i = 0; i < options.length; i++) {
    if (state.taskform.user_id) {
      if (options[i].value === state.taskform.user_id) {
        options[i].selected = true;
      } else {
        options[i].selected = false;
      }
    }
  }

  return options;
};

export default reducer;
