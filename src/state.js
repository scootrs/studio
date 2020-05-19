import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './saga';

import reduceStatus from 'components/status/reducers';

const reduce = combineReducers({
  status: reduceStatus,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reduce, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
