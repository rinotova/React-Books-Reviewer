import { createSlice } from '@reduxjs/toolkit';

const initialSelectedBookState = {
  selectedBook: {},
};

const selectedBook = createSlice({
  name: 'selectedBook',
  initialState: initialSelectedBookState,
  reducers: {
    updateSelectedBook(state, action) {
      state.selectedBook = { ...action.payload };
    },
  },
});

export const selectedBookActions = selectedBook.actions;
export default selectedBook.reducer;
