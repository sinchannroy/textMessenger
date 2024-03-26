import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  profilePic: '',
  bio: '',
  name: '',
};

const activeUserSlice = createSlice({
  name: 'activeUser',
  initialState,
  reducers: (builder) => {
    builder
      .addCase(setActiveUser, (state, { payload }) => {
        state.profilePic = payload.profilePic;
        state.bio = payload.bio;
        state.name = payload.name;
      })
      .addCase(setUserNameAndBio, (state, { payload }) => {
        state.name = payload.name;
        state.bio = payload.bio;
      });
  },
});

export const { setActiveUser, setUserNameAndBio } = activeUserSlice.actions;
export default activeUserSlice.reducer;