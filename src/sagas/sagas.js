import { fork, call, put, takeEvery } from "redux-saga/effects";
import { push } from "react-router-redux";
import store from "../store";
import { addAlert } from "../actions";
import {
  fetchIssuesSaga,
  getSumIssuesSaga,
  fetchUserSaga,
  fetchTaskSaga,
  fetchIssuesFilterSaga,
  fetchIssuesSocketSaga,
  fetchIssuesMoreSaga,
  fetchSelectedIssueSaga
} from "./fetchSagas";
import {
  addIssueSaga,
  addIssueFileSaga,
  addPostSaga,
  addingIssueSaga,
  addTaskSaga,
  updateTaskSaga,
  addCommentSaga
} from "./addSagas";
import {
  signupSaga,
  loginSaga,
  toLoginSaga,
  logoutSaga,
  addFileSaga,
  updateUserSaga
} from "./authSagas";
import {
  signup,
  login,
  logout,
  uploadfile,
  updateUser,
  createPost,
  createissue
} from "./services";

function* toPushSaga(feathersApp) {
  yield takeEvery("TO_PUSH", tryToPush, feathersApp);
}

function tryToPush(feathersApp, action) {
  try {
    store.dispatch(push(action.location));
  } catch (error) {
    console.log(error);
  }
}

/**********************************************/
export default function* root(feathersApp) {
  yield [
    fork(signupSaga, feathersApp),
    fork(loginSaga, feathersApp),
    fork(updateUserSaga, feathersApp),
    fork(logoutSaga, feathersApp),
    fork(toLoginSaga, feathersApp),
    fork(toPushSaga, feathersApp),
    fork(addFileSaga, feathersApp),
    fork(addIssueFileSaga, feathersApp),
    fork(addIssueSaga, feathersApp),
    fork(addPostSaga, feathersApp),
    fork(fetchIssuesSaga, feathersApp),
    fork(fetchIssuesFilterSaga, feathersApp),
    fork(fetchIssuesSocketSaga, feathersApp),
    fork(fetchIssuesMoreSaga, feathersApp),
    fork(fetchSelectedIssueSaga,feathersApp),
    fork(getSumIssuesSaga, feathersApp),
    fork(fetchUserSaga, feathersApp),
    fork(addTaskSaga, feathersApp),
    fork(fetchTaskSaga, feathersApp),
    fork(updateTaskSaga, feathersApp),
    fork(addCommentSaga, feathersApp)
  ];
}
