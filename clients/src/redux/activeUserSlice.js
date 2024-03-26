import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  profilePic: '',
  bio: '',
  name: '',
};

// const activeUserSlice = createSlice({
//   name: 'activeUser',
//   initialState,
//   reducers: {
//     setActiveUser: (state, { payload }) => {
//       state.profilePic = payload.profilePic;
//       state.bio = payload.bio;
//       state.name = payload.name;
//     },
//     setUserNameAndBio: (state, { payload }) => {
//       state.name = payload.name;
//       state.bio = payload.bio;
//     },
//   },
// });

const activeUserSlice = createSlice({
  name: 'activeUser',
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.profilePic = action.payload.profilePic;
      state.bio = action.payload.bio;
      state.name = action.payload.name;
    },
    setUserNameAndBio: (state, action) => {
      state.name = action.payload.name;
      state.bio = action.payload.bio;
    },
  },
});

export const { setActiveUser, setUserNameAndBio } = activeUserSlice.actions;
export default activeUserSlice.reducer;