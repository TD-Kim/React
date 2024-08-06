import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    auth: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
  },
});

export default userSlice;
export const { setAuth } = userSlice.actions;
