import { configureStore } from '@reduxjs/toolkit';
import globalStateSlice from './reducers/globalState';
import shipStateSlice from './reducers/shipsState';
import positionStateSlice from './reducers/positionState';

export const store = configureStore({
  reducer: {
    globalState: globalStateSlice,
    shipState: shipStateSlice,
    positionState: positionStateSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
