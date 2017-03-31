import { call,delay, put, takeEvery } from "redux-saga/effects";
import {
  uploadfile,
  createPost,
  createissue,
  createtask,
  updatetask,
  createcomment
} from "./services";
import { push } from "react-router-redux";
import store from "../store";
import { addAlert } from "../actions";

/*****************************************************/
export function* addPostSaga(feathersApp) {
  yield takeEvery("POSTSAVE_REQUESTED", addPost, feathersApp);
}

function* addPost(feathersApp, action) {
  try {
    const resp = yield call(
      createPost,
      feathersApp,
      action.user_id,
      action.posttype
    );
    const postid = resp._id;

    if (action.posttype === "I") {
      const title = action.title;
      const text = action.text;
      const status = action.status;
      const category = action.category;
      yield put({
        type: "ISSUESAVE_REQUESTED",
        title,
        text,
        status,
        postid,
        category
      });
    }
  } catch (error) {
    console.log(error);
    yield put(addAlert("Bir şeyler ters gitti :( ", "danger"));
  }
}

/*******************addIssue**************************/
export function* addIssueFileSaga(feathersApp) {
  yield takeEvery("ISSUE_IMAGEUPLOAD", addIssuefile, feathersApp);
}

function* addIssuefile(feathersApp, action) {
  try {
    const addedfile = yield call(uploadfile, feathersApp, action.file);
    yield put({ type: "ISSUE_IMAGEUPLOAD_SUCCESS", addedfile });
  } catch (error) {
    yield put(addAlert("Bir şeyler ters gitti :( ", "danger"));
  }
}

/*******************addIssue**************************/
export function* addIssueSaga(feathersApp) {
  yield takeEvery("ISSUESAVE_REQUESTED", addissue, feathersApp);
}

function* addissue(feathersApp, action) {
  try {
    yield call(
      createissue,
      feathersApp,
      action.title,
      action.text,
      action.status,
      action.postid,
      action.category
    );
    yield put({ type: "ISSUESAVE_SUCCESS" });
    setTimeout(()=>{
       store.dispatch(push("/"))
    },1000);
  } catch (error) {
    yield put(addAlert("Bir şeyler ters gitti :( ", "danger"));
  }
}
/**
 * adddingTask
 */

export function* addTaskSaga(feathersApp) {
  yield takeEvery("TASKSAVE_REQUESTED", addtask, feathersApp);
}

function* addtask(feathersApp, action) {
  try {
    const task=yield call(
      createtask,
      feathersApp,
      action.title,
      action.text,
      action.user_id,
      action.status
    );
    yield put({ type: "TASKSAVE_SUCCESS" ,task});
  } catch (error) {
    yield put(addAlert("Bir şeyler ters gitti :( ", "danger"));
  }
}

/*******************addIssue**************************/
export function* updateTaskSaga(feathersApp) {
  yield takeEvery("TASKUPDATE_REQUESTED", patchtask, feathersApp);
}

function* patchtask(feathersApp, action) {
  try {
    yield call(updatetask, feathersApp, action.id, action.status);
    const id = action.id;
    const status = action.status;
    yield put({ type: "TASKUPDATE_SUCCESS", id, status });
  } catch (error) {
    yield put(addAlert("Bir şeyler ters gitti :( ", "danger"));
  }
}

/*******************addComment**************************/

export function* addCommentSaga(feathersApp) {
  yield takeEvery("COMMENTSAVE_REQUESTED", addcomment, feathersApp);
}

function* addcomment(feathersApp, action) {
  try {
    const comment = yield call(
      createcomment,
      feathersApp,
      action.user_id,
      action.relatedid,
      action.text
    );
    yield put({ type: "COMMENTSAVE_DONE", comment });
  } catch (error) {
    yield put(addAlert("Bir şeyler ters gitti :( ", "danger"));
  }
}
