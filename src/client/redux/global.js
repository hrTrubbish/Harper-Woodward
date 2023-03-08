import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { get } from '../api/firestore-services';

const initialState = {
  userId: null,
  isLoading: true,
  tours: [],
  streams: [],
};

export const getTours = createAsyncThunk(
  'global/fetchTours',
  async () => {
    try {
      const res = await get('tours');
      console.log(res, 'tours');
      return res;
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const getStreams = createAsyncThunk(
  'global/fetchStreams',
  async () => {
    try {
      const res = await get('schedules');
      console.log(res, 'schedules');
      return res;
    } catch (err) {
      throw new Error(err);
    }
  },
);

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    updateCurrentUser: (state, action) => {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTours.fulfilled, (state, action) => {
      state.tours = action.payload.res;
      state.isLoading = false;
    });
    builder.addCase(
      getStreams.fulfilled,
      (state, action) => {
        state.streams = action.payload.res;
        state.isLoading = false;
      },
    );
  },
});

export const { updateCurrentUser } = globalSlice.actions;
export default globalSlice.reducer;
