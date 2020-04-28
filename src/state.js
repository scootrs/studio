import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './saga';

const reduce = combineReducers();

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reduce, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
