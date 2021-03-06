import { fork, takeEvery } from "redux-saga/effects";
import { push } from "react-router-redux";
import store from "../store";
import {
  fetchIssuesSaga,
  getSumIssuesSaga,
  fetchUserSaga,
  fetchTaskSaga,
  fetchIssuesFilterSaga,
  fetchIssuesSocketSaga,
  fetchIssuesMoreSaga,
  fetchSelectedIssueSaga,
  getCountIssueItemsSaga,
  fetchCommentsSaga,
  fetchActivitiesSaga,
  NotificationsSaga,
  fetchActivitiesSocketSaga
} from "./fetchSagas";
import {
  addIssueSaga,
  addIssueFileSaga,
  addPostSaga,
  addTaskSaga,
  updateTaskSaga,
  addCommentSaga,
  updateTaskWithFormSaga,
  removeTaskSaga,
  updateIssueSaga,
  removeIssueSaga,
  addActivitySaga,
  removeActivitySaga
} from "./addSagas";
import {
  signupSaga,
  loginSaga,
  toLoginSaga,
  logoutSaga,
  addFileSaga,
  updateUserSaga
} from "./authSagas";


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
    fork(addCommentSaga, feathersApp),
    fork(getCountIssueItemsSaga,feathersApp),
    fork(updateTaskWithFormSaga, feathersApp),
    fork(removeTaskSaga, feathersApp),
    fork(fetchCommentsSaga, feathersApp),
    fork(updateIssueSaga, feathersApp),
    fork(removeIssueSaga,feathersApp),
    fork(addActivitySaga,feathersApp),
    fork(fetchActivitiesSaga,feathersApp),
    fork(fetchActivitiesSocketSaga,feathersApp),
    fork(removeActivitySaga,feathersApp),
    fork(NotificationsSaga,feathersApp)
    
    
  ];
}
