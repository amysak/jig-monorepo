import { all, fork } from "typed-redux-saga";

import { authStatusWatcher, singOutWatcher } from "./auth";

function* initSaga() {
  yield* all([fork(authStatusWatcher), fork(singOutWatcher)]);
}

export { initSaga };
