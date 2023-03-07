import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  userId: null,
  isLoading: true,
  tours: [],
};

// EXAMPLE FETCHING FUNCTION
// export const fetchTours = createAsyncThunk(
//   'global/fetchTours',
//   // first parameter can be anything
//   async () => {
//     // thunk allows you to access other state files

//     const res = await axios({});

//     return res.data;
//   },
// );

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    // reducers are actions that update the state.
    // action.payload is the arguments being passed in. You can mutate the state directly
    updateCurrentUser: (state, action) => {
      state.userId = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchTours.pending, (state) => {
  //     state.isLoading = false;
  //   });
  //   builder.addCase(fetchTours.fulfilled, (state, action) => {
  //     state.tours = action.payload
  //   });
  //   builder.addCase(fetchTours.rejected, (state) => {
  //     state.isLoading = false;
  //   });
  // },
});

export const { updateCurrentUser } = globalSlice.actions;
export default globalSlice.reducer;
