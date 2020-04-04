import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	reducers,
	composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagas.forEach(sagaMiddleware.run);

export default store;
