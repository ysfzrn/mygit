import { fork, call, put, takeEvery } from "redux-saga/effects";
import {
  fetchIssues,
  getSumIssues,
  getusers,
  gettasks,
  getselectedissue
} from "./services";
import { push } from "react-router-redux";
import store from "../store";
import { addAlert } from "../actions";



export function* fetchIssuesSaga(feathersApp) {
  yield takeEvery("ISSUE_FETCH_REQUESTED", callFetchIssues, feathersApp);
}

function* callFetchIssues(feathersApp, action) {
  try {
    const issues = yield call(
      fetchIssues,
      feathersApp,
      action.offset,
      action.filter,
      action.status,
      action.token
    );
    yield put({ type: "ISSUE_FETCH_DONE", issues });
  } catch (error) {
    yield put(
      addAlert(
        "Upps bir terslik var.Sayfayı yenileyebilir misiniz ? ",
        "danger"
      )
    );
  }
}

export function* fetchIssuesFilterSaga(feathersApp) {
  yield takeEvery(
    "ISSUE_FETCH_FILTER_REQUESTED",
    callFetchIssuesFilter,
    feathersApp
  );
}

function* callFetchIssuesFilter(feathersApp, action) {
  try {
    const issues = yield call(
      fetchIssues,
      feathersApp,
      action.offset,
      action.filter,
      action.status,
      action.token
    );
    yield put({ type: "ISSUE_FETCH_FILTER_DONE", issues });
  } catch (error) {
    yield put(
      addAlert(
        "Upps bir terslik var.Sayfayı yenileyebilir misiniz ? ",
        "danger"
      )
    );
  }
}


export function* fetchIssuesSocketSaga(feathersApp) {
  yield takeEvery(
    "ISSUE_FETCH_SOCKET_REQUESTED",
    callFetchIssuesSocket,
    feathersApp
  );
}

function* callFetchIssuesSocket(feathersApp, action) {
  try {
    const issues = yield call(
      fetchIssues,
      feathersApp,
      action.offset,
      action.filter,
      action.status,
      action.token
    );
    yield put({ type: "ISSUE_FETCH_SOCKET_DONE", issues });
  } catch (error) {
    yield put(
      addAlert(
        "Upps bir terslik var.Sayfayı yenileyebilir misiniz ? ",
        "danger"
      )
    );
  }
}


export function* fetchIssuesMoreSaga(feathersApp) {
  yield takeEvery(
    "ISSUE_FETCH_MORE_REQUESTED",
    callFetchIssuesMore,
    feathersApp
  );
}

function* callFetchIssuesMore(feathersApp, action) {
  try {
    const issues = yield call(
      fetchIssues,
      feathersApp,
      action.offset,
      action.filter,
      action.status,
      action.token
    );
    yield put({ type: "ISSUE_FETCH_MORE_DONE", issues });
  } catch (error) {
    yield put(
      addAlert(
        "Upps bir terslik var.Sayfayı yenileyebilir misiniz ? ",
        "danger"
      )
    );
  }
}


export function* getSumIssuesSaga(feathersApp) {
  yield takeEvery("GET_SUM_ISSUES", callgetsumissues, feathersApp);
}

function* callgetsumissues(feathersApp, action) {
  const sum = yield call(getSumIssues, feathersApp);
  yield put({ type: "GET_SUM_ISSUES_DONE", sum });
}

export function* fetchUserSaga(feathersApp) {
  yield takeEvery("USERS_FETCH_REQUESTED", callfetchusers, feathersApp);
}

function* callfetchusers(feathersApp, action) {
  const users = yield call(getusers, feathersApp);
  yield put({ type: "USERS_FETCH_DONE", users });
}

export function* fetchTaskSaga(feathersApp) {
  yield takeEvery("TASKS_FETCH_REQUESTED", callfetchtasks, feathersApp);
}

function* callfetchtasks(feathersApp, action) {
  const tasks = yield call(gettasks, feathersApp);
  yield put({ type: "TASKS_FETCH_DONE", tasks });
}


export function* fetchSelectedIssueSaga(feathersApp) {
  yield takeEvery("ISSUE_SELECTED_FETCH_REQUESTED", callfetchselectedissue, feathersApp);
}

function* callfetchselectedissue(feathersApp, action) {
  const issue = yield call(getselectedissue, feathersApp,action.issue_id);
  yield put({ type: "ISSUE_SELECTED_FETCH_DONE", issue });
}


