import { all } from 'redux-saga/effects';

import applicationSaga from 'application/operations';

export function* rootSaga() {
  yield all([applicationSaga]);
}
