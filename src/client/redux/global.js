import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  userId: null,
  isLoading: true,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    updateCurrentUser: (state, action) => {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { updateCurrentUser } = globalSlice.actions;
export default globalSlice.reducer;
