import { API_URL } from "./util/api";
import { createStore, compose, applyMiddleware } from "redux";
import persistState from "redux-localstorage";
import createSagaMiddleware from "redux-saga";
import mySaga from "./sagas/sagas";
import rootReducer from "./reducers";
import feathers from "feathers-client";
import io from "socket.io-client";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";

const defaultState = {};
const history = createHistory();

const sagaMiddleware = createSagaMiddleware();
const middleware = routerMiddleware(history);

const store = createStore(
  rootReducer,
  defaultState,
  compose(
    persistState(["auth"]),
    applyMiddleware(sagaMiddleware, middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
     ? window.__REDUX_DEVTOOLS_EXTENSION__()
     : undefined
  )
);

var socket = io(API_URL);

export const app = feathers()
  .configure(feathers.hooks())
  .configure(feathers.authentication({ storage: window.localStorage }))
  .configure(feathers.socketio(socket));

sagaMiddleware.run(mySaga, app);

export { history };
export default store;
