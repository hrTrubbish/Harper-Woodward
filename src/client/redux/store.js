import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import globalReducer from './global';

// This is the setup of a redux store -> import your file here
const rootReducer = combineReducers({
  global: globalReducer,
});

export function setupStore(preloadedState) {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: false,
    }),
    preloadedState,
  });
}
