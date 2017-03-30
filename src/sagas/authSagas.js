import { fork, call, put, takeEvery } from "redux-saga/effects";
import { signup, login, logout, updateUser, uploadfile } from "./services";
import { push } from "react-router-redux";
import store from "../store";
import { addAlert } from "../actions";

export function* signupSaga(feathersApp) {
  yield takeEvery("SIGNUP_REQUESTED", trySignup, feathersApp);
}

function* trySignup(feathersApp, action) {
  try {
    const success = yield call(
      signup,
      feathersApp,
      action.email,
      action.password,
      action.name,
      action.surname
    );
    yield put({ type: "SIGNUP_SUCCEEDED", success });
    store.dispatch(push("/login"));
  } catch (error) {
    if (error.message.indexOf("409") > 0) {
      yield put(
        addAlert("Bu mail adresi daha önce alınmış olabilir", "danger")
      );
    }
    if (error.message.indexOf("400") > 0) {
      yield put(
        addAlert(
          "Seni kaydetmemiz için daha mantıklı şeyler yazmalısın!",
          "danger"
        )
      );
    }
  }
}
/**
 * LOGIN
 */
export function* loginSaga(feathersApp) {
  yield takeEvery("LOGIN_REQUESTED", tryLogin, feathersApp);
}

function* tryLogin(feathersApp, action) {
  try {
    const user = yield call(login, feathersApp, action.email, action.password);
    yield put({ type: "LOGIN_SUCCEEDED", user });
    store.dispatch(push(action.next));
  } catch (error) {
    yield put(addAlert("Email adresiniz veya şifreniz yanlış", "danger"));
  }
}

/*function* tryLogin(feathersApp, action) {
  feathersApp
    .authenticate({
      type: "local",
      email: action.email,
      password: action.password
    })
    .then(store.dispatch(push(action.next)))
    .catch(function(error) {
        put(addAlert("Email adresiniz veya şifreniz yanlış", "danger"))
    })
}*/


export function* toLoginSaga(feathersApp) {
  yield takeEvery("TO_LOGIN", tryToLogin, feathersApp);
}
/**********************************************/
function tryToLogin(feathersApp, action) {
  try {
    store.dispatch(push("/login"));
  } catch (error) {
    console.log(error);
  }
}
/**********************************************/
export function* logoutSaga(feathersApp) {
  yield takeEvery("LOGOUT_REQUESTED", callLogout, feathersApp);
}

function* callLogout(feathersApp, action) {
  yield call(logout, feathersApp);
  yield put({ type: "LOGOUT_DONE" });
  store.dispatch(push("/login"));
}

/*******************addIFile**************************/
export function* addFileSaga(feathersApp) {
  yield takeEvery("IMAGEUPLOAD", addfile, feathersApp);
}

function* addfile(feathersApp, action) {
  try {
    const addedfile = yield call(uploadfile, feathersApp, action.file);
    const token = action.token;
    const _id = action._id;

    yield put({ type: "IMAGEUPLOAD_SUCCESS", addedfile, token, _id });
  } catch (error) {
    yield put(addAlert("Bir şeyler ters gitti :( ", "danger"));
  }
}
/*******************updateUserSaga**************************/
export function* updateUserSaga(feathersApp) {
  yield takeEvery("IMAGEUPLOAD_SUCCESS", tryUpdateUser, feathersApp);
}

function* tryUpdateUser(feathersApp, action) {
  try {
    yield call(
      updateUser,
      feathersApp,
      action.addedfile,
      action.token,
      action._id
    );
    yield put({ type: "USER_UPDATE_SUCCESS" });
  } catch (error) {
    yield put(addAlert("Bir şeyler ters gitti :( ", "danger"));
  }
}