import { eventChannel, END } from 'redux-saga';
import { all, call, put, take, takeEvery } from 'redux-saga/effects';

import actions from './actions';
import events from './events';

function createLogChannel(id) {
  return eventChannel((emitter) => {
    const source = new EventSource('http://localhost:3001/logs/' + id, { withCredentials: true });

    function onLogEntry(event) {
      const data = JSON.parse(event.data);
      emitter(data);
    }

    function onError(event) {
      if (event.eventPhase === EventSource.CLOSED) {
        emitter(END);
      }
    }

    source.addEventListener('logs:entry', onLogEntry);
    source.addEventListener('error', onError);

    return () => {
      source.removeEventListener('logs:entry', onLogEntry);
      source.removeEventListener('error', onError);
      source.close();
    };
  });
}

function* fetchLogs(action) {
  const chan = yield call(createLogChannel, action.payload);

  yield takeEvery(chan, function* (data) {
    yield put(actions.fetchLogsUpdate(action.payload, data));
  });

  while (true) {
    const a = yield take(events.CANCEL_FETCH_LOGS);
    if (a.payload == action.payload) {
      chan.cancel();
      break;
    }
  }
}

function* watchFetchLogs() {
  yield takeEvery(events.FETCH_LOGS, fetchLogs);
}

function* saga() {
  yield all([watchFetchLogs]);
}

export default saga;
