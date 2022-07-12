import { createSlice } from '@reduxjs/toolkit';

const initialReviewsListState = {
  reviewsList: {},
};

const reviewsList = createSlice({
  name: 'reviewsList',
  initialState: initialReviewsListState,
  reducers: {
    updateReviewsList(state, action) {
      state.reviewsList = action.payload;
    },
  },
});

export const reviewsListActions = reviewsList.actions;
export default reviewsList.reducer;
