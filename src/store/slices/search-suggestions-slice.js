import { createSlice } from '@reduxjs/toolkit';

const initialSearchSuggestionsState = {
  searchSuggestions: [],
  searchTerm: '',
};

const searchSuggestions = createSlice({
  name: 'searchSuggestions',
  initialState: initialSearchSuggestionsState,
  reducers: {
    addSuggestions(state, action) {
      state.searchSuggestions = action.payload;
    },
    removeSuggestions(state) {
      state.searchSuggestions = [];
    },
    updateSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
});

export const searchSuggestionsActions = searchSuggestions.actions;
export default searchSuggestions.reducer;
