import { all, put, takeEvery } from 'redux-saga/effects';
import uuid from 'uuid/v4';

import actions from './actions';
import events from './events';
import { captions } from './validation';

function doCreateStorage(options) {
  return {
    id: 'edaam:storage/' + uuid(),
    name: '',
    type: '',
    _meta: {
      id: uuid(),
      type: 'storage',
      tooltip: 'Storage',
      position: { x: options.x, y: options.y },
      endpoints: [
        {
          isTarget: true,
          id: uuid(),
          scopes: ['handler'],
        },
      ],
      errors: {
        name: captions.NameMissing,
        type: captions.TypeMissing,
      },
    },
  };
}

function* create(action) {
  yield put(actions.createSuccess(doCreateStorage(action.payload)));
}

function* watchCreate() {
  yield takeEvery(events.CREATE, create);
}

function* saga() {
  yield all([watchCreate()]);
}

export default saga;
