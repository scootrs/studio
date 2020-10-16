import { all } from 'redux-saga/effects';

import applicationSaga from 'edaam/application/operations';
import handlerSaga from 'edaam/handler/operations';

function* rootSaga() {
  yield all([applicationSaga, handlerSaga]);
}

export default rootSaga;
