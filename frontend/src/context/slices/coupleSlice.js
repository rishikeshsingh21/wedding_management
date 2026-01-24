 import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wedding: null,          // wedding object
  loading: false,
  error: null,
};

const coupleSlice = createSlice({
  name: "couple",
  initialState,
  reducers: {
    coupleStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    setWedding: (state, action) => {
      state.loading = false;
      state.wedding = action.payload;
    },

    clearWedding: (state) => {
      state.wedding = null;
      state.loading = false;
    },

    coupleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  coupleStart,
  setWedding,
  clearWedding,
  coupleFailure,
} = coupleSlice.actions;

export default coupleSlice.reducer;
