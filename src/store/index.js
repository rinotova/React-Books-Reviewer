import { configureStore } from '@reduxjs/toolkit';
import searchSuggestionsReducer from './slices/search-suggestions-slice';
import selectedBookReducer from './slices/selected-book-slice';
import useFetchReducer from './slices/use-fetch-slice';
import databaseReducer from './slices/database-slice';

const store = configureStore({
  reducer: {
    searchSuggestions: searchSuggestionsReducer,
    selectedBook: selectedBookReducer,
    useFetch: useFetchReducer,
    database: databaseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
