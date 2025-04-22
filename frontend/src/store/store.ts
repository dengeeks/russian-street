import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './User/userSlice';
import eventsReducer from './Events/EventsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    events: eventsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
