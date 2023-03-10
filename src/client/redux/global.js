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
  featuredVideo: [],
  featuredStream: '',
};

export const getTours = createAsyncThunk(
  'global/fetchTours',
  async (order = 'desc') => {
    try {
      const res = await get('tours', order);
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
      return res;
    } catch (err) {
      throw new Error(err);
    }
  },
);

export const getFeatured = createAsyncThunk(
  'global/fetchFeatured',
  async () => {
    try {
      const res = await get('featured');
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
    updateFeaturedVideo: (state, action) => {
      state.featuredVideo = action.payload;
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
    builder.addCase(
      getFeatured.fulfilled,
      (state, action) => {
        // hijacking your function for featured stream
        state.featuredVideo = action.payload.res.filter(
          (item) => item.id !== 'current',
        );
        state.featuredStream = action.payload.res.find(
          (item) => item.id === 'current',
        )?.streamId;
        state.isLoading = false;
      },
    );
  },
});

export const { updateCurrentUser, updateFeaturedVideo } =
  globalSlice.actions;
export default globalSlice.reducer;
