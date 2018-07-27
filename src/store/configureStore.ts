import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { makeRootReducer } from './reducers';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
function configureStore(initialState = {}) {
  const store = createStore(
    makeRootReducer(),
    initialState,
    enhancer,
  );
  return store;
}
export default configureStore;
