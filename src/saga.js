import { all } from 'redux-saga/effects';

import applicationSaga from 'edaam/application/operations';
import handlerSaga from 'edaam/handler/operations';
import storageSaga from 'edaam/storage/operations';

function* rootSaga() {
  yield all([applicationSaga(), handlerSaga(), storageSaga()]);
}

export default rootSaga;
