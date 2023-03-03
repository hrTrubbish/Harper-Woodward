import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import globalReducer from './global';

// This is the setup of a redux store -> import your file store here
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

// IN THE COMPONENTS THAT YOU NEED REDUX
// To get item from state
// 1: import { useSelector } from 'react-redux';
// 2: const { theVariableInYourInitialState } = useSelector((state) => state.global)

// To use a reducer function in your component
// 1. import { useDispatch } from 'react-redux';
// 2. import { reducerFunction } from 'file-path-to-globajs'
// 3. const dispatch = useDispatch()
// 4. dispatch(reducerFunction())
