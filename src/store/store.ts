import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: string;
  gender: string;
  country: string;
  picture: string | null;
  terms: boolean;
}

const formDataSlice = createSlice({
  name: 'formData',
  initialState: [] as FormData[],
  reducers: {
    addFormData: (state, action: PayloadAction<FormData>) => {
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
