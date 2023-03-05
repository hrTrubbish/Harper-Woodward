import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  userId: null,
  isLoading: true,
};

// EXAMPLE FETCHING FUNCTION
// export const someFunction = createAsyncThunk(
//   'global/someFunction',
//   // first parameter can be anything
//   async (_, thunkAPI) => {
//     // thunk allows you to access other state files
//     const anotherState = thunkAPI.getState().rr;

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
  extraReducers: (builder) => {
    // builder.addCase(someFunction.pending, (state) => {
    //   state.isLoading = false;
    // });
    // builder.addCase(someFunction.fulfilled, (state) => {
    //   // update state when fulfilled here
    // });
    // builder.addCase(someFunction.rejected, (state) => {
    //   state.isLoading = false;
    // });
  },
});

export const { updateCurrentUser } = globalSlice.actions;
export default globalSlice.reducer;
