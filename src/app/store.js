import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/event/eventSlice';
import eventReducer from '../features/event/eventSlice';

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    event: eventReducer,
  },
});
