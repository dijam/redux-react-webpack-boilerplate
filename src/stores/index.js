import { compose, createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { devTools, persistState } from 'redux-devtools';

const logger = createLogger({
  predicate: (getState, action) => __DEV__,
  level: 'info',
  duration: true,
  actionTransformer: (action) => {
    return {
      ...action,
      type: String(action.type),
    };
  },
});

const middlewares = [thunk, logger];

const createStoreWithMiddleware = compose(
  applyMiddleware(...middlewares),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

export default function mainStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
