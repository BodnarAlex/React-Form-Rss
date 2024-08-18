import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { IFormData } from './types.ts';

const formDataSlice = createSlice({
  name: 'formData',
  initialState: [] as IFormData[],
  reducers: {
    addFormData: (state, action: PayloadAction<IFormData>) => {
      state.push(action.payload);
    },
  },
});

export const { addFormData } = formDataSlice.actions;

export const store = configureStore({
  reducer: {
    formData: formDataSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
