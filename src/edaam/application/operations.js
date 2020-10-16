import axios from 'axios';
import { call, put, takeEvery, all, select } from 'redux-saga/effects';

import actions from './actions';
import events from './events';

function* deployApplication(action) {
  // TODO: Save if not already saved
  // TODO: Set status
  // TODO: Aggregate the state for the application based upon its ID


  // TODO: Set status
  // TODO: Validate the deployment package

  // TODO: Set status

  try {
    // Make the request
    const response = yield call(axios.post, 'http://localhost:3030/api/v0/deploy', action.payload, {
      withCredentials: true,
    });
    yield put(actions.queueDeploymentResponse(action.payload.id, response.data, false));
    // TODO: Set status
  } catch (err) {
    yield put(actions.queueDeploymentResponse(action.payload.id, err.data, true));
    // TODO: Set status
  }
}

function* deploySaga() {
  yield takeEvery(events.QUEUE_DEPLOYMENT, deployApplication);
}

// TODO: application deployment progress

function* saveApplication(action) {
  // TODO: Set status
  yield call(
    window.localStorage.setItem,
    `scootrio.edaam.application.${action.payload.id}`,
    JSON.stringify(action.payload.content)
  );
  // TODO: Set status
}

function* saveSaga() {
  yield takeEvery(events.SAVE, saveApplication);
}

function* sagas() {
  yield all([deploySaga, saveSaga]);
}

export default sagas;
