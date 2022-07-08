import { configureStore } from '@reduxjs/toolkit';
import searchSuggestionsReducer from './slices/search-suggestions-slice';
import selectedBookReducer from './slices/selected-book-slice';

const store = configureStore({
  reducer: {
    searchSuggestions: searchSuggestionsReducer,
    selectedBook: selectedBookReducer,
  },
});

export default store;
