import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

// TODO: isolate so nly in dev
import logger from 'redux-logger';

import reduceStatus from 'status/reducers';
import reduceApplications from 'edaam/application/reducers';
import reduceEvents from 'edaam/event/reducers';
import reduceSelected from 'edaam/selected/reducers';
import reduceHandlers from 'edaam/handler/reducers';
import reduceStorage from 'edaam/storage/reducers';
import reduceReferences from 'edaam/reference/reducers';
import reduceTriggers from 'edaam/trigger/reducers';

import rootSaga from './saga';

const reduce = combineReducers({
  status: reduceStatus,
  applications: reduceApplications,
  handlers: reduceHandlers,
  storage: reduceStorage,
  events: reduceEvents,
  references: reduceReferences,
  triggers: reduceTriggers,
  selected: reduceSelected,
  deployed: () => ({})
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reduce, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(rootSaga);
