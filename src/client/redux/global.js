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

export const getEvents = createAsyncThunk(
  'global/fetchTours',
  async () => {
    try {
      const res = await Promise.all([
        get('schedules'),
        get('tours'),
      ]);
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
    builder.addCase(getEvents.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(
      getEvents.fulfilled,
      (state, action) => {
        const streams = action.payload[0].res;
        const tours = action.payload[1].res;
        state.streams = streams;
        state.tours = tours;
        state.isLoading = false;
      },
    );
    builder.addCase(getEvents.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { updateCurrentUser } = globalSlice.actions;
export default globalSlice.reducer;
