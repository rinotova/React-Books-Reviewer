import { createSlice } from '@reduxjs/toolkit';
import { getDatabase } from 'firebase/database';
import { firebaseApp } from '../../firebase';

const initialDatabaseliceState = {
  database: getDatabase(firebaseApp),
};

const useFetch = createSlice({
  name: 'useFetch',
  initialState: initialDatabaseliceState,
});

export default useFetch.reducer;
