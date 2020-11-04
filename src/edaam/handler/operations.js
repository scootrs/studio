import { eventChannel, END } from 'redux-saga';
import { all, call, put, take, takeEvery } from 'redux-saga/effects';
import uuid from 'uuid/v4';

import actions from './actions';
import events from './events';
import { captions } from './validation';

function doCreateHandler(options) {
  return {
    id: 'edaam:handler/' + uuid(),
    name: '',
    runtime: '',
    code: '',
    environment: [],
    _meta: {
      id: uuid(),
      type: 'handler',
      tooltip: 'Handler',
      position: { x: options.x, y: options.y },
      endpoints: [
        {
          isSource: true,
          id: uuid(),
          scopes: ['storage', 'event-internal'],
        },
        {
          isTarget: true,
          id: uuid(),
          scopes: ['compute'],
        },
      ],
      errors: {
        name: captions.NameMissing,
        runtime: captions.RuntimeMissing,
        code: captions.CodeMissing,
      },
    },
  };
}

function* create(action) {
  const newHandler = yield call(doCreateHandler, action.payload);
  yield put(actions.createSuccess(newHandler));
}

function* watchCreate() {
  yield takeEvery(events.CREATE, create);  
}

function createLogChannel(id) {
  return eventChannel((emitter) => {

    let source = null;
    try {
      source = new EventSource('http://localhost:3001/logs/' + id, { withCredentials: true });
    } catch(err) {
      // TODO: emit something that indicates a failure
      return () => {};
    }

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
      chan.close();
      break;
    }
  }
}

function* watchFetchLogs() {
  yield takeEvery(events.FETCH_LOGS, fetchLogs);
}

function* saga() {
  yield all([watchCreate(), watchFetchLogs()]);
}

export default saga;
