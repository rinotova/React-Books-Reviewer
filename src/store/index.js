import { configureStore } from '@reduxjs/toolkit';
import searchSuggestionsReducer from './slices/search-suggestions-slice';

const store = configureStore({
  reducer: {
    searchSuggestions: searchSuggestionsReducer,
  },
});

export default store;
