import RootReducer from './Reducers/RootReducer'
import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['createUsers', 'createBooks']
}

const persistedReducer = persistReducer(persistConfig, RootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk, logger)))

export const persistor = persistStore(store);