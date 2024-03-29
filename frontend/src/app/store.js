import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

import goalsReducer from '../features/goals/goalSlice';
import passwordChangeReducer from "../features/passowrdChange/passwordChangeSlice";

export const store = configureStore({
  reducer: {
    auth : authReducer,
    goals : goalsReducer,
    changePassword : passwordChangeReducer
  },
});
