import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reduceStatus from 'status/reducers';
import reduceApplications from 'application/reducers';
import reduceSelected from 'selected/reducers';

import { rootSaga } from './saga';

const reduce = combineReducers({
  status: reduceStatus,
  applications: reduceApplications,
  selected: reduceSelected,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reduce, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
