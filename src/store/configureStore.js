import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers/root';

// Configuring store and logger as middleware
export const configureStore = () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    composeEnhancers(
      process.env.NODE_ENV === 'production'
        ? applyMiddleware(thunk)
        : applyMiddleware(thunk, logger)
    )
  );
  return store;
};
